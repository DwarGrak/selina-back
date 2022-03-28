import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomTypeModel } from '../room_types/room_types.model';
import { RoomTypesService } from '../room_types/room_types.service';
import { Booking } from './booking.entity';
import { roomCountByRoomType } from './models/room_count_by_room_type.model';

const roomTypeCapacity = 10;

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    @Inject(RoomTypesService)
    private roomTypesService: RoomTypesService,
  ) {}

  async getOccupiedRoomsCountByRoomType(
    cityId: number,
    startDate: string,
    endDate: string,
  ): Promise<roomCountByRoomType> {
    /*
    NB! Doesn't work

    const result = this.bookingRepository.find({
      where: {
        cityId,
        dates: ArrayOverlap([start_date, end_date]),
      },
    });
    */
    const query = this.bookingRepository
      .createQueryBuilder()
      .select(['COUNT(*)', 'room_type_id'])
      .where('city_id = :cityId', { cityId })
      .andWhere('dates && :dateInterval', {
        dateInterval: `[${startDate}, ${endDate}]`,
      })
      .groupBy('room_type_id');
    const occupiedRooms = await query.getRawMany();
    return Object.fromEntries(
      occupiedRooms.map(({ count, room_type_id }) => [room_type_id, +count]),
    );
  }

  async getAvailableRoomTypes(
    cityId: number,
    startDate: string,
    endDate: string,
  ): Promise<RoomTypeModel[]> {
    const roomTypes = await this.roomTypesService.getList();
    const occupiedRooms = await this.getOccupiedRoomsCountByRoomType(
      cityId,
      startDate,
      endDate,
    );

    return roomTypes.map((roomType) => {
      const available =
        roomTypeCapacity - (occupiedRooms[roomType.id] || 0) > 0;
      return { ...roomType, available };
    });
  }
}

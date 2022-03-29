import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomTypeModel } from '../room_types/room_types.model';
import { RoomTypesService } from '../room_types/room_types.service';
import { BookingHelper } from './booking.helper';
import { Booking } from './entities/booking.entity';
import { roomCountByRoomType } from './models/room_count_by_room_type.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    @Inject(BookingHelper)
    private bookingHelper: BookingHelper,

    @Inject(RoomTypesService)
    private roomTypesService: RoomTypesService,
  ) {}

  async getOccupiedRoomsCountByRoomType(
    cityId: number,
    roomTypeId: number,
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
    let query = this.bookingRepository
      .createQueryBuilder()
      .select(['COUNT(*)', 'room_type_id'])
      .where('city_id = :cityId', { cityId })
      .andWhere('dates && :dateInterval', {
        dateInterval: `[${startDate}, ${endDate}]`,
      });
    if (roomTypeId) {
      query.andWhere('room_type_id = :roomTypeId', { roomTypeId });
    }
    query = query.groupBy('room_type_id');
    const occupiedRooms = await query.getRawMany();
    return Object.fromEntries(
      occupiedRooms.map(({ count, room_type_id }) => [room_type_id, +count]),
    );
  }

  async getAvailableRoomTypes(
    cityId: number,
    roomTypeId: number,
    startDate: string,
    endDate: string,
  ): Promise<RoomTypeModel[]> {
    const roomTypes = await this.roomTypesService.getList();
    const occupiedRooms = await this.getOccupiedRoomsCountByRoomType(
      cityId,
      roomTypeId,
      startDate,
      endDate,
    );

    return roomTypes.map((roomType) => {
      const available = this.bookingHelper.calcAvailable(
        occupiedRooms[roomType.id],
      );
      return { ...roomType, available };
    });
  }

  async isRoomAvailable(
    cityId: number,
    roomTypeId: number,
    startDate: string,
    endDate: string,
  ): Promise<boolean> {
    const occupiedRooms = await this.getOccupiedRoomsCountByRoomType(
      cityId,
      roomTypeId,
      startDate,
      endDate,
    );
    const occupiedItem = Object.entries(occupiedRooms).find(
      ([id]) => Number(id) === roomTypeId,
    );
    return this.bookingHelper.calcAvailable(occupiedItem?.[1]);
  }

  async createItem(
    cityId: number,
    roomTypeId: number,
    startDate: string,
    endDate: string,
  ) {
    this.bookingRepository.save({
      cityId,
      roomTypeId,
      dates: `[${startDate},${endDate}]`,
    });
  }
}

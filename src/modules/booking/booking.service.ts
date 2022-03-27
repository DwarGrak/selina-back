import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async getAvailable(cityId: number, startDate: string, endDate: string) {
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
    return await query.getRawMany();
  }
}

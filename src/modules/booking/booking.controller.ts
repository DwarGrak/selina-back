import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ParseDatePipe } from 'src/pipes/parse_date.pipe';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('available_room_types')
  getAvailableRoomTypes(
    @Query('city_id', ParseIntPipe) cityId: number,
    @Query('start_date', ParseDatePipe) startDate: string,
    @Query('end_date', ParseDatePipe) endDate: string,
  ) {
    return this.bookingService.getAvailableRoomTypes(cityId, startDate, endDate);
  }
}

import {
  Body,
  ConflictException,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ParseDatePipe } from 'src/pipes/parse_date.pipe';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create_booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('available_room_types')
  getAvailableRoomTypes(
    @Query('location_id', ParseIntPipe) locationId: number,
    @Query('start_date', ParseDatePipe) startDate: string,
    @Query('end_date', ParseDatePipe) endDate: string,
  ) {
    return this.bookingService.getAvailableRoomTypes(
      locationId,
      null,
      startDate,
      endDate,
    );
  }

  @Post()
  async createItem(@Body() createBooking: CreateBookingDto) {
    const {
      locationId: cityId,
      roomTypeId,
      startDate,
      endDate,
    } = createBooking;

    const available = await this.bookingService.isRoomAvailable(
      cityId,
      roomTypeId,
      startDate,
      endDate,
    );

    if (!available) {
      throw new ConflictException('Room is not available anymore');
    } else {
      return await this.bookingService.createItem(
        cityId,
        roomTypeId,
        startDate,
        endDate,
      );
    }
  }
}

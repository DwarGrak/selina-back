import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTypesModule } from '../room_types/room_types.module';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { BookingService } from './booking.service';
import { BookingHelper } from './booking.helper';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), RoomTypesModule],
  controllers: [BookingController],
  providers: [BookingHelper, BookingService],
})
export class BookingModule {}

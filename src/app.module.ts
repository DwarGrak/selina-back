import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDB } from './app.db';
import { LocationsModule } from './modules/locations/locations.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
  imports: [AppDB, BookingModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

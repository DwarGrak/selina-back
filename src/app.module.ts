import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDB } from './app.db';
import { LocationsModule } from './locations/locations.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AppDB, AuthModule, BookingModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

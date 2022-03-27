import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { LocationsHelper } from './locations.helper';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([City, Country])],
  controllers: [LocationsController],
  providers: [LocationsHelper, LocationsService],
})
export class LocationsModule {}

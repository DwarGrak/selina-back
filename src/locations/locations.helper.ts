import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class LocationsHelper {
  getFromCity(city) {
    return {
      id: city.id,
      city: city.name,
      country: city.country.name,
    };
  }
}

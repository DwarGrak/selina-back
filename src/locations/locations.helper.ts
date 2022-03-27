import { Injectable } from '@nestjs/common';
import { CityModel } from './models/city.model';
import { LocationModel } from './models/location.model';

@Injectable()
export class LocationsHelper {
  getFromCity(city: CityModel): LocationModel {
    return {
      id: city.id,
      city: city.name,
      country: city.country.name,
    };
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { LocationsHelper } from './locations.helper';
import { CityModel } from './models/city.model';
import { LocationModel } from './models/location.model';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,

    @Inject(LocationsHelper)
    private locationsHelper: LocationsHelper,
  ) {}

  async getList(): Promise<LocationModel[]> {
    const cities: CityModel[] = await this.cityRepository.find({
      relations: ['country'],
    });
    return cities.map((city) => this.locationsHelper.getFromCity(city));
  }

  async getItem(id: number): Promise<LocationModel> {
    const city: CityModel = await this.cityRepository.findOne({
      where: { id },
      relations: ['country'],
    });
    return this.locationsHelper.getFromCity(city);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { LocationsHelper } from './locations.helper';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,

    @Inject(LocationsHelper)
    private locationsHelper: LocationsHelper,
  ) {}

  async findAll() {
    const cities = await this.cityRepository.find({ relations: ['country'] });
    return cities.map((city) => this.locationsHelper.getFromCity(city));
  }

  async findOne(id: number) {
    const city = await this.cityRepository.findOne({
      where: { id },
      relations: ['country'],
    });
    return this.locationsHelper.getFromCity(city);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomType } from './room_types.entity';
import { RoomTypeModel } from './room_types.model';

@Injectable()
export class RoomTypesService {
  cachedList: RoomTypeModel[];

  constructor(
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
  ) {}

  async getList(): Promise<RoomTypeModel[]> {
    if (!this.cachedList)
      this.cachedList = await this.roomTypeRepository.find();
    return [...this.cachedList];
  }
}

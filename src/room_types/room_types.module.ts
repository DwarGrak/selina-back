import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './room_types.entity';
import { RoomTypesService } from './room_types.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  providers: [RoomTypesService],
  exports: [RoomTypesService],
})
export class RoomTypesModule {}

import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthJwtGuard } from '../auth/auth.jwt.guard';
import { LocationsService } from './locations.service';

@Controller('locations')
@UseGuards(AuthJwtGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  getList() {
    return this.locationsService.getList();
  }

  @Get(':id')
  getItem(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.getItem(+id);
  }
}

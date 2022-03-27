import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
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

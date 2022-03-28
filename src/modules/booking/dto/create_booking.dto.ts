import { IsDateString, IsInt } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  locationId: number;

  @IsInt()
  roomTypeId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}

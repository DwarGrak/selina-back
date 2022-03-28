import { Injectable } from '@nestjs/common';

export const roomTypeCapacity = 10;

@Injectable()
export class BookingHelper {
  calcAvailable(occupiedRoomsCount: number = 0): boolean {
    return roomTypeCapacity > occupiedRoomsCount;
  }
}

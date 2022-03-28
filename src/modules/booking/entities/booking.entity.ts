import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'city_id' })
  cityId: number;

  @Column({ name: 'room_type_id' })
  roomTypeId: number;

  @Column()
  dates: string;
}

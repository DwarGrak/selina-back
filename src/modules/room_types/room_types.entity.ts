import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'room_types' })
export class RoomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking/entities/booking.entity';
import { City } from './locations/entities/city.entity';
import { Country } from './locations/entities/country.entity';
import { RoomType } from './room_types/room_types.entity';

export const AppDB = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'selina_admin',
  password: 'secret_password',
  database: 'selina',
  entities: [Booking, City, Country, RoomType],
});

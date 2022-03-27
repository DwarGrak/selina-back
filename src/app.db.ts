import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './modules/booking/booking.entity';
import { City } from './modules/locations/entities/city.entity';
import { Country } from './modules/locations/entities/country.entity';
import { RoomType } from './modules/room_types/room_types.entity';

export const AppDB = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'selina_admin',
  password: 'secret_password',
  database: 'selina',
  entities: [Booking, City, Country, RoomType],
});

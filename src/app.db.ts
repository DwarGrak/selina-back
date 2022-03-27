import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './locations/entities/city.entity';
import { Country } from './locations/entities/country.entity';

export const AppDB = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'selina_admin',
  password: 'secret_password',
  database: 'selina',
  entities: [City, Country],
});

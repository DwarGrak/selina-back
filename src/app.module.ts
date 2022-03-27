import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDB } from './app.db';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [AppDB, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

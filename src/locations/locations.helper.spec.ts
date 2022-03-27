import { Test } from '@nestjs/testing';
import { LocationsHelper } from './locations.helper';
import { CityModel } from './models/city.model';
import { LocationModel } from './models/location.model';

describe('LocationsHelper', () => {
  let locationsHelper: LocationsHelper;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LocationsHelper],
    }).compile();

    locationsHelper = moduleRef.get<LocationsHelper>(LocationsHelper);
  });

  describe('getFromCity', () => {
    it('should convert city to location', async () => {
      const city: CityModel = {
        id: 42,
        name: 'City 42',
        country: { id: 34, name: 'Country 34' },
      };
      const location: LocationModel = {
        id: 42,
        city: 'City 42',
        country: 'Country 34',
      };
      expect(locationsHelper.getFromCity(city)).toEqual(location);
    });
  });
});

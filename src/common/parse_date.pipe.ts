import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const check = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(
      value,
    );
    if (!check)
      throw new BadRequestException(
        `"${metadata.data}" should be a date`,
      );
    return value;
  }
}

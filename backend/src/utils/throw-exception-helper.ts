import { HttpException, HttpStatus } from '@nestjs/common';

export function throwCustomException(
  message: any,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
) {
  throw new HttpException(
    {
      status: status,
      errors: message,
    },
    status,
  );
}

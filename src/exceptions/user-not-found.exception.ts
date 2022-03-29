import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(message = 'Not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

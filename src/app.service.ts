import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex() {
    return {
      application: process.env.APP_NAME,
      version: process.env.API_VERSION,
    };
  }
}

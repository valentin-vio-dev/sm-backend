import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getIndex() {
    return {
      appName: process.env.APP_NAME,
      version: process.env.API_VERSION,
    };
  }

  deleteImage(name: string): boolean {
    const filePath = `public/${name}`;

    if (fs.existsSync(filePath) === false) {
      return false;
    }

    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      return false;
    }

    return true;
  }
}

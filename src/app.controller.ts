import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*@Get()
  getIndex() {
    return this.appService.getIndex();
  }*/

  @Get('/images/:image')
  getImage(@Res() res: Response, @Param('image') image: string) {
    return res.sendFile(image, { root: 'public' });
  }

  @Post('/upload')
  @ApiOperation({
    summary: 'Upload image',
  })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public',
        filename: (req, file, callback) => {
          const name: string = v4();
          const ext = file.originalname.split('.').pop();
          return callback(null, `${name}.${ext}`);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return {
      filename: file.filename,
    };
  }
}

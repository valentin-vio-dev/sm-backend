import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EmployeeGuard } from 'src/role/guards/employee/employee.guard';
import { ImageUploadResult } from './dto/image-upload-result.dto';
import { StorageService } from './storage.service';

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('/images/:name')
  @ApiOperation({
    summary: 'Get image by name.',
  })
  @ApiResponse({
    status: 200,
    description: 'Return image.',
  })
  getImage(@Res() res: Response, @Param('name') image: string) {
    return res.sendFile(image, { root: 'public' });
  }

  @Delete('/images/:name')
  @ApiOperation({
    summary: 'Delete image by name.',
  })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({
    status: 404,
    description: 'Image not found.',
  })
  @UseGuards(AuthGuard('employee-jwt'), EmployeeGuard)
  @ApiBearerAuth()
  deleteImage(@Param('name') image: string) {
    if (!this.storageService.deleteImage(image)) {
      throw new NotFoundException('Image not found!');
    }
    return null;
  }

  @Post('/images/upload')
  @ApiOperation({
    summary: 'Upload image',
  })
  @ApiResponse({
    status: 201,
    description: 'Return uploaded image name.',
    type: ImageUploadResult,
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
  @UseGuards(AuthGuard('employee-jwt'), EmployeeGuard)
  @ApiBearerAuth()
  uploadImage(@UploadedFile() file: Express.Multer.File): ImageUploadResult {
    return {
      filename: file.filename,
    };
  }
}

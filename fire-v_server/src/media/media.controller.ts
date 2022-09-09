import { Controller, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { VideoService } from 'src/video/video.service';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService,public videoService : VideoService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('video',
    {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        }
      })
    })
  )
  async create(@UploadedFile() file: Express.Multer.File, @Param('id') video_id: string) {
    if (file) {
      let file_inf = await this.mediaService.cutVideo(file);
      if(file_inf.filename){
        return await this.videoService.updateVideoInfoWithUrl(video_id,file_inf.filename);
      }else{
        return new Object({filename:""});
      }
    } else {
      throw new HttpException('File is empty', HttpStatus.BAD_REQUEST);
    }
  }
}




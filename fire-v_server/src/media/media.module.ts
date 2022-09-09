import { forwardRef, Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports:[        
    forwardRef(() => VideoModule),
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService]
})
export class MediaModule {}

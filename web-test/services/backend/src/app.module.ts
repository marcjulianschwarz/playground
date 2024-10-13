import { Module } from '@nestjs/common';
import { DataSharingController } from './data-sharing/data-sharing.controller';
import { AppService } from './app.service';
import { DataSharingService } from './data-sharing/data-sharing.service';

@Module({
  imports: [],
  controllers: [DataSharingController],
  providers: [DataSharingService, AppService],
})
export class AppModule {}

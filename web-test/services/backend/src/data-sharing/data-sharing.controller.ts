import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DataSharingService } from './data-sharing.service';

interface UploadContent {
  data: string;
  id: string;
}

@Controller()
export class DataSharingController {
  constructor(private readonly dataSharingService: DataSharingService) {}

  @Post('upload')
  upload(@Body() body: UploadContent) {
    console.log(body);
    this.dataSharingService.upload(body.data, body.id);
    return { id: body.id };
  }

  @Get('download')
  download(@Query('id') id: string) {
    return this.dataSharingService.download(id);
  }
}

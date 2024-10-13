import { Injectable } from '@nestjs/common';

@Injectable()
export class DataSharingService {
  public data: Map<string, string> = new Map();

  upload(content: string, id: string) {
    this.data.set(id, content);
  }

  download(id: string) {
    const res = this.data.get(id);
    return res;
  }
}

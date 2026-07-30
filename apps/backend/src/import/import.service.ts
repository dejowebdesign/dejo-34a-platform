import { Injectable } from '@nestjs/common';

@Injectable()
export class ImportService {
  status() { return { ready: true, message: 'No import jobs have been configured.' }; }
}


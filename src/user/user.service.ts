import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getData(): string {
    return `Hello From Nest`;
  }
}

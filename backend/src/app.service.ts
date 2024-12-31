import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getModuleInfo() {
    return {
      imports: [
        'ConfigModule (isGlobal: true)',
        'AuthModule',
        'UserModule',
        'TodoModule',
        'PrismaModule',
      ],
      controllers: ['AppController'],
      providers: ['AppService'],
    };
  }
}

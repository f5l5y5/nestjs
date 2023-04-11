import { Module, Global, DynamicModule } from '@nestjs/common';
// import { ConfigService } from './config.service';
// import { ConfigController } from './config.controller';

export interface Options {
  path: string;
}

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseApi: '/api' + options.path },
        },
      ],
    };
  }
}

// @Module({
//   controllers: [ConfigController],
//   providers: [ConfigService]
// })
// export class ConfigModule {}

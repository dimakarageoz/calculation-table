import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ConnectionModule } from './db/connectionModule';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';

const sourcePath = resolve('client', 'webui');

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot({ rootPath: sourcePath }),
        UserModule,
        AdminModule,
        ConnectionModule
    ]
})
export class AppModule {
}

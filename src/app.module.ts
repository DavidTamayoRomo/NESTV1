import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { TribeModule } from './modules/tribe/tribe.module';

@Module({
  imports: [
    ConfigModule,
    OrganizationModule,
    TribeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

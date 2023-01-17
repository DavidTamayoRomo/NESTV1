import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { TribeModule } from './modules/tribe/tribe.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule,
    OrganizationModule,
    TribeModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

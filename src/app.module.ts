import { Module } from '@nestjs/common';
import { OrganizationModule } from './modules/organization/organization.module';
import { TribeModule } from './modules/tribe/tribe.module';
import { DatabaseModule } from './database/database.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { MetricModule } from './modules/metric/metric.module';

@Module({
  imports: [
    OrganizationModule,
    TribeModule,
    DatabaseModule,
    RepositoryModule,
    MetricModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}

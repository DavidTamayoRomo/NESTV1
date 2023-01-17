import { Injectable } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Configuration } from 'src/config/config.key';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { Organization } from 'src/modules/organization/organization.entity';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(config: ConfigService) {
        const dbUrl = new URL(config.get(Configuration.DATABASE_URL));
        const routingId = dbUrl.searchParams.get('options');
        dbUrl.searchParams.delete('options');
  
        return {
          ssl: true,
          type: config.get(Configuration.DATABASE) as 'cockroachdb',
          url: dbUrl.toString(),
          synchronize: false,
          migrationsRun: true,
          extra: {
            options: routingId,
          },
          autoLoadEntities: true,
          dropSchema: false,
          entities: [Organization],
        } as TypeOrmModuleOptions;
      },
    }),
  ];
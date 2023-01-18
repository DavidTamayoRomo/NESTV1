import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Organization } from 'src/modules/organization/organization.entity';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
      async useFactory() {
        const dbUrl = new URL(process.env.DATABASE_URL);
        const routingId = dbUrl.searchParams.get('options');
        dbUrl.searchParams.delete('options');
  
        return {
          ssl: true,
          type: process.env.DATABASE as 'cockroachdb',
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
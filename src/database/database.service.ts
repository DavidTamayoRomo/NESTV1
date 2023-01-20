import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Organization } from '../modules/organization/organization.entity';

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
      async useFactory() {
        const dbUrl = new URL("postgresql://david:kgAp720fQbD7PygE54gQAQ@arrow-dreamer-3139.g8z.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full");
        const routingId = dbUrl.searchParams.get('options');
        dbUrl.searchParams.delete('options');
  
        return {
          ssl: true,
          type: "cockroachdb",
          url: dbUrl.toString(),
          synchronize: false,
          migrationsRun: true,
          extra: {
            options: routingId,
          },
          autoLoadEntities: true,
          dropSchema: false,
          entities: [Organization],
          migrations: ['./migrations/*{.ts,.js}'],
        } as TypeOrmModuleOptions;
      },
    }),
  ];
import { Repository } from '../../src/modules/repository/repository.entity';
import { GetAllRepositoryDto } from '../../src/modules/repository/dto/get-all-repository.dto';
import { Tribe } from '../../src/modules/tribe/tribe.entity';
import { plainToInstance } from 'class-transformer';
import { Metric } from '../../src/modules/metric/metric.entity';
import {GetAllTribeDto} from "../../src/modules/tribe/dto/get-all-tribe.dto";
import {Organization} from "../../src/modules/organization/organization.entity";

export const config_connection: object = {
  ssl: true,
  type: 'cockroachdb',
  database: 'defaultdb',
  url: 'postgresql://jhonatan:cAaE4PmPr3CFnNpOvVgZHg@free-tier11.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full',
  synchronize: true,
  migrationsRun: true,
  extra: {
    options: '--cluster=rash-ray-1275',
  },
  entities: ['src/**/**/*.entity{.ts,.js]}'],
  migrations: ['src/database/migrations/*{.ts,.js]}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
export const metric: Metric = {
  id_repository: 1,
  repository: new Repository(),
  coverage: 76,
  bugs: 1,
  vulnerabilities: 5,
  code_smells: 9,
  hotspot: 1,
};
export const itemRepositoryDto: GetAllRepositoryDto = {
  name: 'A test todo',
  state: 'E',
  status: 'I',
  tribe: new Tribe(),
  metrics: [
    { ...metric, coverage: 10 },
    { ...metric, coverage: 75 },
    { ...metric, coverage: 86 },
    { ...metric, coverage: 22 },
  ],
  createTime: new Date('2022-07-08T06:34:31.494Z'),
};
export const itemRepository = {
  id_repository: 7,
  ...itemRepositoryDto,
};
export const listRepositories: GetAllRepositoryDto[] = plainToInstance(
  GetAllRepositoryDto,
  [itemRepositoryDto, itemRepositoryDto],
);
export const itemTribuDto: GetAllTribeDto = {
  name: 'Centro Digital',
  status: 1,
  // @ts-ignore
  repository:[itemRepositoryDto],
  organization: new Organization()
}
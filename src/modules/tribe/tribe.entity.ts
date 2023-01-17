import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from '../organization/organization.entity';

@Entity('tribes')
export class Tribe extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  'id_tribe': number;

  @ManyToOne(() => Organization, (organization) => organization.tribu, {
    eager: true,
  })
  'organization': Organization;



  @Column({
    length: 50,
    type: 'char',
  })
  'name': string;

  @Column({ type: 'integer' })
  'status': number;
}

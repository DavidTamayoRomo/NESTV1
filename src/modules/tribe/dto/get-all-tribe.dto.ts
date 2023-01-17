import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Organization } from '../../organization/organization.entity';

export class GetAllTribeDto {
  @IsNotEmpty()
  organization: Organization;

  

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;
}

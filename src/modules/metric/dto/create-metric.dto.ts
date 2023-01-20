import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty, IsNumber } from 'class-validator';


export class CreateMetricDto {
  @ApiProperty({
    description: "Id of the repository",
    default: false,
  })
  @IsNotEmpty()
  @IsNumber()
  'id_repository': number;

  @IsNotEmpty()
  @IsNumber()
  'coverage': number;

  @IsNotEmpty()
  @IsNumber()
  'bugs': number;

  @IsNotEmpty()
  @IsNumber()
  'hotspot': number;

  @IsNotEmpty()
  @IsNumber()
  'code_smells': number;

  @IsNotEmpty()
  @IsNumber()
  'vulnerabilities': number;
}

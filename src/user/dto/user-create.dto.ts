import { Type } from 'class-transformer';
import { CustomValidator } from '../helpers/custom-validator';
import {
  IsString,
  IsInt,
  ArrayNotEmpty,
  ArrayMinSize,
  ArrayMaxSize,
  MinLength,
  MaxLength,
  ValidateNested,
  Validate,
} from 'class-validator';

const valueMin = 3,
  valueMax = 5;

class UserAddressDto {
  @IsString()
  readonly street: string;

  @IsInt()
  readonly house: number;
}

export class UserCreateDto {
  @Validate(CustomValidator)
  @IsString({ message: 'Це не рядок' })
  readonly name: string;
  @IsInt()
  readonly age: number;

  @Type(() => UserAddressDto)
  @ValidateNested()
  readonly address: UserAddressDto;

  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  @MinLength(valueMin, {
    each: true,
    message: `Tag is too short. Minimal length is ${valueMin} characters`,
  })
  @MaxLength(valueMax, {
    each: true,
    message: `Tag is too long. Maximal length is ${valueMax} characters`,
  })
  readonly tags: string[];
}

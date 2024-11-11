import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class CustomValidator implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    //логіка валідації
    return value.startsWith('custom_');
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `String no startsWith custom_`;
  }
}

import { emailRegex as regex } from "@/utils/regex";
import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements FieldValidation {  
  constructor( readonly field: string) {}
  
  validate(value: string): Error {
    const emailRegex = regex
    return (!value || emailRegex.test(value)) ? null : new InvalidFieldError()
  }
}
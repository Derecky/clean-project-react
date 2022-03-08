import { InvalidFieldError } from "@/validation/errors"
import { EmailValidation } from "./email-validation"

const makeSut = () => new EmailValidation('email')

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
import faker from "@faker-js/faker"
import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from "@/validation/validators"
import { ValidationBuilder as sut} from "./validation-builder"


describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column()
    const minLenght = faker.datatype.number()
    const validations = sut.field(field).min(minLenght).build()
    expect(validations).toEqual([new MinLengthValidation(field, minLenght)])
  })

  test('Should return a list of validations', () => {
    const field = faker.database.column()
    const minLenght = faker.datatype.number()
    const validations = sut.field(field).required().email().min(minLenght).build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, minLenght)
    ])
  })
})
import { FieldValidationSpy } from "../teste/mock-field-validation"
import { ValidationComposite } from "./validator-composite"

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'), 
    new FieldValidationSpy('any_field')
  ]

  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {

  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut()

    //injeta um erro em todos os fieldValidationsSpy
    fieldValidationsSpy.map((fvs, index) => fvs.error = new Error(`error_message_${index  + 1}`))  
    
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('error_message_1')
  })
})
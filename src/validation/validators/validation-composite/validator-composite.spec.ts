import faker from "@faker-js/faker"
import { FieldValidationSpy } from "@/validation/teste"
import { ValidationComposite } from "./validator-composite"

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName), 
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {

  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words();
    //injeta um erro em todos os fieldValidationsSpy
    fieldValidationsSpy.map((fvs, index) => fvs.error = new Error(index === 0 ? errorMessage :  faker.random.words()) )  
    
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if no validation fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)   
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
  
})
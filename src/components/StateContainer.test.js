import React from 'react'
import StateContainer from './StateContainer.jsx'
import wordSet from 'more-words'
import { shallow } from 'enzyme'

describe('StateContainer render', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<StateContainer />)
  })

  test('should render the correct tree of components', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('StateContainer helper methods', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<StateContainer />)
  })

  describe('#pickRandomIndex', () => {
    test('should return a random index given an array', () => {
      const sampleArray = [1, 2, 3, 4, 5, 6, 7]
      const randomIndex = wrapper.instance().pickRandomIndex(sampleArray)
      expect(Number.isInteger(randomIndex)).toBe(true)
      expect(sampleArray.includes(sampleArray[randomIndex])).toBe(true)
    })
  })

  describe('#generatePassword', () => {
    test('should return an array', () => {
      const returnValueisArray = Array.isArray(
        wrapper.instance().generatePassword(wordSet)
      )
      expect(returnValueisArray).toBe(true)
    })

    test('should only generate values from the given dictionary', () => {
      const result = wrapper.instance().generatePassword(wordSet)
      const allWordsWereFromOriginalSet = result
        .map(word => wordSet.includes(word))
        .every(bool => bool === true)
      expect(allWordsWereFromOriginalSet).toBe(true)
    })
  })

  describe('#filterWordSet', () => {
    test('given a word length limit and a set of words, should filter out words over that limit from that set', () => {
      const state = wrapper.state()
      const defaultLengthLimit = state.passwordMaxWordLengthCurrent
      const result = wrapper.instance().generatePassword(wordSet)
      const resultContainsValuesLongerThanDefaultLimit = result.some(
        word => word.length > defaultLengthLimit
      )
      expect(resultContainsValuesLongerThanDefaultLimit).toBe(false)
    })
  })
})

describe('StateContainer event handlers', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<StateContainer />)
  })

  describe('#handleSubmitButtonClick', () => {
    test('should set a new password value', () => {
      const initialPasswordContent = wrapper.state('passwordContent')
      expect(initialPasswordContent.length).toBe(0)
      wrapper.instance().handleSubmitButtonClick()
      const afterClickPasswordContent = wrapper.state('passwordContent')
      expect(afterClickPasswordContent.length).toBe(4)
    })
  })

  describe('#handleMaxWordLengthInput', () => {
    test('should trigger the generation of a new password value with words of limited length', () => {
      const newWordMaxLength = '4'
      wrapper.instance().handleMaxWordLengthInput({target: {value: newWordMaxLength}})
      const afterChangePasswordContent = wrapper.state('passwordContent')
      const contentContainsValuesLongerThanRequestedLimit = afterChangePasswordContent.some(
        word => word.length > newWordMaxLength
      )
      expect(contentContainsValuesLongerThanRequestedLimit).toBe(false)
    })
  })

  describe('#handleMaxPasswordLengthInput', () => {
    test('should trigger the generation of a new password value less than the new total length limit', () => {
      const newPassMaxLength = '16'
      wrapper.instance().handleMaxPasswordLengthInput({target: {value: newPassMaxLength}})
      const afterChangePasswordContent = wrapper.state('passwordContent')
      const actualPasswordLength = afterChangePasswordContent.join('').length
      const setLimit = parseInt(newPassMaxLength, 10)
      expect(actualPasswordLength < setLimit).toBe(true)
    })
  })

  describe('#handleUpdatingPasswordLength', () => {
    test('should calculate and set the passwordMaxWordLengthPossible value based on the current passwordMaxLength value', () => {
      const newPassMaxLength = 15
      const expectedMaxWordLengthPossible = 3
      // simulate a new passwordMaxLength value
      wrapper.setState({passwordMaxLength: newPassMaxLength})
      wrapper.instance().handleUpdatingPasswordLength()
      const actualMaxWordLengthPossible = wrapper.state('passwordMaxWordLengthPossible')
      expect(actualMaxWordLengthPossible).toBe(expectedMaxWordLengthPossible)
    })
    test('should leave the passwordMaxWordLengthCurrent value unchanged if falls within the limit of the new passWordMaxLength constraint', () => {
      const newPassMaxLength = 19
      const expectedMaxWordLengthCurrent = wrapper.state('passwordMaxWordLengthCurrent')
      // simulate a new passwordMaxLength value
      wrapper.setState({passwordMaxLength: newPassMaxLength})
      wrapper.instance().handleUpdatingPasswordLength()
      const actualMaxWordLengthCurrent = wrapper.state('passwordMaxWordLengthCurrent')
      expect(actualMaxWordLengthCurrent).toBe(expectedMaxWordLengthCurrent)
    })
    test('should set a new passwordMaxWordLengthCurrent value if the old value could violate the new passwordMaxWordLength constraint', () => {
      const newPassMaxLength = 10
      const expectedMaxWordLengthCurrent = 2
      wrapper.setState({passwordMaxLength: newPassMaxLength})
      wrapper.instance().handleUpdatingPasswordLength()
      const actualMaxWordLengthCurrent = wrapper.state('passwordMaxWordLengthCurrent')
      expect(actualMaxWordLengthCurrent).toBe(expectedMaxWordLengthCurrent)
    })
  })
})

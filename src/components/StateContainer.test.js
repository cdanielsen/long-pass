import React from 'react'
import StateContainer from './StateContainer.jsx'
import wordSet from 'more-words'
import { shallow } from 'enzyme'

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

    test('should only return values from the given dictionary', () => {
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

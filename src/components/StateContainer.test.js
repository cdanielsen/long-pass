import React from 'react'
import StateContainer from './StateContainer.jsx'
import { shallow } from 'enzyme'

describe('StateContainer component', () => {
  test('#pickRandomIndex should return a random index given an array', () => {
    const wrapper = shallow(<StateContainer />)
    const sampleArray = [1, 2, 3, 4, 5, 6, 7]
    const randomIndex = wrapper.instance().pickRandomIndex(sampleArray)
    expect(sampleArray.includes(sampleArray[randomIndex])).toBe(true)
  })
})

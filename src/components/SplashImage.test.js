import React from 'react'
import SplashImage from './SplashImage.jsx'
import { shallow } from 'enzyme'

describe('SplashImage component', () => {
  test('Should return an image tag with an id and the correct src attribute', () => {
    const imagePath = 'http://image.com'
    const id = 'sploosh'
    const wrapper = shallow(<SplashImage id={id} imageUrl={imagePath} />)

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.is('a')).toBe(true)
    expect(wrapper.find('img').prop('src')).toEqual(imagePath)
    expect(wrapper.find('img').prop('id')).toEqual(id)
  })
})

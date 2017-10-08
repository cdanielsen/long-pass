import React from 'react'
import SplashImage from './SplashImage.jsx'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({adapter: new Adapter()})

describe('Header component', () => {
  test('Should return an image tag with an id and the correct src attribute', () => {
    const imagePath = 'http://image.com'
    const id = 'sploosh'
    const wrapper = shallow(<SplashImage id={id} imageUrl={imagePath} />)

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.prop('src')).toEqual(imagePath)
    expect(wrapper.prop('id')).toEqual(id)
  })
})

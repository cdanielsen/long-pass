import React from 'react'
import Header from './Header.jsx'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({adapter: new Adapter()})

describe('Header component', () => {
  test('Should return a div with the correct class and text', () => {
    const className = 'stuff'
    const textContent = 'Yolo!'
    const wrapper = shallow(<Header className={className} textContent={textContent} />)

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.prop('className')).toEqual(className)
    expect(wrapper.text()).toEqual(textContent)
  })
})

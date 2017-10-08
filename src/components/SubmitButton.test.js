import React from 'react'
import SubmitButton from './SubmitButton.jsx'
import { shallow } from 'enzyme'

describe('SubmitButton component', () => {
  const props = {
    id: 'lolbutton',
    clickHandler: jest.fn()
  }
  const wrapper = shallow(<SubmitButton {...props} />)

  test('Given props, should render with the correct attributes', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.prop('id')).toEqual(props.id)
    expect(wrapper.prop('onClick')).toEqual(props.clickHandler)
  })

  test('When clicked, should call event handler', () => {
    wrapper.simulate('click')
    expect(props.clickHandler.mock.calls.length).toEqual(1)
  })
})

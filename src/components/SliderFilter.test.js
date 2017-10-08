import React from 'react'
import SliderFilter from './SliderFilter.jsx'
import { shallow } from 'enzyme'

describe('Slider Filter component', () => {
  const props = {
    title: 'Sweet sweet slider',
    id: '1',
    min: 1,
    max: 10,
    value: 5,
    newSelectionHandler: jest.fn()
  }

  test('Given props, should return with the correct attributes', () => {
    const wrapper = shallow(<SliderFilter {...props} />)
    const inputElementProps = wrapper.find('input').props()

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('h3').first().text()).toEqual(props.title)
    expect(inputElementProps.id).toEqual(props.id)
    expect(inputElementProps.onChange).toEqual(props.newSelectionHandler)
    expect(inputElementProps.min).toEqual(props.min)
    expect(inputElementProps.max).toEqual(props.max)
    expect(inputElementProps.value).toEqual(props.value)
  })

  test('When the input value changes, onChange handler should be called', () => {
    const mockEvent = {target: {value: 3}}
    const wrapper = shallow(<SliderFilter {...props} />)

    wrapper.find('input').simulate('change', mockEvent)
    expect(props.newSelectionHandler.mock.calls.length).toEqual(1)
    expect(props.newSelectionHandler).toHaveBeenCalledWith(mockEvent)

    props.newSelectionHandler.mockReset()
  })
})

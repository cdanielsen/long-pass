import React from 'react'
import PasswordPresenter from './PasswordPresenter.jsx'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({adapter: new Adapter()})

describe('PasswordPresenter component', () => {
  const props = {
    id: 'presenter',
    passwordContent: ['force', 'hammer', 'flower', 'coffee']
  }
  test('renders a div with the passed in password content', () => {
    const wrapper = shallow(<PasswordPresenter {...props} />)

    expect(wrapper).toMatchSnapshot()
    expect(wrapper.prop('id')).toEqual(props.id)
    expect(wrapper.text()).toEqual(props.passwordContent.join(' '))
  })
})

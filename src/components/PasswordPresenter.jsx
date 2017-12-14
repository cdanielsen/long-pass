import React from 'react'
import PropTypes from 'prop-types'

function PasswordPresenter({ id, passwordContent }) {
  const styledWord = passwordContent.join(' ')
  return <div id={id}>{styledWord}</div>
}

PasswordPresenter.propTypes = {
  passwordContent: PropTypes.array,
  id: PropTypes.string,
}

export default PasswordPresenter

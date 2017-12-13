import React from 'react'
import PropTypes from 'prop-types'

function Header({ className, textContent }) {
  return <div className={className}>{textContent}</div>
}

Header.propTypes = {
  textContent: PropTypes.string,
  className: PropTypes.string,
}

export default Header

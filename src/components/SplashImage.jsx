import React from 'react'
import PropTypes from 'prop-types'

function SplashImage ({id, imageUrl}) {
  return (
    <img id={id} src={imageUrl} />
  )
}

SplashImage.propTypes = {
  imageUrl: PropTypes.string,
  id: PropTypes.string
}

export default SplashImage

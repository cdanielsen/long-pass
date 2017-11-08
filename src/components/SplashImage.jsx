import React from 'react'
import PropTypes from 'prop-types'

function SplashImage ({id, imageUrl}) {
  return (
    <a href="https://xkcd.com/936/">
      <img id={id} src={imageUrl} />
    </a>
  )
}

SplashImage.propTypes = {
  imageUrl: PropTypes.string,
  id: PropTypes.string
}

export default SplashImage

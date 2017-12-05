import React from 'react'
import PropTypes from 'prop-types'

function SliderFilter ({title, inputId, min, max, newSelectionHandler, value}) {
  return (
    <div>
      <h3>{title}</h3>
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step="1"
        onChange={newSelectionHandler}
        value={value}
      />
      <h3>{value}</h3>
    </div>
  )
}

SliderFilter.propTypes = {
  title: PropTypes.string.isRequired,
  inputId: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  newSelectionHandler: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default SliderFilter

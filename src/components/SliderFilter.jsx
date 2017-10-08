import React from 'react'
import PropTypes from 'prop-types'

function SliderFilter ({title, id, min, max, newSelectionHandler, value}) {
  return (
    <div>
      <h3>{title}</h3>
      <input
        id={id}
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
  id: PropTypes.string,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  newSelectionHandler: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default SliderFilter

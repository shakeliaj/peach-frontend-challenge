import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '@mui/material'
import classNames from 'classnames'

import styling from './plotModal.module.scss'

// PlotModal component
// Is displayed in MovieModal as a child modal for expanding the plot section

const PlotModal = ({ plot }) => {
  const [isOpen, setIsOpen] = useState(false)
  // Returns a button that when clicked opens a modal showing the full plot description
  return (
    <>
      <div className={styling['read-more-btn-container']}>
        <button onClick={() => setIsOpen(true)}>Read More</button>
      </div>
      <Modal className='modal' open={isOpen} onClose={() => setIsOpen(false)}>
        <div className={classNames('modal-content-container', styling['plot-content-container'])}>
          {plot}
          <button onClick={() => setIsOpen(false)} className='button'>Close</button>
        </div>
      </Modal>
    </>
  )
}

PlotModal.propTypes = {
  plot: PropTypes.string,
}

export default PlotModal
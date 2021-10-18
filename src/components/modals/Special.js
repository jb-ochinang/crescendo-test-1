import React from 'react';
import { Modal, Backdrop, Zoom, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import './_style.scss';
import './Special.scss';

const SpecialModal = ({
  open,
  onClose,
  data
}) => {
  const { title, text, code, geo } = data || {};

  return (
    <div>
      <Modal
        aria-labelledby="special-title"
        aria-describedby="special-desc"
        className="special-modal common-modal"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          <div className="paper-wrapper">
            <div className="paper">
              <div className="modal-header">
                <h2>{title}</h2>
                <IconButton
                  onClick={() => onClose()} className="close-btn">
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="modal-body">
                <p>{text}</p>
                {code && <p><span className="code">{code}</span></p>}
                {geo &&
                  <>
                    <p>Geocode: {geo}</p>
                    <p>
                      <Button component="a" color="secondary" variant="outlined" href="https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/utils/geocoder" target="_blank" rel="noreferrer">Search Geocode</Button>
                    </p>
                  </>
                }
              </div>
            </div>
          </div>
        </Zoom>
      </Modal>
    </div>
  )
}

export default SpecialModal;
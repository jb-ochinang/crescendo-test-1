import React from 'react';
import { Modal, Backdrop, Zoom, Button } from '@material-ui/core';
import { ReactComponent as ConditionalIcon } from '../../assets/icons/alert-delete.svg';
import './_style.scss';
import './Conditional.scss';

const Conditional = ({
  className,
  title,
  description,
  open,
  onClose,
  acceptBtn_label,
  deniedBtn_label,
  onAccept,
  onDenied,
}) => {

  return (
    <div>
      <Modal
        aria-labelledby="conditional-title"
        aria-describedby="conditional-desc"
        className={`conditional-modal common-modal ${className ? className : ''}`}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableBackdropClick
        disableEscapeKeyDown
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Zoom in={open}>
          <div className="paper-wrapper">

            <div className="paper">
              <div className="modal-body">
              <ConditionalIcon className="icon" />
              <h2 id="conditional-title" className="title">
                {title ? title : 'Warning'}
              </h2>
              {description &&
                <p id="conditional-desc" className="desc">
                  {description}
                </p>
              }
              <Button
                className="accept-btn"
                variant="contained"
                disableElevation
                onClick={onAccept}>
                {acceptBtn_label ? acceptBtn_label : 'OK'}
              </Button>
              <Button
                className="denied-btn"
                variant="contained"
                disableElevation
                onClick={onDenied}>
                {deniedBtn_label ? deniedBtn_label : 'Cancel'}
              </Button>
              </div>
            </div>

          </div>
        </Zoom>
      </Modal>
    </div>
  );
}

export default Conditional;
import React from 'react';
import { ReactComponent as LoaderIconSlim } from '../../assets/icons/loader-slim.svg';
import { ReactComponent as LoaderIconThick } from '../../assets/icons/loader-thick.svg';
import Fade from '@material-ui/core/Fade';
import './Loader.scss'

const Loader = ({ appear, timeout, className, coloredBg, thick, width, id, svgProps }) => {

  return (
    <Fade in={appear} timeout={timeout ? timeout : 500}>
      <div className={`loader ${coloredBg ? 'colored-bg' : ''} ${className ? className : ''}`} >
        {thick
          ? <LoaderIconThick
            className="loader-icon"
            id={id ? id : null}
            style={
              svgProps
                ? {
                    position: `${svgProps.absolute ? 'absolute' : 'relative'}`,
                    [svgProps.direction]: `${svgProps.negative && '-'}${width}`
                  }
                : null
            }
            width={width}
          />
          : <LoaderIconSlim
            className="loader-icon"
            style={
              svgProps
                ? {
                    position: `${svgProps.absolute ? 'absolute' : 'relative'}`,
                    [svgProps.direction]: `${svgProps.negative && '-'}${width}`
                  }
                : null
            }
            width={width}
          />
        }
      </div>
    </Fade>
  );
}

export default Loader;
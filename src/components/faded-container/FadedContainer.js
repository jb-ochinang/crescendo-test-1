import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FadedContainer.scss';

const FadedContainer = ({ children, loading, className, loader, duration, delay }) => {

  const loader_animate = {
    hidden: {
      opacity: 0,
      transition: { duration: duration ? duration : .5 }
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
      transition: { duration: duration ? duration : .5, delay: delay ? delay : 1 }
    }
  }
  
  const content_animate = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {loading && (
          <motion.div
            key={loading ? 'loading' : ''}
            className={`faded-container ${className ? className : ''}`}
            variants={loader_animate}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            {loader}
          </motion.div>
        )
      }
      {!loading && (
          <motion.div
            key={loading ? '' : 'show'}
            className={`faded-container ${className ? className : ''}`}
            variants={content_animate}
            initial='hidden'
            animate='visible'
          >
            {children}
          </motion.div>
        )
      }
    </AnimatePresence>
  );
}

export default FadedContainer;
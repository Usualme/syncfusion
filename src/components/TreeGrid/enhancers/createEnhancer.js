import React from 'react'

export const createEnhancer = (addProps, addServices) => {
  addServices = addServices ? (Array.isArray(addServices) ? addServices : [addServices]) : [];

  let enhanceProps;
  if (typeof addProps !== 'function') {
    const passedProps = (!addProps || typeof addProps !== 'object') ? {} : addProps;
    enhanceProps = () => passedProps;
  } else {
    enhanceProps = addProps;
  }

  return ({ children, injectServices, ...otherProps }) => {
    injectServices = injectServices ? (Array.isArray(injectServices) ? injectServices : [injectServices]) : [];

    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...otherProps,
          injectServices: [...injectServices, ...addServices],
          ...enhanceProps(otherProps)
        });
      }
      return child;
    });

  };
};

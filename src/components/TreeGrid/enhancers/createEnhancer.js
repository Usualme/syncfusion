import React from 'react';

export const mergeToArray = (...args) => {
  const result = [];
  for (const probablyArray of args) {
    if (!probablyArray) continue;

    if (Array.isArray(probablyArray)) {
      result.push(...probablyArray);
    } else {
      result.push(probablyArray);
    }
  }
  return result;
};

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
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...otherProps,
          ...enhanceProps(otherProps),
          injectServices: mergeToArray(injectServices, addServices)
        });
      }
      return child;
    });
  };
};

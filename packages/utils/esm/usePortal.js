import React, { useState, useEffect } from 'react';
import { createPortal, unmountComponentAtNode } from 'react-dom';
export var usePortal = () => {
  var [container] = React.useState(() => {
    var el = document.createElement('div');
    return el;
  });
  var [portal, setPortal] = useState({
    render: () => null,
    remove: () => null,
  });
  var ReactCreatePortal = React.useCallback((elmm) => {
    var Portal = (_ref) => {
      var { children } = _ref;
      if (!children) return null;
      return /*#__PURE__*/ createPortal(children, elmm);
    };
    var remove = (elm) => {
      elm && unmountComponentAtNode(elm);
    };
    return {
      render: Portal,
      remove,
    };
  }, []);
  useEffect(() => {
    if (container) portal.remove();
    var newPortal = ReactCreatePortal(container);
    setPortal(newPortal);
    return () => {
      newPortal.remove(container);
    };
  }, [container]);
  return {
    Portal: portal.render,
    container,
  };
};

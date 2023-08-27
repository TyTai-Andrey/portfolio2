import React from 'react';

export function addExtraPropsChildren<T extends object>(
  children: React.ReactNode,
  props: T,
): any {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (typeof child.props.children === 'object') {
      return React.cloneElement<any>(child, {
        children: addExtraPropsChildren(child.props.children, props),
      });
    }

    if (typeof child.type !== 'string') {
      return React.cloneElement<any>(child, {
        //TODO error Invalid value for prop (`clear` && `setField`) on <div> tag.
        ...props,
      });
    } else {
      return React.cloneElement<any>(child, {});
    }
  });
}

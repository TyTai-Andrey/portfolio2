import React, { FC, useEffect, useState } from 'react';
import styles from './Key.module.scss';
import classNames from 'classnames';

export type KeyProps = {
  letter: string;
  className?: string;
  highlightWhenPressedKey?: string | string[];
};

export const Key: FC<KeyProps> = ({
  letter,
  className,
  highlightWhenPressedKey,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', ({ code }) => {
      if (
        code === highlightWhenPressedKey ||
        highlightWhenPressedKey?.includes(code)
      )
        setIsPressed(true);
    });
    window.addEventListener('keyup', ({ code }) => {
      if (
        code === highlightWhenPressedKey ||
        highlightWhenPressedKey?.includes(code)
      )
        setIsPressed(false);
    });
  }, []);

  return (
    <div
      className={classNames(styles.root, className, {
        [styles.pressed]: isPressed,
      })}
    >
      {letter}
    </div>
  );
};

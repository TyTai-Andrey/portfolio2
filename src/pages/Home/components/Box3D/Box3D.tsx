import React, { CSSProperties, FC, useMemo, useState } from 'react';
import styles from './Box3D.module.scss';
import classNames from 'classnames';

export type Box3DProps = {};

export const Box3D: FC<Box3DProps> = () => {
  const [isDrag, setIsDrag] = useState(false);
  const [initPoints, setInitPoints] = useState({
    x: 0,
    y: 0,
  });

  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDrag) {
      setInitPoints({
        x: e.pageX,
        y: e.pageY,
      });
      setPoints((prev) => {
        const x = prev.x + initPoints.x - e.pageX;
        const y = prev.y + initPoints.y - e.pageY;

        return {
          x: x >= 360 ? x - 360 : x <= -360 ? x + 360 : x,
          y: y >= 360 ? y - 360 : y <= -360 ? y + 360 : y,
        };
      });
    }
  };

  const endDrag = () => {
    setIsDrag(false);
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDrag(true);
    setInitPoints({
      x: e.pageX,
      y: e.pageY,
    });
  };

  const transform = useMemo(() => {
    const x = -points.x;
    const y = points.y;

    return `rotate3d(0, 1, 0, ${x}deg) rotate3d(1, 0, 0, ${y}deg)`;
  }, [points]);

  return (
    <div
      className={styles.root}
      onMouseDown={startDrag}
      onMouseMove={onMouseMove}
      onMouseEnter={endDrag}
      onMouseUp={endDrag}
      style={{
        transform,
      }}
    >
      <div className={classNames(styles.side, styles.front)}>1</div>
      <div className={classNames(styles.side, styles.right)}>2</div>
      <div className={classNames(styles.side, styles.back)}>3</div>
      <div className={classNames(styles.side, styles.left)}>4</div>
      <div className={classNames(styles.side, styles.top)}>5</div>
      <div className={classNames(styles.side, styles.bottom)}>6</div>
    </div>
  );
};

import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import styles from '../Box3D/Box3D.module.scss';
import classNames from 'classnames';
import { Key } from '@components/Key';

export type Box3DOnButtonsProps = {};

export const Box3DOnButtons: FC<Box3DOnButtonsProps> = () => {
  const [points, setPoints] = useState({
    isDrag: false,
    x: 0,
    y: 0,
    z: 0,
  });

  const transform = useMemo(() => {
    const x = points.x;
    const y = points.y;
    const z = points.z;

    return `rotate3d(0, 1, 0, ${x}deg) rotate3d(1, 0, 0, ${y}deg) rotate3d(0, 0, 1, ${z}deg)`;
  }, [points]);

  useEffect(() => {
    if (points.isDrag)
      setTimeout(() => {
        setPoints((prev) => ({ ...prev, isDrag: false }));
      }, 500);
  }, [points.isDrag]);

  useEffect(() => {
    window.addEventListener('keydown', ({ code }) => {
      setPoints((prev) => {
        if (prev.isDrag) return prev;

        let _x = prev.x;
        let _y = prev.y;
        let _z = prev.z;

        let _x_abs = Math.abs(_x % 360);
        let _y_abs = Math.abs(_y % 360);
        let _z_abs = Math.abs(_z % 360);

        let _x_negative_sign = prev.x < 0;
        let _y_negative_sign = prev.y < 0;
        let _z_negative_sign = prev.z < 0;

        if (_x_abs === 0 || _x_abs === 180 || _y_abs === 0) {
          if (code === 'ArrowLeft' || code === 'Numpad4') {
            if (_x_abs !== 90 && _x_abs !== 270) {
              _x -= 90;
            }
          } else if (code === 'ArrowUp' || code === 'Numpad8') {
            if (_x_abs === 0) {
              _y += 90;
            } else if (_x_abs === 180) {
              _y -= 90;
            }
          } else if (code === 'ArrowRight' || code === 'Numpad6') {
            if (_x_abs !== 90 && _x_abs !== 270) {
              _x += 90;
            }
          } else if (code === 'ArrowDown' || code === 'Numpad2') {
            if (_x_abs === 0) {
              _y -= 90;
            } else if (_x_abs === 180) {
              _y += 90;
            }
          }
        }

        if (_x_abs === 90 || _x_abs === 270 || _z_abs === 0) {
          if (code === 'ArrowLeft' || code === 'Numpad4') {
            if (_x_abs !== 180 && _x_abs !== 0) {
              _x -= 90;
            }
          } else if (code === 'ArrowUp' || code === 'Numpad8') {
            if (_x_abs === 90) {
              if (_y_abs === 90) {
                const add = _y_negative_sign ? -90 : 90;
                const _add = _x_negative_sign ? add : add * -1;
                _x -= add;
                _z -= 90;

                setTimeout(() => {
                  setPoints({ x: _x, y: _y - _add, z: _z, isDrag: true });
                }, 10);

                return { ...prev, x: _x, y: _y, z: _z, isDrag: false };
              } else if (_y_abs === 270) {
                const add = _y_negative_sign ? -90 : 90;
                const _add = _x_negative_sign ? add * -1 : add;
                _x -= add;
                _z += 90;

                setTimeout(() => {
                  setPoints({ x: _x, y: _y + _add, z: _z, isDrag: true });
                }, 10);

                return { ...prev, x: _x, y: _y, z: _z, isDrag: false };
              } else if (_y_abs === 180) {
                _z += _x_negative_sign ? 90 : -90;
              } else {
                _z -= _x_negative_sign ? 90 : -90;
              }
            } else if (_x_abs === 270) {
              if (_y_abs === 90) {
                const add = _y_negative_sign ? -90 : 90;
                const _add = _x_negative_sign ? add * -1 : add;
                _x -= add;
                _z -= 90;
                setTimeout(() => {
                  setPoints({ x: _x, y: _y - _add, z: _z, isDrag: true });
                }, 10);
                return { ...prev, x: _x, y: _y, z: _z, isDrag: false };
              } else if (_y_abs === 270) {
                const add = _y_negative_sign ? -90 : 90;
                const _add = _x_negative_sign ? add * -1 : add;
                _x -= add;
                _z += 90;

                setTimeout(() => {
                  setPoints({ x: _x, y: _y - _add, z: _z, isDrag: true });
                }, 10);

                return { ...prev, x: _x, y: _y, z: _z, isDrag: false };
              } else if (_y_abs === 180) {
                _z += _x_negative_sign ? -90 : 90;
              } else {
                _z -= _x_negative_sign ? -90 : 90;
              }
            }
          } else if (code === 'ArrowRight' || code === 'Numpad6') {
            if (_x_abs !== 180 && _x_abs !== 0) {
              _x += 90;
            }
          } else if (code === 'ArrowDown' || code === 'Numpad2') {
            if (_x_abs === 90) {
              if (_y_abs === 270) {
                const add = _y_negative_sign ? -90 : 90;
                const _add = _x_negative_sign ? add : add * -1;
                _x -= add;
                _z += 90;

                setTimeout(() => {
                  setPoints({ x: _x, y: _y + _add, z: _z, isDrag: true });
                }, 10);

                return { ...prev, x: _x, y: _y, z: _z, isDrag: false };
              } else if (_y_abs === 90) {
                const add = _y_negative_sign ? -90 : 90;
                const _add = _x_negative_sign ? add * -1 : add;
                _x -= add;
                _z -= 90;

                setTimeout(() => {
                  setPoints({ x: _x, y: _y - _add, z: _z, isDrag: true });
                }, 10);

                return { ...prev, x: _x, y: _y, z: _z, isDrag: false };
              } else if (_y_abs === 180) {
                _z += _x_negative_sign ? -90 : 90;
              } else {
                _z -= _x_negative_sign ? -90 : 90;
              }
            } else if (_x_abs === 270) {
              if (_y_abs === 90) {
                const add = _y_negative_sign ? -90 : 90;
                const _add = _x_negative_sign ? add : add * -1;
                _x -= add;
                _z -= 90;

                setTimeout(() => {
                  setPoints({ x: _x, y: _y - _add, z: _z, isDrag: true });
                }, 10);

                return { ...prev, x: _x, y: _y, z: _z, isDrag: false };
              } else if (_y_abs === 270) {
                const add = _y_negative_sign ? 90 : -90;
                const _add = _x_negative_sign ? add * -1 : add;
                _x -= add;
                _z -= 90;

                setTimeout(() => {
                  setPoints({ x: _x, y: _y + _add, z: _z, isDrag: true });
                }, 10);

                return { ...prev, x: _x, y: _y, z: _z, isDrag: false };
              } else if (_y_abs === 180) {
                _z -= _x_negative_sign ? -90 : 90;
              } else {
                _z += _x_negative_sign ? -90 : 90;
              }
            }
          }
        }

        return { ...prev, x: _x, y: _y, z: _z, isDrag: true };
      });
    });
  }, []);

  return (
    <div className={styles.boxWrapper}>
      <div
        className={styles.root}
        style={{
          transform,
          transition: points.isDrag ? 'transform 0.5s' : undefined,
        }}
      >
        <div className={classNames(styles.side, styles.front)}>1</div>
        <div className={classNames(styles.side, styles.right)}>2</div>
        <div className={classNames(styles.side, styles.back)}>3</div>
        <div className={classNames(styles.side, styles.left)}>4</div>
        <div className={classNames(styles.side, styles.top)}>5</div>
        <div className={classNames(styles.side, styles.bottom)}>6</div>
      </div>

      <div className={styles.keys}>
        <Key
          className={styles.top}
          highlightWhenPressedKey={['ArrowUp', 'Numpad8']}
          letter='↑'
        />
        <Key
          className={styles.left}
          highlightWhenPressedKey={['ArrowLeft', 'Numpad4']}
          letter='←'
        />
        <Key
          className={styles.bottom}
          highlightWhenPressedKey={['ArrowDown', 'Numpad2']}
          letter='↓'
        />
        <Key
          className={styles.right}
          highlightWhenPressedKey={['ArrowRight', 'Numpad6']}
          letter='→'
        />
      </div>
      <div className={styles.points}>
        <div className={styles.title}>points</div>
        <div className={styles.body}>
          <div>x: {points.x},</div>
          <div>y: {points.y},</div>
          <div>z: {points.z},</div>
        </div>
      </div>
    </div>
  );
};

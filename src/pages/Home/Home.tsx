import React, { FC } from 'react';
import styles from './Home.module.scss';
import { RouteComponentProps } from 'react-router';
import { Box3D } from './components/Box3D';
import { Box3DOnButtons } from './components/Box3DOnButtons';

export type HomeProps = RouteComponentProps;

const Home: FC<HomeProps> = () => {
  return (
    <div className={styles.root}>
      <div>
        <Box3D />
        <div className={styles.mt}>move with mouse</div>
      </div>
      <div>
        <Box3DOnButtons />
        <div className={styles.mt}>
          <div>move with the keyboard</div>
          <div className={styles.mt}>keys:</div>
          <div className={styles.mt}>
            <ul className={styles.list}>
              <li>ArrowLeft</li>
              <li>Numpad4</li>
              <li>ArrowUp</li>
              <li>Numpad8</li>
              <li>ArrowRight</li>
              <li>Numpad6</li>
              <li>ArrowDown</li>
              <li>Numpad2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

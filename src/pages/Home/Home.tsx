import React, { FC } from 'react';
import styles from './Home.module.scss';
import { RouteComponentProps } from 'react-router';
import { Box3D } from './components/Box3D';
import { Box3DOnButtons } from './components/Box3DOnButtons';

export type HomeProps = RouteComponentProps;

const Home: FC<HomeProps> = () => {
  return (
    <div className={styles.root}>
      <Box3D />
      <Box3DOnButtons />
    </div>
  );
};

export default Home;

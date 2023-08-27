import React, { FC } from 'react';
import styles from './Other.module.scss';

export type OtherProps = {};

const Other: FC<OtherProps> = (props) => {
  return <div className={styles.root}>Other component is mounted!</div>;
};

export default Other;

import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <h1 className={styles.root}>
      <span>☹️</span>
      <br />
      404 Ничего не найдено
    </h1>
  );
};

export default NotFoundBlock;

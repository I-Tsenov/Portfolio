import React, { type PropsWithChildren } from 'react';
import styles from './Main.module.scss';

const Main: React.FC<PropsWithChildren> = ({ children }) => {
    return <main className={styles.mainContainer}>{children}</main>;
};

export default Main;

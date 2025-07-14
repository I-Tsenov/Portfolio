import React, { type PropsWithChildren } from 'react';
import styles from './Main.module.scss';

// -5rem accounts for the header and footer height (+2rem if we add footer)
const Main: React.FC<PropsWithChildren> = ({ children }) => {
    return <main className={styles.mainContainer}>{children}</main>;
};

export default Main;

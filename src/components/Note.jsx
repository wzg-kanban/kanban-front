import styles from './Note.css';
import React from 'react';

export default ({children, ...props}) => (
    <div className={styles.note} {...props}>
        {children}
    </div>
);
import React from 'react';
import styles from './Footer.scss';

const Footer = () => {
    const d = new Date().getFullYear();
    return (
        <div className={styles.Contents}>
            <div>Ryan Christie</div>
            <div>Copyright {d}</div>
        </div>
    );
}

export default Footer;
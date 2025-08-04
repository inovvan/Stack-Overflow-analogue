import React from 'react';
import * as styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.text}>© 2025 CODELANG. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

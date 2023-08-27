import React, { FC } from 'react';
import styles from './Layout.module.scss';
import { menu } from '@utils/routes';
import { NavLink } from 'react-router-dom';
import Button from '@components/Button';
import { loguot } from '@store/index';

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const onLoguot = () => loguot();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logo}>logo</div>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {menu.map((item) => (
              <li key={item.path}>
                <NavLink
                  draggable={false}
                  to={item.path}
                  className={styles.link}
                  activeClassName={styles.linkActive}
                  isActive={(m, l) => m?.url === l.pathname}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button className={styles.loguot} onClick={onLoguot} variant='text'>
          loguot
        </Button>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

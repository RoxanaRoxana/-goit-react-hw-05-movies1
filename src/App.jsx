import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './App.module.css';


export default function App() {
  return (
    <div className={styles.App}>
      <div className={styles.NavBar}>
        <NavLink
          className={styles.NavLink}
          style={({ isActive }) => {
            return {
              display: 'block',
              margin: '1rem 0',
              color: isActive ? 'red' : '',
            };
          }}
          to={'/'}
        >
          Home
        </NavLink>
        <NavLink
          className={styles.NavLink}
          style={({ isActive }) => {
            return {
              display: 'block',
              margin: '1rem 0',
              color: isActive ? 'red' : '',
            };
          }}
          to={'/movies'}
        >
          Movies
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

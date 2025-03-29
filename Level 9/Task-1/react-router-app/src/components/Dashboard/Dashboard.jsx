import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <Link to="overview">Overview</Link>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

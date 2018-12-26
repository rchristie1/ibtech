import React from 'react';
import styles from './Jumbotron.scss';
import { Link } from 'react-router-dom';


const Jumbotron = () => {
    return (
        <div className={styles.Jumbotron}>
            <div className={styles.Links}>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
            </div>
            <div className={styles.EmployeeHeading}>Employee Portal</div>
        </div>
    );

}

export default Jumbotron;
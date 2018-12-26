import React from 'react';
import styles from './Filter.scss';

const Filter = ({updateResults, filterChanged}) => {
    return(
        <div>
            <input className={styles.InputBox} id="userInput" onKeyUp={updateResults}></input>
            <select className={styles.SelectList} onChange={filterChanged}>
                <option value='TIME_DATE_DAY_COMPONENT'>Date</option>
                <option value='STATE_PROV_NAME'>State</option>
            </select>
        </div>
    )
}

export default Filter;
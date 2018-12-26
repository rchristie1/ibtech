import React from 'react';
import styles from './WebSales.scss';
import Aux from '../../hoc/Aux/Aux';
import Loader from '../../components/UI/Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const WebSales = ({props, click, search}) => {    

    const itemValues = props.tempData.filter(search(props.userInput, props.searchCategory)).map((item, i) => {
        return (
            <div key={i+1} className={styles.ItemGroup}>
              <div>{item.BRAND}</div>
              <div>{item.BRANDTYPE}</div>
              <div>{item.MODEL}</div>
              <div>{item.QUANTITY_SOLD}</div>
              <div>${item.REVENUE_US}</div>
              <div>{item.STATE_PROV_NAME}</div>
              <div>{item.STORE_TYPE} </div>
              <div>{item.TIME_DATE_DAY_COMPONENT}</div>
            </div>
        )
    });

    const arr = [
        {
            id: 'BRAND',
            headerName: 'Brand',
        },
        {
            id: 'MODEL',
            headerName: 'Model',
        },
        {
            id: 'BRANDTYPE',
            headerName: 'Type',
        },
        {
            id: 'QUANTITY_SOLD',
            headerName: 'Quantity Sold',
        },
        {
            id: 'REVENUE_US',
            headerName: 'Revenue',
        },
        {
            id: 'STATE_PROV_NAME',
            headerName: 'State',
        },        
        {
            id: 'STORE_TYPE',
            headerName: 'Store Type',
        },
        {
            id: 'TIME_DATE_DAY_COMPONENT',
            headerName: 'Date',
        },
    ]

    
    return (
        <Aux>
            {props.loading ? <Loader /> : null}
            
            <div className={styles.HeaderSection}>
                {arr.map((d, i) => {
                  return (
                    <div key={d.id + i} className={styles.ColumnHeadings} id={d.id} onClick={click}>
                        {d.headerName}&nbsp; {d.showCaret ? <span><FontAwesomeIcon icon="caret-down" /><FontAwesomeIcon icon="caret-up" /></span>: null }
                    </div>);
                })}
            </div>
            <div className={styles.ItemsContainer}>
                {itemValues.length > 0 ? itemValues : (!props.loading ? <div className={styles.NoResults}>No Results...</div> : null)}
            </div>

        </Aux>
    );
}

export default WebSales;
import React, { Component } from 'react';
import axios from 'axios';
import WebSales from '../../components/WebSales/WebSales';
import Filter from '../../components/Filter/Filter';
import Aux from '../../hoc/Aux/Aux';
import styles from './EmployeeSection.scss';

const searchingFor = (userInput, searchCategory) => {
    return x => {
        // convert the array item and the returned result to lowercase to avoid false negatives
        return x[searchCategory].toLowerCase().includes(userInput.toLowerCase()) || !userInput
    }
}

class EmployeeSection extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            data: [],
            tempData: [],
            itemsDisplayed: 0,
            loading: true,
            sortList: false,
            searchCategory: 'TIME_DATE_DAY_COMPONENT',
            userInput: '',
        }
        this.apiUrl = 'https://ibtestdb.firebaseio.com/data.json';
    }
    
    getVisibleItemCount() {
        const arr = document.getElementsByClassName('WebSales__ItemGroup__23vWY');                    
        this.setState({itemsDisplayed: arr.length});
    }
    
    componentWillMount() {        
        this.loadMoreItems();
    }

    componentDidMount() {
        const salesContainer = document.getElementsByClassName('WebSales__ItemsContainer__1QJjU');


        this.getData();
        
        // Create a scroll listener for the item container for automatic updates
        salesContainer[0].addEventListener('scroll', () => {
            let scrollPosition = salesContainer[0].scrollTop; 
            let containerHeight = salesContainer[0].scrollHeight;
            
            if (containerHeight - scrollPosition < 2500) {
                if(this.state.itemsDisplayed < this.state.data.length){
                    this.loadMoreItems();
                    this.getVisibleItemCount();
                }
            }
        });
    }

    getData() {
        let tempArr = [];
        const currentCount = this.state.itemsDisplayed;

        axios.get(this.apiUrl)
        .then((res) => {
            this.setState({data: res.data});
            // Sort the data returned by date 
            this.state.data.sort((a, b) => {            
                return (
                    this.state.sortList !== true ? (a.TIME_DATE_DAY_COMPONENT > b.TIME_DATE_DAY_COMPONENT ? 1: -1) : (a.TIME_DATE_DAY_COMPONENT > b.TIME_DATE_DAY_COMPONENT ? -1: 1)
                );
            });
            
            // only add 100 items to the list to reduce load times
            this.state.data.map((d, i) => {
                for (let j = i; j < 100 + currentCount; j++) {
                    return (
                        tempArr.push(d)
                    );
                }
                return(tempArr);
            });
            
            this.setState({tempData: tempArr, loading: false});
          })
          .catch((err) => {
            console.log(err);
          });

          setTimeout(() => {
            this.getVisibleItemCount();
          }, 2000);     
    }

    loadMoreItems = () => { 
        //this.setState({loading: true}); this.getData(); 
        this.setState({loading: true});

        let tempArr = [];
        const currentCount = this.state.itemsDisplayed;

        this.state.data.map((d, i) => {
            for (let j = i; j < 100 + currentCount; j++) {
                return (
                    tempArr.push(d)
                );
            }
            return(tempArr);
        });

        setTimeout(() => {
            
            this.getVisibleItemCount();
        }, 500);

        return this.setState({tempData: tempArr, loading: false});
    }

    showAllItems = () => {
        this.setState({loading: true});

        setTimeout(() => {
            this.setState({tempData: [...this.state.data], itemsDisplayed: this.state.data.length, loading: false});
        }, 1000);
    }

    sortItems = (val) => {
        this.setState({loading: true});
        const itemSelected = val.target.id;
        let sortItemVal = this.state.sortList;

        setTimeout(() => {
            this.state.tempData.sort((a, b) => {
                return sortItemVal === false ? (a[itemSelected] > b[itemSelected] ? 1: -1) : (a[itemSelected] > b[itemSelected] ? -1: 1);
        });

        sortItemVal = !sortItemVal;
        document.getElementsByClassName('WebSales__ItemsContainer__1QJjU')[0].scroll(0, 0);;

        this.setState({sortList: sortItemVal, loading: false});
        }, 100);

        
    }

    filterSearchResults = (event) => { 
        this.setState({userInput: event.target.value, loading: true});
        setTimeout(() => {
            this.getVisibleItemCount()
            this.setState({loading: false});
        }, 100);
    }
    
    updateFilterCategory = (e) => { this.setState({searchCategory: e.target.value}); }

    render() {
        return (
            <Aux>
                <div className={styles.PageTitle}>Sales Information</div>

                <div className={styles.FilterSection}>
                    <Filter updateResults={this.filterSearchResults} filterChanged={this.updateFilterCategory.bind(this)}  />
                </div>
            
                <div className={styles.TableContainer}>
                    <WebSales props={this.state} search={searchingFor} click={this.sortItems.bind(this)} />
                    <div className={styles.ItemCount}>Showing: {this.state.itemsDisplayed}/{this.state.data.length} Results</div>
                </div>

                <div className={styles.ButtonGroup}>
                    <button onClick={this.loadMoreItems}>Load More Items</button>
                    <button onClick={this.showAllItems}>Show All</button>
                </div>
            </Aux>
        );
    }
}

export default EmployeeSection;
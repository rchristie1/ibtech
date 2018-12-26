import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import EmployeeSection from '../../containers/EmployeeSection/EmployeeSection';
import Jumbotron from '../../components/UI/Jumbotron/Jumbotron';
import Footer from '../../components/Footer/Footer';
import Aux from '../Aux/Aux';
import LoginRegister from '../../containers/LoginRegister/LoginRegister';

class Layout extends Component {

    render(){
        return (
            <Aux>
                <Jumbotron />
                <Route path="/EmployeeSection" exact component={EmployeeSection} />
                <Route path="/Login" exact component={LoginRegister} />
                <Route path="/Register" exact component={LoginRegister} />
                <Route path="/" exact component={LoginRegister} /> 
                <Footer />
            </Aux>
        );
    }
}

export default Layout
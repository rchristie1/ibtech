import React, { Component } from 'react';
import styles from './LoginRegister.scss';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

const InputForm = ({props, click, inputUN, inputPW}) => {
    return(
        <div className={styles.FormContainer}>
            <h1 className={styles.FormTitile}>{props.currentUrl === '/Login' ? 'Login' : 'Register'}</h1>

            <input class={styles.AuthInput} onKeyUp={inputUN} placeholder="Username" id="nameInput"></input>
            <input class={styles.AuthInput} type="password" onKeyUp={inputPW} placeholder="Password" id="pwInput"></input>
            {props.isLoading ? <div className={styles.LoadingIcon}><Loader /></div> : null}
            <button onClick={click} className={styles.BtnRegister}>
                {props.currentUrl === '/Login' ? 'Login' : 'Register'}
            </button>
        </div>
    )
}

class LoginRegister extends Component {

    constructor(props) {
        super (props)

        this.state = {
            isAuthenticated: false,
            currentUrl: '',
            passwordInput: '',
            usernameInput: '',
            isLoading: false
        }
        this.signInURL = ***
        this.signUpURL = ***
    }

    componentWillMount(){
        this.setState({currentUrl: this.props.location.pathname})
    }

    LoginRegisterHandler = () => {
        this.setState({isLoading: true});
        var authData = {
            email: this.state.usernameInput,
            password: this.state.passwordInput,
            returnSecureToken: true
        }
        switch (this.state.currentUrl) {
            case '/Login':
                axios.post(this.signInURL, authData)
                .then(() => {
                    this.setState({isAuthenticated: true});
                    this.props.history.push('/EmployeeSection');
                })
                .catch(err => {
                    console.log(err);
                });
                this.setState({isLoading: false});
                break;
            case '/Register':
                axios.post(this.signUpURL, authData)
                    .then(res => {
                        this.props.history.push('/Login');
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    this.setState({isLoading: false});
                break; 
            default:
                break;
                
        }
    }

    updateUserNameHandler = (e) => { this.setState({usernameInput:  e.target.value})}

    updatePasswordHandler = (e) => { this.setState({passwordInput:  e.target.value})}

    render() {
        
        return(
            <div className={styles.LoginRegister}>
                <InputForm 
                    props={this.state} 
                    click={this.LoginRegisterHandler}
                    inputUN = {this.updateUserNameHandler.bind(this)}
                    inputPW = {this.updatePasswordHandler.bind(this)}
                />
            </div>
            
        );
    }
}

export default LoginRegister;

import React, { Component } from 'react';
import './App.scss';
import Layout from './hoc/Layout/Layout';
import {BrowserRouter} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretDown, faCaretUp)


class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

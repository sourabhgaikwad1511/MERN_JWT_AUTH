import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from '../src/components/dashboard/Dashboard';
import { loadUser} from './actions/authAction';

class App extends Component{

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
      return (
        <Provider store={store}>
          <div className="App">
              <Dashboard />
          </div>
        </Provider>
      );
    }
  }

export default App;

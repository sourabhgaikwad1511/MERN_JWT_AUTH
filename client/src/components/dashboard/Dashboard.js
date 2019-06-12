import React, { Component } from 'react';
import UserList from './UserList';
import AppNavbar from '../layout/AppNavbar';

class Dashboard extends Component {
 
    render() {
        return (
            <div>
                <AppNavbar />
                <UserList />
            </div> 
        );
     }
}


export default Dashboard;

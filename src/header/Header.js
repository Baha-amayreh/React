import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    handleLogOut() {
        localStorage.removeItem('authenticatedAdmin');
        window.location.href = '/Login';
    }

    render() {
        return (
            <header>
                <nav>
                    <ul className="header">
                        <li><Link to="/ListOfStudents">Students</Link></li>
                        <li><Link to="/StudentForm">New Student</Link></li>
                        <li><Link onClick={this.handleLogOut}>Log Out</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;

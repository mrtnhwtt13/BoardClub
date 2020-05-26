import React, { Component } from 'react';
import { connect } from 'react-redux';
import AllUsers from './AllUsers.js';


class Admin extends Component {  
    /*  
    componentDidMount() {
        if (this.props.user.isAdmin === false) {
            this.props.history.push('/');
        }
    }
    */

    render () {
        return (
            <div>
                <AllUsers />
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.isAuthenticated,
    auth: state.auth,
    user: state.auth.user
})


export default connect(mapStateToProps)(Admin);
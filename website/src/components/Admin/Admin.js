import React, { Component } from 'react';
import { connect } from 'react-redux';


class Admin extends Component {
    render () {
        const { isAuthenticated } = this.props;
        return (
            <div>
                test
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.isAuthenticated
})


export default connect(mapStateToProps)(Admin);
import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditTopGames extends Component {
    render () {
        return (
            <div>
                Nothing here yet
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.isAuthenticated
})


export default connect(mapStateToProps)(EditTopGames);
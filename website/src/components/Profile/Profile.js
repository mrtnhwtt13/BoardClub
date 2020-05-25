import React, { Component } from 'react';
import { getUserById } from '../../actions/userActions'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'



class Profile extends Component {
    componentDidMount(){
        this.props.getUserById(this.props.match.params.userId)
        
    }
    render (){
        const {user, loadingUser } = this.props;
        let username = null;
        if (user && loadingUser === false){
            username = (
                <div>
                    {user.login}
                </div>
            )
        }
        return (
            <div>
                {username}
            </div>
        )
    }
}

const styles = {

}

const mapStateToProps = (state) => ({
    user: state.user.user,
    loadingUser: state.user.loading
})

export default connect(mapStateToProps, { getUserById })(withStyles(styles)(Profile))
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import Card from './Card'
import { getFollowingUsers } from '../../actions/userActions'
import Loading from '../Loading/Loading'


class Friends extends Component {

    componentDidMount() {
        if (!localStorage.getItem('jwtToken')) {
            this.props.history.push('/');
        }
        this.props.getFollowingUsers()
    }
    
    render() {
        const {list, loading, classes} = this.props
        const cards =  list && list.map(user => <Card key={user._id} user={user} /> )
        if (list && list.length !=0 ){
            return(
                <div className={classes.root}>
                    <h1 className={classes.title}>FRIENDS LIST</h1>
                    {cards}
                </div>
            )
        } else if(loading){
            return (
                <Loading />
            )
        } else {
            return(
                <p className={classes.nofren}>Error 404 Friends not found. You don't have friends :(</p>
            )
        }
    }
}

const styles = {
    nofren: {
        fontSize: 20,
        color: '#595959',
        textAlign: 'center',
    },
    root: {
        width: '100%',
    }, 
    title: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'center'
    }
}


const mapStateToProps = (state) => ({
    list: state.user.list,
    loading: state.user.loading,
    authUser: state.auth.user
})

export default connect(mapStateToProps, { getFollowingUsers })(withStyles(styles)(Friends))
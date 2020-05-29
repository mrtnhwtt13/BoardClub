import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Paper } from '@material-ui/core'
import Card from './Card'
import { getFollowingUsers } from '../../actions/userActions'
import Loading from './Loading'


class Friends extends Component {

    componentDidMount() {
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
                <Loading />
        } else {
            return(
                <p className={classes.nofren}>Friends 404 You don't have friends :(</p>
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
    loading: state.user.loading
})

export default connect(mapStateToProps, { getFollowingUsers })(withStyles(styles)(Friends))
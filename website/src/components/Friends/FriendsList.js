import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Paper } from '@material-ui/core'
import Card from './Card'
import { getFollowingUsers } from '../../actions/userActions'
import LoadingGames from '../Games/LoadingGames'




class Friends extends Component {

    componentDidMount() {
        this.props.getFollowingUsers()
    }
    
    render() {
        const {list, loading} = this.props
        const cards =  list && list.map(user => <Card key={user._id} user={user} /> )
        if (list && list.length !=0 ){
            return(
                <div>
                    {cards}
                </div>
            )
        } else if(loading){
                <LoadingGames />
        } else {
            return(
                <p>You don't have friends !!</p>
            )
        }
    }
}

const styles = {
  
}


const mapStateToProps = (state) => ({
    list: state.user.list,
    loading: state.user.loading
})

export default connect(mapStateToProps, { getFollowingUsers })(withStyles(styles)(Friends))
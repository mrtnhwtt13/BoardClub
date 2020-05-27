import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Paper } from '@material-ui/core'
import Card from './Card'
import { getFollowingUsers } from '../../actions/userActions'




class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }   
    }

    componentDidMount() {
        this.props.getFollowingUsers()
    }
    
    render() {
        const {list} = this.props
        const cards =  list && list.map(user => <Card key={user._id} user={user} /> )
        if (list){
            return(
                <div className="card">
                    {cards}
                </div>
            )
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
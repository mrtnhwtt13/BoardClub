import React, { Component }from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import Card from './Card'
import { withRouter } from 'react-router-dom'

class TopGames extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {}
        }
    }

    render(){
        const {user} = this.props
        if (user){
            const cards = Object.keys(user.topGames)
            .map(key=> <Card key={key} details={user.topGames[key]}></Card>)
            return(
                <div className="card">
                    {cards}
                </div>
            )
        } else {
            return(
                <p>pas glop !</p>
            )
        }
    }
}

const styles = {
 
    card: {
        
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
   })

export default connect(mapStateToProps)(withRouter(withStyles(styles)(TopGames)))
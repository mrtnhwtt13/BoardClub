import React, { Component }from 'react'
import { Text, Card, withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
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
                <div className="cards">
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
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
   })

export default connect(mapStateToProps)(withRouter(withStyles(styles)(TopGames)))
import React from'react'
import { Paper, TextField, withStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TopGames from './TopGames'


class CreateGame extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            login: '',
            newGame: '',
            topGames: [],
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    

    render(){
        const { classes, user } = this.props
        const { errors } = this.state
        return(
            <Paper  style={{ padding: 15 }}>
                <div>
                     <TopGames></TopGames>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        type="string"
                        label="Search Game"
                        name="newGame"           
                        value={this.state.newGame}
                        onChange={this.handleChange}         
                        className={classes.textField}
                        helperText={errors.newGame ? errors.newGame: ''}
                        error={errors.newGame ? true : false}
                    />
                    <div className={classes.btnBlock}>
                        <Button variant="outlined" type="submit">
                            Submit
                        </Button> 
                    </div>
                </form>
            </Paper>
        )
    }
}

const styles = {
    textField: {
        width: '100%',
        marginBottom: 5
    },
    btnBlock: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
   })

export default connect(mapStateToProps)(withRouter(withStyles(styles)(CreateGame)))
import React, { Component }from 'react'
import { TextField, withStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import Card from './Card'
import { withRouter } from 'react-router-dom'

class Games extends Component {
    constructor(props){
        super(props)
        this.state = {
            errors: {}
        }
    }
    handleChange

    render(){
        const { errors } = this.state
        const { classes } = this.props
        return(
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
                <div>

                </div>
            </form>
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
    auth: state.auth
   })

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Games)))
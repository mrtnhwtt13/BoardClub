import React, { Component }from 'react'
import { TextField, withStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Games extends Component {
    constructor(props){
        super(props)
        this.state = {
            newGame:'',
            boardGameDetails: {},
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit (e) {
        e.preventDefault()
        axios
        .get(
            'https://bgg-json.azurewebsites.net/collection/' +
            this.state.newGame
        )
        .then((response) =>
            this.setState({
            boardGameDetails: response,
            loading: false,
            }),
        )
        .catch((err) => console.log(err))
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    } 

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
                    <Button variant="outlined" type="submit" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} >
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
    },
    btnStyle: {
        backgroundColor: "#65A2FE",
        color: "white",
        border: "white",
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
   })

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Games)))
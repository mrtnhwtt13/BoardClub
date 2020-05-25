import React, { Component }from 'react'
import { TextField, withStyles, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Games extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchGame: '',
            boardGameDetails: {},
            loading: true,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit (e) {
        e.preventDefault()
        axios
        .get(
            'http://localhost:8080/https://boardgamegeek.com/xmlapi2/search?query=' +
            this.state.searchGame
        )
        .then((response) =>
            this.setState({
            boardGameDetails: response.data,
            loading: false
            }),
            this.xmlSearch
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
                    name="searchGame"           
                    value={this.state.searchGame}
                    onChange={this.handleChange}         
                    className={classes.textField}
                    helperText={errors.newGame ? errors.searchGame: ''}
                    error={errors.searchGame ? true : false}
                />
                <div className={classes.btnBlock}>
                    <Button variant="outlined" type="submit" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} >
                        Submit
                    </Button> 
                </div>
                <div>
                    {this.state.loading ? <div>no game</div> : console.log(this.state.boardGameDetails) }
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
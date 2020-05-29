import React, { Component }from 'react'
import { TextField, withStyles, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import SearchCard from './SearchCard'


class SearchGames extends Component {
    constructor(props){
        super(props)

        this.state = {
            searchText: '',
            boardGameDetails: {},
            boardGameIds: [],
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.parseResponse = this.parseResponse.bind(this)
    }

    handleSubmit (e) {
        e.preventDefault()
        axios.get('http://localhost:8080/https://boardgamegeek.com/xmlapi2/search?query=' + this.state.searchText + "&type=boardgame")
            .then(response => {
                this.setState({
                    boardGameDetails: response
                });
                this.parseResponse();
            })
            .catch((err) => console.log(err))
    }

    parseResponse () {
        var parser, xmlDoc;
            
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(this.state.boardGameDetails.data, "text/xml");
            
        //Get the number of items
        var numberOfNames = xmlDoc.getElementsByTagName("item").length;
            
        //Create an array of the items
        var items = xmlDoc.getElementsByTagName("item");
        
        for (let i=0; i < numberOfNames; i++) {                
            //create an array of all game's id
            this.state.boardGameIds.push(items[i].getAttribute('id'));
        }
        this.forceUpdate()
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render () {
        const { errors, boardGameIds } = this.state
        const { classes } = this.props
        const items = boardGameIds.map(element=> <SearchCard key={element} boardGameId={element} />)

        return (
            <form onSubmit={this.handleSubmit}>
                <TextField 
                    type="text"
                    label="Search a board game here"
                    name="searchText"           
                    value={this.state.searchText}
                    variant="outlined"
                    onChange={this.handleChange}         
                    className={classes.textField}
                    helperText={errors.newGame ? errors.searchText: ''}
                    error={errors.searchText ? true : false}
                />
                <div className={classes.btnBlock}>
                    <Button variant="outlined" type="submit" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} >
                        Search
                    </Button> 
                </div>
                <div>
                    {items}
                </div>
            </form>
        )
    }
}

const styles = {
    textField: {
        width: '100%',
        marginTop: 20,
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


export default (withRouter(withStyles(styles)(SearchGames)))
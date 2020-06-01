import React, { Component } from "react"
import { TextField, withStyles, FormControl, InputLabel, MenuItem, Select, Grid, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { editGame } from '../../../actions/gameActions'
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import City from './City.js'


class EditGame extends Component {
    constructor (props) {
        super(props)
        if (this.props.location.state) {
            this.state = {
                userId: this.props.location.state.game.userId,
                gameId: this.props.location.state.game._id,
                title: this.props.location.state.game.title,
                playersLevel: this.props.location.state.game.playersLevel,
                playersNumber: this.props.location.state.game.playersNumber.toString(),
                playersMax: this.props.location.state.game.playersMax,
                gameDate: this.props.location.state.game.gameDate.substring(0, 10),
                time: this.props.location.state.game.gameDate.substring(11, 19),
                city: this.props.location.state.game.city,
                description: this.props.location.state.game.description,
                errors: {},
                cities: null,
                cityChosen : '',
                zipcodeChosen : '',
                cities: null,
                cityChosen : this.props.location.state.game.city,
                zipcodeChosen : this.props.location.state.game.zipcode
            }
        }
        else {
            this.state = {
                userId: '',
                gameId: "",
                title: '',
                playersLevel: '',
                playersNumber: "",
                playersMax: '',
                gameDate: '',
                time: '',
                city: '',
                description: '',
                errors: {}
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this)
        this.selectCity = this.selectCity.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        if (!this.props.authUser || this.props.authUser.isAdmin === false) {
            this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChangeCity = (e) => {
        this.setState({ [e.target.name]: e.target.value })

        axios.get('http://localhost:8080/https://vicopo.selfbuild.fr/cherche/' + this.state.city)
            .then(response => {
                this.setState({ cities: response.data.cities})
            })
            .catch((err) => console.log(err))
    }

    selectCity (city, zipcode) {
        this.setState({
            city: city,
            cities: null,
            cityChosen: city,
            zipcodeChosen: zipcode
        })
    }

    handleSubmit (e) {
        e.preventDefault()
        const gameData = {
            gameId: this.state.gameId,
            title: this.state.title,
            playersLevel: this.state.playersLevel,
            playersMax: this.state.playersMax.toString(),
            playersNumber: this.state.playersNumber,
            gameDate: new Date(this.state.gameDate+"T"+this.state.time+"Z"),
            city: this.state.cityChosen,
            zipcode: this.state.zipcodeChosen.toString(),
            description: this.state.description

        }
        this.props.editGame(gameData, this.props.history)
    }    

    render(){
        
        const participant = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","42"]
        const ITEM_HEIGHT = 42;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                // width: 250
                }
            }
        };
        const { classes } = this.props
        const { errors, cities, cityChosen, zipcodeChosen } = this.state

        var selectedCity= null;
        if (cityChosen !== '') {
            selectedCity = (            
                <div className={classes.root}>
                    <p className={classes.city}><strong>CITY : {cityChosen} ({zipcodeChosen})</strong></p>
                </div>       
            )
        }
        var citiesList = cities && cities.map(el => < City key={el.id} city={el} selectCity={this.selectCity}/>)

        return(
            <Paper style={{ padding: 15 }}>
                <h4>
                    <b>Modify</b> below
                </h4> 
                <form onSubmit={this.handleSubmit}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                    <TextField 
                        type="string"
                        label="Title"
                        name="title"           
                        value={this.state.title}
                        onChange={this.handleChange}         
                        className={classes.textField}
                        helperText={errors.title ? errors.title : ''}
                        error={errors.title ? true : false}
                        variant="outlined"
                    />
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Player level</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="playersLevel"
                        value={this.state.playersLevel}
                        onChange={this.handleChange}
                        label="level"
                        helperText={errors.playersLevel ? errors.playersLevel : ''}
                        error={errors.playersLevel ? true : false}
                        MenuProps={MenuProps}
                        >
                            <MenuItem value="All">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="Beginner">Beginner</MenuItem>
                            <MenuItem value="Intermediate">Intermediate</MenuItem>
                            <MenuItem value="Expert">Expert</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Number of players</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="playersMax"
                        value={this.state.playersMax}
                        onChange={this.handleChange}
                        label="participant"
                        helperText={errors.playersMax ? errors.playersMax : ''}
                        error={errors.playersMax ? true : false}
                        MenuProps={MenuProps}

                        >
                        {participant.map(number => (
                            <MenuItem key={number} value={number}>{number}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="date"
                        label="Date"
                        type="date"
                        name="gameDate"
                        value={this.state.gameDate}
                        onChange={this.handleChange}    
                        className={classes.textField}
                        variant="outlined"
                        data-parse="date"
                        helperText={errors.gameDate ? errors.gameDate : ''}
                        error={errors.gameDate ? true : false}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="time"
                        label="Time"
                        type="time"
                        name="time"
                        value={this.state.time}
                        onChange={this.handleChange}    
                        className={classes.textField}
                        variant="outlined"
                        helperText={errors.gameHour ? errors.gameHour : ''}
                        error={errors.gameHour ? true : false}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                    <TextField 
                        type="string"
                        label="City"
                        name="city"           
                        value={this.state.city}
                        onChange={this.handleChangeCity}      
                        className={classes.textField}
                        helperText={errors.city ? errors.city: ''}
                        error={errors.city ? true : false}
                        variant="outlined"
                    />
                    {selectedCity}
                    {citiesList}
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        className={classes.textField}
                        value={this.state.description}
                        onChange={this.handleChange}    
                        variant="outlined"
                        helperText={errors.description ? errors.description : ''}
                        error={errors.description ? true : false}
                    />
                    <div className={classes.btnBlock}>
                        <Button variant="outlined" type="submit" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} >
                            Submit
                        </Button> 
                    </div>
                </Grid>
                </form>
            </Paper>
        )
    }
}

const styles = {
    formControl: {
        margin: 10,
        // minWidth: 120,
        width: '90%',
        
    },
    selectEmpty: {
        marginTop: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10,
        // minWidth: 200,
        width: '90%'
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
    }, 
    city: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'left',
        textAlign: 'left',
        paddingLeft: 50
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    authUser: state.auth.user
   })

export default connect(mapStateToProps, { editGame })(withRouter(withStyles(styles)(EditGame)))


import React, { Component } from "react"
import { TextField, withStyles, FormControl, InputLabel, MenuItem, Select, Grid, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'



class InfoGame extends Component {
    constructor (props) {
        super(props)
        this.state = {
            info: {
                title: '',
                level: '',
                participant: '',
                date: '',
                time: '',
                city: '',
                description: ''
            },
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit (e) {
        e.preventDefault();
        const info = this.state.info
        const createGameData = {
            title: info.title,
            level: info.level,
            participant: info.participant,
            date: info.date,
            time: info.time,
            city: info.city,
            description: info.description

        }
        this.props.createGame(createGameData, this.props.history);
    }    

    render(){
        
        const participant = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,42]
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
                }
            }
        };
        const { classes } = this.props
        const { errors } = this.state
        return(
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
                    helperText={errors.title ? errors.title: ''}
                    error={errors.title ? true : false}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Level</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.level}
                    onChange={this.handleChange}
                    label="level"
                    MenuProps={MenuProps}
                    >
                        <MenuItem value={0}>
                            <em>Piece of Cake</em>
                        </MenuItem>
                        <MenuItem value={1}>Let's Rock</MenuItem>
                        <MenuItem value={2}>Come Get Some</MenuItem>
                        <MenuItem value={3}>Damn I'm Good</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Participant</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.participant}
                    onChange={this.handleChange}
                    label="participant"
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
                    defaultValue=""
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="time"
                    label="Time"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
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
                    onChange={this.handleChange}         
                    className={classes.textField}
                    helperText={errors.city ? errors.city: ''}
                    error={errors.city ? true : false}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="outlined"
                />
                <div className={classes.btnBlock}>
                    <Button variant="outlined" type="submit" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} >
                        Submit
                    </Button> 
                </div>
            </Grid>
            </form>
        )
    }
}

const styles = {
    formControl: {
        margin: 10,
        minWidth: 120,
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
        marginBottom: 20,
        minWidth: 200,
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
    auth: state.auth,
    user: state.auth.user
   })

export default connect(mapStateToProps)(withRouter(withStyles(styles)(InfoGame)))


import React, { Component } from "react"
import { TextField, withStyles, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'

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

    selectedDate = () => React.useState(new Date('2014-08-18T21:11:54'));
    setSelectedDate = () => React.useState(new Date('2014-08-18T21:11:54'));


    handleDateChange = (date) => {
        setSelectedDate(date);
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                </Grid>
                </MuiPickersUtilsProvider>
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
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.auth.user
   })

export default connect(mapStateToProps)(withRouter(withStyles(styles)(InfoGame)))


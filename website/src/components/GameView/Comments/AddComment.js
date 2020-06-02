import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/commentActions';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';



class AddComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ text: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()

        const commentData = {
            text: this.state.text,
            gameId: this.props.gameId
        }

        this.props.addComment(commentData);
        this.setState({ text: '' })
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper elevation={2} className={classes.paper}>
                <Grid container spacing={0} >
                    <Grid container justify="center" item xs={10} >
                        <TextField
                            multiline
                            rowsMax="4"
                            inputProps={{
                                maxLength: 140,
                            }}
                            label="Add a comment"
                            className={classes.textField}
                            onChange={this.handleChange}
                            value={this.state.text}
                        />
                    </Grid>
                    <Grid container justify="center" item xs={2} >
                            <Button
                                variant="outlined"
                                className={classes.button}
                                onClick={this.handleSubmit}
                            >
                                Send
                            </Button>
                        
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}


const styles = {
    paper: {
        padding: 8,
        marginTop: 20
    },
    textField: {
    width: "95%"
    },
    button: {
        borderColor: 'white',
        width: '25',
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#65A2FE',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#65A2FE',
            color: '#fff',
        }
    }
}


export default connect(null, { addComment })(withRouter(withStyles(styles)(AddComment)));
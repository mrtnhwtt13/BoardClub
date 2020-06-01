import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editUser } from '../../../actions/userActions';


class EditUser extends Component {
    constructor (props) {
        super(props);
        if (this.props.location.state) {
            this.state = {
                email: this.props.location.state.user.email,
                login: this.props.location.state.user.login,
                password: '',
                password2: '',
                errors: {}
            };
        }
        else {
            this.state = {
                email: '',
                login: '',
                password: '',
                password2: '',
                errors: {}
            };
        }
        
        this.handleChange = this.handleChange.bind(this);
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

    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit (e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            login: this.state.login,
            password: this.state.password,
            password2: this.state.password2,
            oldLogin: this.props.location.state.user.login,
            oldEmail: this.props.location.state.user.email,
            _id: this.props.location.state.user._id
        }
        this.props.editUser(this.props.authUser._id, userData, this.props.history);
    }    

    render () {
        const { classes } = this.props;
        const { errors } = this.state
        return (
            <Paper style={{ padding: 15 }}>
                <h4>
                    <b>Modify</b> below
                </h4>                
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        label="Login"
                        type="text"
                        name="login"                                   
                        value={this.state.login}  
                        onChange={this.handleChange}    
                        className={classes.textField}
                        helperText={errors.login ? errors.login : ''}
                        error={errors.login ? true : false}
                    />
                    <TextField 
                        type="email"
                        label="Email"
                        name="email"           
                        value={this.state.email}
                        onChange={this.handleChange}         
                        className={classes.textField}
                        helperText={errors.email ? errors.email : ''}
                        error={errors.email ? true : false}
                    />                                        
                    <TextField
                        label="Password"
                        type="password"
                        name="password"                                   
                        value={this.state.password}   
                        onChange={this.handleChange}   
                        className={classes.textField}
                        helperText={errors.password ? errors.password : ''}
                        error={errors.password ? true : false}
                    />
                    <TextField
                        label="Repeat password"
                        type="password"
                        name="password2"           
                        value={this.state.password2} 
                        onChange={this.handleChange}     
                        className={classes.textField}
                        helperText={errors.password2 ? errors.password2 : ''}
                        error={errors.password2 ? true : false}
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
    errors: state.errors,
    authUser: state.auth.user
})


export default connect(mapStateToProps, { editUser })(withRouter(withStyles(styles)(EditUser)));
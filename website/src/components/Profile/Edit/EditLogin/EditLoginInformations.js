import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { editProfile } from '../../../../actions/authActions';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'
import City from './City.js'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class EditLoginInformations extends Component {

    constructor (props) {
        super(props);

        if (this.props.user) {
            this.state = {
                email: this.props.user.email,
                login: this.props.user.login,
                oldPassword: '',
                password: '',
                password2: '',
                errors: {},
                city: this.props.user.city,
                cities: null,
                cityChosen : this.props.user.city,
                zipcodeChosen : this.props.user.zipcode,
                avatar: this.props.user.avatar
            };
        }
        else {
            this.state = {
                email: '',
                login: '',
                oldPassword: '',
                password: '',
                password2: '',
                errors: {},
                city: '',
                cities: null,
                cityChosen : '',
                zipcodeChosen : '',
                avatar: ''
            };
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this)
        this.selectCity = this.selectCity.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        if (!localStorage.getItem('jwtToken')) {
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
        e.preventDefault();
        const userData = {
            email: this.state.email,
            login: this.state.login,
            oldPassword: this.state.oldPassword,
            password: this.state.password,
            password2: this.state.password2,
            oldLogin: this.props.user.login,
            oldEmail: this.props.user.email,
            _id: this.props.user._id,
            city: this.state.cityChosen,
            zipcode: this.state.zipcodeChosen.toString(),
            avatar: this.state.avatar
        }
        this.props.editProfile(userData);
    }    

    render () {
        const { classes } = this.props;
        const { errors, cities, cityChosen, zipcodeChosen } = this.state
        var deleteButton = null;

        var selectedCity= null;
        if (cityChosen !== '') {
            selectedCity = (            
                <div className={classes.root}>
                    <p className={classes.city}><strong>CITY : {cityChosen} ({zipcodeChosen})</strong></p>
                </div>       
            )
        }
        var citiesList = cities && cities.map(el => < City key={el.id} city={el} selectCity={this.selectCity}/>)

        if (this.props.user) {
            deleteButton = (
                <Button className={classes.deleteButton} variant="outlined" type="submit" component={Link} to={`/profile/delete`}>
                    Delete my account
                </Button>
            )
        }

        return (
            <div style={{ padding: 15 }}>                
                {errors.update ?
                    <Alert elevation={0} severity="success">
                        {errors.update}
                    </Alert> :
                    ''
                }               
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
                        variant="outlined"
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
                        variant="outlined"
                        helperText={errors.email ? errors.email : ''}
                        error={errors.email ? true : false}
                    />
                    <TextField
                        label="City"
                        type="text"
                        name="city"                                   
                        value={this.state.city}  
                        onChange={this.handleChangeCity}    
                        className={classes.textField}
                        variant="outlined"
                    />
                    {selectedCity}
                    {citiesList}
                    <TextField
                        label="Avatar"
                        type="text"
                        name="avatar"                                   
                        value={this.state.avatar}  
                        onChange={this.handleChange}    
                        className={classes.textField}
                        variant="outlined"
                    />
                    <TextField
                        label="Old password"
                        type="password"
                        name="oldPassword"                                   
                        value={this.state.oldPassword}   
                        onChange={this.handleChange}   
                        className={classes.textField}
                        variant="outlined"
                        helperText={errors.oldPassword ? errors.oldPassword : ''}
                        error={errors.oldPassword ? true : false}
                    />                                     
                    <TextField
                        label="New password"
                        type="password"
                        name="password"                                   
                        value={this.state.password}   
                        onChange={this.handleChange}   
                        className={classes.textField}
                        variant="outlined"
                        helperText={errors.password ? errors.password : ''}
                        error={errors.password ? true : false}
                    />
                    <TextField
                        label="Repeat new password"
                        type="password"
                        name="password2"           
                        value={this.state.password2} 
                        onChange={this.handleChange}     
                        className={classes.textField}
                        variant="outlined"
                        helperText={errors.password2 ? errors.password2 : ''}
                        error={errors.password2 ? true : false}
                    />
                    <div className={classes.btnBlock}>
                        <Button className={classes.submitButton} variant="outlined" type="submit">
                            Submit
                        </Button> 
                    </div>
                </form>
                <div className={classes.btnBlock2}>
                    {deleteButton} 
                </div>
            </div>                
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
    btnBlock2: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 50
    }, 
    city: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'left',
        textAlign: 'left',
        paddingLeft: 10
    },
    deleteButton: {
        borderColor: 'white',
        width: '25',
        
        backgroundColor: '#ff4d4d',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#ff4d4d',
            color: '#fff',
        }
    },
    submitButton: {
        borderColor: 'white',
        width: '25',
        
        backgroundColor: '#65A2FE',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#65A2FE',
            color: '#fff',
        }
    }
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    errors: state.errors
})


export default connect(mapStateToProps, { editProfile })(withRouter(withStyles(styles)(EditLoginInformations)));
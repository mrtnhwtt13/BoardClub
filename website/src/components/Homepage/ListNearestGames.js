import React, { Component } from 'react';
import Game from '../Games/Game';
import { connect } from 'react-redux';
import { getUpcomingGamesFunction } from '../../actions/gameActions';
import Loading from '../Loading/Loading';
import { Button } from '@material-ui/core'
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';


class ListNearestGames extends Component {
    constructor(props) {
        super(props)

        this.state = {
            games: null,
            loading: true
        }
        
        this.compareValues = this.compareValues.bind(this)
        this.goToEditProfile = this.goToEditProfile.bind(this)
    }

    compareValues(key, order = 'asc') {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }
      
            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];
      
            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            }
            else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    componentDidMount() {
        if (this.props.authUser.city !== "") {
            getUpcomingGamesFunction().then(
                (response) => {
                    var games = response
                    let count = 0;
        
                    for (let i = 0; i < games.length; i++) {
                        axios.get('http://localhost:8080/https://fr.distance24.org/route.json?stops=' + this.props.authUser.city + '|'  + games[i].city)
                            .then(response => {
                                games[i].distance = response.data.distance;
                                count = count + 1;
                                if (count === games.length) {                                    
                                    games.sort(this.compareValues('distance'));

                                    this.setState({
                                        games: games,
                                        loading: false
                                    })
                                }
                            })
                            .catch((err) => console.log(err))
                    }                                    
                },
                (error) => {
                    console.log('error: ', error)
                }
            )
        }
    }  

    goToEditProfile () {
        this.props.history.push(`/profile/edit/`);
    }

    render () {
        const { games, loading } = this.state;
        const { classes, authUser } = this.props;

        var items = null;

        if (authUser.city === "") {
            return (
                <div className={classes.root}>
                    <h1 className={classes.title}>CHOOSE YOUR CITY IN YOUR PROFILE FIRST</h1>
                    <div className={classes.btnBlock}>
                        <Button variant="outlined" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} onClick={() => { this.goToEditProfile(); }} >
                            EDIT PROFILE
                        </Button>
                    </div>
                </div>
            )
        }
        else {
            if (loading === false) {
                if (games.length === 0) {
                    items = (<h3 className={classes.title}>NO UPCOMING GAMES YET...</h3>)
                }
                else {
                    items = games && games.map(el => <Game key={el._id} game={el} distance="yes" />)
                }            
            }        

            return (
                <div>                   
                    { loading ? < Loading /> : items }
                </div>
            )
        }
    }
}


const styles = {
    root: {
        width: '100%',
    },
    title: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'center'
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
    authUser: state.auth.user
})


export default connect(mapStateToProps, { getUpcomingGamesFunction })(withRouter(withStyles(styles)(ListNearestGames)));
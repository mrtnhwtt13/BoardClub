import React, { Component } from 'react';
import Game from '../Games/Game';
import { connect } from 'react-redux';
import { getUpcomingGamesFunction } from '../../actions/gameActions';
import Loading from '../Loading/Loading';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';


class ListNearestGames extends Component {
    constructor(props) {
        super(props)

        this.state = {
            games: null,
            loading: true
        }
        
    }

    componentDidMount() {
        getUpcomingGamesFunction().then(
            (response) => {
                this.setState({ games: response })
                
                axios.get('http://localhost:8080/https://vicopo.selfbuild.fr/cherche/' + this.state.city)
                    .then(response => {
                        this.setState({ loading: false })
                    })
                    .catch((err) => console.log(err))                    
            },
            (error) => {
                console.log('error: ', error)
            }
        )
    }  

    render () {
        const { games, loading } = this.state;
        const { classes } = this.props;

        var items = null;

        if (loading === false) {
            if (games.length === 0) {
                items = (<h3 className={classes.title}>NO UPCOMING GAMES YET...</h3>)
            }
            else {
                items = games && games.map(el => <Game key={el._id} game={el} />)
            }            
        }        

        return (
            <div>                   
                { loading ? < Loading /> : items }
            </div>
        )
    }
}


const styles = {
    title: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'center'
    }
}


export default connect(null, { getUpcomingGamesFunction })(withStyles(styles)(ListNearestGames));
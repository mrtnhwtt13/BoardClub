import React, { Component } from 'react';
import Details from './Details';
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { getGameById } from '../../actions/gameActions';
import Loading from '../Loading/Loading';
import ListComments from './Comments/ListComments';


class GameDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: null,
            loading: true,
            notFound: false
        }
        
    }

    componentDidMount() {
        if (!localStorage.getItem('jwtToken')) {
            this.props.history.push('/');
        }
        getGameById(this.props.match.params.gameId).then(
            (response) => {
                if (response.message === "Game not found") {
                    this.setState({ notFound: true, loading: false })
                }
                else {
                    this.setState({ game: response, loading: false })
                }
            },
            (error) => {
                console.log('error: ', error)
            }
        )
    }


    render() {
        const { game, loading, notFound } = this.state
        const { classes } = this.props
        var display = (< Loading />)

        if (loading === false) {
            if (notFound === true) {
                display = (
                    <div>
                        <h1 className={classes.title}>OOPS, THIS GAME DOESN'T EXIST</h1>
                        <div className={classes.btnBlock}>
                            <Button variant="outlined" className={classes.btnStyle} style={{ backgroundColor: "#65A2FE" }} component={Link} to="/" >
                                HOME
                            </Button> 
                        </div>
                    </div>
                )
            }
            else {
                display = (
                    <div>
                        <div>
                            <Details game={game} />
                        </div>
                        <div>
                            <ListComments gameId={game._id} />
                        </div>
                    </div>
                )
            }
        }
        
        return (
            <div className={classes.root}>
                { display }
            </div>
        )
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


export default connect(mapStateToProps)(withRouter(withStyles(styles)(GameDisplay)));
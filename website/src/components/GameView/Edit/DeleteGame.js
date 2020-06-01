import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Paper, Button } from '@material-ui/core'
import { deleteGame } from '../../../actions/gameActions'
import { Link, withRouter } from 'react-router-dom';


class DeleteGame extends Component {
    constructor(props) {
        super(props)

        this.deleteMyGame = this.deleteMyGame.bind(this)
        this.returnToGame = this.returnToGame.bind(this)
    }

    componentDidMount() {
        if (!localStorage.getItem('jwtToken')) {
            this.props.history.push('/');
        }
    }

    deleteMyGame () {
        const gameData = {
            gameId: this.props.match.params.gameId
        }

        this.props.deleteGame(gameData)
    }

    returnToGame () {
        this.props.history.push(`/game/${this.props.match.params.gameId}`);
    }

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <h1 className={classes.title}>ARE YOU SURE YOU WANT TO DELETE YOUR GAME ?</h1>
                <h4 className={classes.title}>This will permanently erase your game</h4>
                <div className={classes.btnBlock}>
                    <Button variant="outlined" className={classes.btnStyle} style={{ backgroundColor: "#ff0000" }} component={Link} to="/" onClick={this.deleteMyGame} >
                        YES
                    </Button> 
                </div>
                <div className={classes.btnBlock}>
                    <Button variant="outlined" className={classes.btnStyle} style={{ backgroundColor: "#49ff00" }} onClick={() => { this.returnToGame(); }} >
                        NO
                    </Button> 
                </div>
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


export default connect(null, { deleteGame })(withRouter(withStyles(styles)(DeleteGame)));
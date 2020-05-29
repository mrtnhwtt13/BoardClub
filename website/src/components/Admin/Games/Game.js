import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getUserByIdFunction } from '../../../actions/userActions';
import { deleteGame } from '../../../actions/gameActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
    body: {
        color: '#595959',
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


class Game extends Component {
    constructor (props) {
        super(props);

        this.state = {
            user: null,
            loading: true 
        }

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount () {
        getUserByIdFunction(this.props.game.userId).then(
            (response) => {
                this.setState({ user: response, loading: false })
            },
            (error) => {
                console.log('error: ', error)
            }
        )
    }

    handleDelete () {
        const gameData = {
            gameId: this.props.game._id
        }

        this.props.deleteGame(gameData);
        this.props.rerenderParentCallback();
        this.props.rerenderParentCallback();
    }
    
    render () {
        const { classes, game } = this.props;
        const { user, loading } = this.state
        let userName = "";
        if (loading == false && user) {
            userName = user.login
        }
        
        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                    {new Date(game.gameDate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </StyledTableCell>
                <StyledTableCell align="right"><Link to={`/game/${game._id}`}>{ game.title }</Link></StyledTableCell>
                <StyledTableCell align="right"><Link to={`/profile/${game.userId}`}>{ userName }</Link></StyledTableCell>                
                <StyledTableCell align="right">{ game.city }</StyledTableCell>
                <StyledTableCell align="right">{ game.boardGameName }</StyledTableCell>
                <StyledTableCell align="right">{ game.playersNumber }/{ game.playersMax }</StyledTableCell>
                <StyledTableCell align="right">
                    <span title="Edit game"><Link to={{ pathname: '/admin/game/edit', state: { game: game} }}><EditIcon /></Link></span>
                    <span title="Delete game"><DeleteIcon onClick={this.handleDelete} /></span>
                </StyledTableCell>
            </StyledTableRow> 
        )
    }
}


const styles = {
    true: {
        color: "red",
        fontWeight: 'bold'
    }
}


const mapStateToProps = (state) => ({
    errors: state.errors
})


export default connect(mapStateToProps, { deleteGame, getUserByIdFunction })(withRouter(withStyles(styles)(Game)));
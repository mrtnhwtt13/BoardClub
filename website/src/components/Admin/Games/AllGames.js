import React, { Component } from 'react';
import Game from './Game';
import { withStyles } from '@material-ui/core/styles';
import { getGames } from '../../../actions/gameActions';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#4c5ffe",
        color: "white",
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


class AllGames extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleRerender: 1
        }

        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);    
    }

    rerenderParentCallback() {
        this.componentDidMount();
        this.setState({toggleRerender: this.state.toggleRerender + 1 })
    }

    componentDidMount() {
        if (!this.props.authUser || this.props.authUser.isAdmin === false) {
            this.props.history.push('/');
        }
        this.props.getGames()
    }

    render () {
        const { list, classes } = this.props
        const items = list && list.map(el => <Game key={el._id} game={el} rerenderParentCallback={this.rerenderParentCallback}/>)

        return (
            <div>
                <h1 className={classes.title}>MANAGE GAMES</h1>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Game date</StyledTableCell>
                                <StyledTableCell align="right">Title</StyledTableCell>
                                <StyledTableCell align="right">Creator</StyledTableCell>
                                <StyledTableCell align="right">City</StyledTableCell>
                                <StyledTableCell align="right">Board Game</StyledTableCell>
                                <StyledTableCell align="right">Players</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { items }         
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}


const styles = {
    title: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'center'
    },
    table: {
        minWidth: 650
    },
    root: {
        flexShrink: 0
    }
}


const mapStateToProps = (state) => ({
    list: state.game.list,
    loading: state.game.loading,
    authUser: state.auth.user
})


export default connect(mapStateToProps, { getGames })(withRouter(withStyles(styles)(AllGames)));
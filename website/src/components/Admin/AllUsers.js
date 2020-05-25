import React, { Component } from 'react';
import User from './User';
import { withStyles } from '@material-ui/core/styles';
import { getAllUsers } from '../../actions/userActions';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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


class AllUsers extends Component {
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
        this.props.getAllUsers()
    }

    render () {
        const { list, classes } = this.props
        const items = list && list.map(el => <User key={el._id} user={el} rerenderParentCallback={this.rerenderParentCallback}/>)

        return (
            <div>
                <h1 className={classes.title}>MANAGE USERS</h1>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Login</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">Inscription</StyledTableCell>
                                <StyledTableCell align="right">Admin</StyledTableCell>
                                <StyledTableCell align="right">Banned</StyledTableCell>
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
    list: state.user.list,
    loading: state.user.loading
})


export default connect(mapStateToProps, { getAllUsers })(withStyles(styles)(AllUsers));
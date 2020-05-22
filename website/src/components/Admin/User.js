import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import { deleteUser, banUser } from '../../actions/userActions';
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


class User extends Component {
    constructor (props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleBan = this.handleBan.bind(this);
    }

    handleDelete () {
        const userData = {
            userId: this.props.user._id
        }

        this.props.deleteUser(userData);
        this.props.rerenderParentCallback();
        this.props.rerenderParentCallback();
    }

    handleBan () {
        var change = true;
        if (this.props.user.isBanned === true) {
            change = false;
        }

        const userData = {
            userId: this.props.user._id,
            ban: change
        }

        this.props.banUser(userData);
        this.props.rerenderParentCallback();
        this.props.rerenderParentCallback();
    }

    render () {
        const { classes, user } = this.props;
        let ban = "No";
        let admin = "No";

        if (user.isBanned === true) {
            ban = (<span className={classes.true}>Yes</span>);
        }
        if (user.isAdmin === true) {
            admin = (<span className={classes.true}>Yes</span>);
        }

        return (
            <StyledTableRow>
                <StyledTableCell component="th" scope="row"><Link to={`/profile/${user._id}`}>{user.login}</Link></StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">
                    {new Date(user.inscriptionDate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </StyledTableCell>
                <StyledTableCell align="right">{ admin }</StyledTableCell>
                <StyledTableCell align="right">{ ban }</StyledTableCell>
                <StyledTableCell align="right">
                    <span title="Edit user"><Link to={`/admin/user/edit`} user={user}><EditIcon /></Link></span>
                    <span title="Ban user"><BlockIcon onClick={this.handleBan} /></span>
                    <span title="Delete user"><DeleteIcon onClick={this.handleDelete} /></span>
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


export default connect(mapStateToProps, { deleteUser, banUser })(withRouter(withStyles(styles)(User)));
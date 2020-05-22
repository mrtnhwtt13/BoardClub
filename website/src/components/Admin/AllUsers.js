import React, { Component } from 'react';
import User from './User';
import { getAllUsers } from '../../actions/userActions';
import { connect } from 'react-redux';


class AllUsers extends Component {

    componentDidMount() {
        this.props.getAllUsers()
    }    

    render () {
        const { list } = this.props
        const items = list && list.map(el => <User key={el._id} user={el} />)

        return (
            <div>
                { items }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    list: state.user.list,
    loading: state.user.loading
})


export default connect(mapStateToProps, { getAllUsers })(AllUsers);
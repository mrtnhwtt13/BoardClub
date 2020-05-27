import React, { Component } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';
import { connect } from 'react-redux';
import { getCommentsByGameId } from '../../../actions/commentActions';
import LoadingComments from './LoadingComments';
import { withRouter } from 'react-router-dom';


class ListComments extends Component {

    componentDidMount() {
        this.props.getCommentsByGameId(this.props.gameId)
    }   

    render () {
        const { list, loading } = this.props
        const items = list && list.map(el => <Comment key={el._id} comment={el} />)

        return (
            <div>
                <AddComment gameId={this.props.gameId} />
                { loading ? <LoadingComments /> : items }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    list: state.comment.list,
    loading: state.comment.loading
})


export default connect(mapStateToProps, { getCommentsByGameId })(withRouter(ListComments));
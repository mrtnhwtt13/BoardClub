import React, { Component } from 'react';
import { searchGames } from '../../actions/gameActions';
import SearchForm from './SearchForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Game from '../Games/Game';
import Loading from '../Loading/Loading';


class SearchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: false,
            searchText: "",
            searchTerm: ""
        }

        this.searchingGame = this.searchingGame.bind(this)
    }

    componentDidMount() {
        if (!localStorage.getItem('jwtToken')) {
            this.props.history.push('/');
        }
    }

    searchingGame(searchingData) {
        this.props.searchGames(searchingData);
        this.setState({ 
            search: true
        })
    }

    render () {
        const { search } = this.state;
        const { list, loading, status } = this.props;
        var results = null;

        if (search === true) {
            if (loading === false && list && status === "search") {
                results = list && list.map(el => <Game key={el._id} game={el} />)
            }
            else {
                results = < Loading />
            }
        }

        return (
            <div>
                <div>            
                    <SearchForm searchingGame={this.searchingGame} />
                </div>
                <div>
                    {results}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    list: state.game.list,
    loading: state.game.loading,
    authUser: state.auth.user,
    status: state.game.status
})


export default connect(mapStateToProps, { searchGames })(withRouter(SearchPage))
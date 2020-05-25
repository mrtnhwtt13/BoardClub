import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchGames } from '../../actions/gameActions';
import SearchForm from './SearchForm';


class SearchPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: null,
            loading: true,
        }
    }

    componentDidMount() {
        
    }  

    render () {
        const { search, loading } = this.state

        return (
            <div>            
                <SearchForm />
            </div>
        )
    }
}


export default (SearchPage);
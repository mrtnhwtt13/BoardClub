import React, { Component } from 'react';
import Details from './Details';
import { connect } from 'react-redux';
import { getGameById } from '../../actions/gameActions';
import LoadingGame from './LoadingGame';


class GameDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: null,
            loading: true,
        }
    }

    componentDidMount() {
        getGameById(this.props.match.params.gameId).then(
            (response) => {
              this.setState({ game: response, loading: false })
            },
            (error) => {
              console.log('error: ', error)
            }
          )
    }  

    render () {
        const { game, loading } = this.state

        return (
            <div>            
                { loading ? <LoadingGame /> : <Details game={game} /> }
            </div>
        )
    }
}


export default (GameDisplay);
import React, { Component } from 'react';
import Details from './Details';
import { withRouter } from 'react-router-dom'
import { getGameById } from '../../actions/gameActions';
import LoadingGame from './LoadingGame';
import ListComments from './Comments/ListComments';


class GameDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: null,
            loading: true,
            thisGameId: null,
            thisGamePlayers: null,
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

    render() {
        const { game, loading } = this.state
        if (game){
            if (this.state.thisGameId === null){
                this.setState({thisGameId: game._id})
            }
            if (this.state.thisGamePlayers === null){
                this.setState({thisGamePlayers: game.players})
                console.log('players updated')
            }
        }
        return (
            <div>
                {
                    loading ?
                        <LoadingGame /> :
                        <div>
                            <div>
                                <Details game={game} rerenderParentCallback={this.rerenderParentCallback} />
                            </div>
                            <div>
                                <ListComments gameId={game._id} />
                            </div>
                        </div>
                }
            </div>
        )
    }
}


export default withRouter(GameDisplay);
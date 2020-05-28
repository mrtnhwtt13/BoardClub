import React, { Component } from 'react';
import Details from './Details';
import { withRouter } from 'react-router-dom'
import { getGameById } from '../../actions/gameActions';
import LoadingGame from './LoadingGame';
import ListComments from './Comments/ListComments';
import { connect } from 'react-redux';


class GameDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            game: null,
            loading: true,
            playersList: null,
            // players: null,
        }
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
        
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

    rerenderParentCallback() {
        // getGameById(this.props.match.params.gameId).then(
        //     (response) => {
        //         this.setState({ game: response, loading: false })
        //     },
        //     (error) => {
        //         console.log('error: ', error)
        //     }
        // )

        // =====================================

        // if (this.state.playersList === null){
        //     console.log(this.state.game.players)
        //     this.setState({playersList: this.state.game.players}, () => {
        //         console.log(this.state.playersList)
        //     })
        // }
        // if (this.props.players && this.state.playersList !== this.props.players.players){
        //     console.log(this.state.playersList)
        //     console.log(this.props.players.players)
        //     this.setState({playersList: this.props.players.players}, () => {
        //         console.log(this.state.playersList)
        //     })
        // }
    }


    render() {
        const { game, loading } = this.state
        const { players } = this.props
        if (game){
            if (this.state.playersList === null){
                console.log(game.players, "game.players")
                this.setState({playersList: game.players}, () => {
                    console.log(this.state.playersList, "PlayersList")
                })
            }
            if (players && this.state.playersList !== players.players){
                console.log(this.state.playersList, "PlayersList")
                console.log(players.players, "players.players")
                this.setState({playersList: players.players}, () => {
                    console.log(this.state.playersList, "PlayersList")
                })
            }
        }
        return (
            <div>
                {
                    loading ?
                        <LoadingGame /> :
                        <div>
                            <div>
                                <Details game={game} rerenderParentCallback={this.rerenderParentCallback}/>
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

const mapStateToProps = (state) => ({
    players: state.players.players
})

export default connect(mapStateToProps, { getGameById })(withRouter(GameDisplay));
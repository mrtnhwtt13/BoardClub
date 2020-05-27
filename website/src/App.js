import React, { Component } from 'react';
import  { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import store from './store';
import Main from './components/Layout/Main';
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import GamePage from './components/GameView/GameDisplay';
import EditUser from './components/Admin/EditUser';
import EditProfile from './components/Profile/Edit/EditProfile.js';
import CreateGame from './components/CreateGame/CreateGame';
import NotFound from './components/NotFound';
import Admin from './components/Admin/Admin'
import Profile from './components/Profile/Profile'
import Friends from './components/Friends/FriendsList';
import SearchPage from './components/Search/SearchPage';
import setAuthHeader from './utils/setAuthHeader';
import { logoutUser, getCurrentUser } from './actions/authActions';
import ScheduledGames from './components/ScheduledGames/ScheduledGames';


if (localStorage.getItem('jwtToken')) {
  const currentTime = Date.now() / 1000
  const decode = jwt_decode(localStorage.getItem('jwtToken'))

  if (currentTime > decode.exp) {
    store.dispatch(logoutUser())
    window.location.href = '/'
  }
  else {
    setAuthHeader(localStorage.getItem('jwtToken'))
    store.dispatch(getCurrentUser())
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
          <Main>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/search" component={SearchPage} />
                <Route path="/admin/user/edit" component={EditUser} />
                <Route exact path="/admin" component={Admin} />
                <Route path="/game/:gameId" component={GamePage} />
                <Route path="/profile/edit" component={EditProfile} />
                <Route path="/profile/:userId" component={Profile} />
                <Route path="/create" component={CreateGame} />
                <Route path="/friends" component={Friends} />
                <Route path="/scheduledGames" component={ScheduledGames} />

                <Route component={NotFound} />
              </Switch>
            </Main>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}


export default App;

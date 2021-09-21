import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './Components/Shared/Navigation/Navigation';

import './App.css'

import Home from './pages/Home/Home';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';


function App() {
  const { loading } = useLoadingWithRefresh()
  return loading ? (
    'Loading....'
  ) : (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <GuestRoute exact path="/">
          <Home />
        </GuestRoute>
        <GuestRoute exact path="/authenticate">
          <Authenticate />
        </GuestRoute>
        <SemiProtectedRoute exact path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute exact path="/rooms">
          <Rooms />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  const { isAuth, user } = useSelector((state) => state.auth)

  return (
    <Route {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: '/rooms',
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    ></Route>
  );

}

const SemiProtectedRoute = ({ children, ...rest }) => {
  const { isAuth, user } = useSelector((state) => state.auth)

  return (
    <Route {...rest} render={({ location }) => {
      return !isAuth ?
        (
          <Redirect to={{
            pathname: "/",
            state: { from: location }
          }} />
        ) : isAuth && !user.activated ? (
          children
        ) : (
          <Redirect to={{
            pathname: "/rooms",
            state: { from: location }
          }} />
        )

    }}>

    </Route>
  )
}

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuth, user } = useSelector((state) => state.auth)

  return (
    <Route {...rest} render={({ location }) => {
      return !isAuth ?
        (
          <Redirect to={{
            pathname: "/",
            state: { from: location }
          }} />
        ) : isAuth && !user.activated ? (
          <Redirect to={{
            pathname: "/activate",
            state: { from: location }
          }} />
        ) : (
          children
        )

    }}>

    </Route>
  )
}
export default App;

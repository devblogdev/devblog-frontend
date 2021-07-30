import './App.css';
import { connect } from 'react-redux'
import { 
    BrowserRouter as Router,
    Route    
} from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Home from './containers/Home'
import ManageLogin from './containers/ManageLogin'


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route
          exact path="/"
          component = {Home}
        />
        <Route
          exact path="/login"
          render={routerProps => <ManageLogin {...routerProps} /> }
        />
        <Route
          exact path="/signup"
          render={routerProps => <ManageLogin {...routerProps} /> }
        />
        <Route
          exact path="/logout"
          render={routerProps => <Home {...routerProps} /> }
        />
      </div>
    </Router>
  );
}

export default App;

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
          // component ={ <ManageLogin routerProps ={props} />}
          render={routerProps => <ManageLogin {...routerProps} /> }
        />
        <Route
          exact path="/signup"
          // component ={ <ManageLogin routerProps ={props} />}
          render={routerProps => <ManageLogin {...routerProps} /> }
        />
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import { connect } from 'react-redux'
import { 
    BrowserRouter as Router,
    Route    
} from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import ManageLogin from './containers/ManageLogin'


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route
          exact path="/login"
          // component ={ <ManageLogin routerProps ={props} />}
          render={routerProps => <ManageLogin {...routerProps} /> }
        />
        {/* <Route
          exact path="/logout"
          component = {ManageLogin}
        /> */}

      
      </div>
    </Router>
  );
}

export default App;

import {Router,Link} from '@reach/router'
import './App.css';
import List from './components/List'
import Add from './components/Add'
import Status from './components/Status'
function App() {
  return (
    <div className="App">
    <Link className="btn btn-primary" to="/players/add">Manage Players</Link>
      <Link className="btn btn-primary" to="/status/1">Manage Player Status</Link>
      <Router>
          <List path="/players/list"/>
          <Add path="/players/add"/>
          <Status path="/status/:id"/>
      </Router>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Nav from './layouts/Nav';
import Router from './router/Router';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Nav></Nav>
        </header>
        <Router></Router>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

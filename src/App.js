 import logo from './logo.svg';
import './App.css';
import MapView from './MapView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Explore the climate impact and initiatives around the world with <span className='App-link'>Eco Globe</span></p>
      </header>
      <div>
          <MapView />
        </div>
    </div>
  );
}

export default App;

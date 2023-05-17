import './App.css';
import Clock from './Clock'

function App() {
  return (
    <div className='App'>
      <Clock showWeeks={true} showMilliseconds={true} />
    </div>
  );
}

export default App;

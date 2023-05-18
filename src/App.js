import './App.css';
import Clock from './Clock'

function App() {
  return (
    <div className='App'>
      <Clock showWeeks={true} showMilliseconds={true} />
      <div className='Bottom'>
        <p>Questions? Check the <a href='https://github.com/rpschedule/rpschedule.github.io'>repo</a></p>
      </div>
    </div>
  );
}

export default App;

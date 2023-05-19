import { useState, useEffect } from 'react';
import './App.css';
import Clock from './Clock'

function App() {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    fetch('https://pastebin.com/raw/uGiQVyGZ')
       .then((res) => res.json())
       .then((data) => {
          if ( data.use_alternate_schedule ) {
            setSchedule(data.alternate_schedule);
          }
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);

  return (
    <div className='App'>
      <Clock showWeeks={true} schedule={schedule} />
      <div className='Bottom'>
        <p>Questions? Check the <a href='https://github.com/rpschedule/rpschedule.github.io'>repo</a></p>
      </div>
    </div>
  );
}

export default App;

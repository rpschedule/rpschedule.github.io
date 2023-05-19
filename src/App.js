import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Clock from './Clock'

function App() {
  const [schedule, setSchedule] = useState(null);

  axios.get('https://raw.githubusercontent.com/rpschedule/pastebin/main/alt_schedule.json')
  .then(response => {
    alert(response.data);
    setSchedule(response.data.schedule)
  })
  .catch(error => {
    alert(error)
  });

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

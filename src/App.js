import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import TimeFrameSelector from './components/TimeFrameSelector';
import Charts from './components/Charts';

// Timeframes breakdowns list
const timeFramesList = [
  { id: '1', displayValue: 'Daily' },
  { id: '2', displayValue: 'Weekly' },
  { id: '3', displayValue: 'Monthly' },
];

function App() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle dropdown click
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Handle selected breakdown
  const handleSelect = (value) => {
    setIsLoading(true);
    setSelectedTimeFrame(value);
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (isLoading) {
      // Simulate a minimum loading time of 1 second
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="App">
      <h1>Welcome to react charting app</h1>
      <TimeFrameSelector
         timeFramesList={timeFramesList}
         selectedTimeFrame={selectedTimeFrame}
         toggleDropdown={toggleDropdown}
         dropdownOpen={dropdownOpen}
         handleSelect={handleSelect}
      />
      <hr className='hr-line'/>
      {
        isLoading ? (
            <div className="loader-container">
                  <Loader type='TailSpin' color="#0390fc" height={80} width={80} />
            </div> ):  
          (<Charts selectedTimeFrame={selectedTimeFrame}/>)
      }
      
    </div>
  );
}

export default App;

import { IoIosArrowDropdown } from "react-icons/io";

import './index.css';

const TimeFrameSelector = (props) => {
    const {
        timeFramesList, 
        selectedTimeFrame, 
        dropdownOpen,
        handleSelect, 
        toggleDropdown
    } = props

    return (
        <div className="dropdown">
            <div className="dropdown-select" >
                {selectedTimeFrame || 'Select a time frame'}
                <button className='dropdown-btn' onClick={toggleDropdown}>
                    <IoIosArrowDropdown size={"100%"}/>
                </button>
            </div>
            <div className={`dropdown-options ${dropdownOpen ? 'active' : ''}`}>
                {timeFramesList.map((timeFrame) => (
                    <div
                        key={timeFrame.id}
                        className="dropdown-option"
                        onClick={() => handleSelect(timeFrame.displayValue)}
                    >
                        {timeFrame.displayValue}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeFrameSelector;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [elements, setElements] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [digitCounts, setDigitCounts] = useState(Array(10).fill(0));
  const pageSize = 20;

  const generateNumbers = () => {
    const minNumber = parseInt(prompt('enter min number'));
    const maxNumber = parseInt(prompt('enter max number'));

    const generatedElements = Array.from({ length: 1000000 }, (_, index) => ({
    id: index + 1,
    value: Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber, // Random value between min and max
  }));

  setElements(generatedElements);
  setCurrentPage(1);
}

const countDigits = () => {
  const counts = Array(10).fill(0); // Initialize the counter for digits 0-9

  // Loop through each element in the array
  elements.forEach((element) => {
    const digits = element.value.toString(); // Convert number to string
    // Loop through each digit in the number
    for (const digit of digits) {
      counts[parseInt(digit)] += 1; // Increment count for this digit
    }
  });

  // Set the count result to the state to display on the page
  setDigitCounts(counts);
};

const totalPages = Math.ceil(elements.length / pageSize);

  // Get elements for the current page
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return elements.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  

  return (
    <>
    <div>
        <button onClick={generateNumbers}>Generate Numbers</button>

        <ul>
          {getPaginatedData().map((element) => (
            <li key={element.id}>Element {element.id}: {element.value}</li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
        <div style={{margin: '50px'}}>
        <button onClick={countDigits}>Count Digits</button>
          <h2>Digit Counts:</h2>
          <ul>
            {digitCounts.map((count, digit) => (
              <li key={digit}>Digit {digit}: {count} times</li>
            ))}
          </ul>
        </div>
      </div>
      
    </>
  )
}

export default App

import { useState, useEffect, useCallback } from 'react'
import Controls from './components/Controls'
import BarChart from './components/BarChart'
import AlgorithmDetails from './components/AlgorithmDetails'
import { algorithms } from './utils/algorithms'
import { generateRandomArray, sleep } from './utils/helpers'

function App() {
  const [array, setArray] = useState([])
  const [arraySize, setArraySize] = useState(10)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('insertion')
  const [sortingSpeed, setSortingSpeed] = useState('fast')
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [sortingState, setSortingState] = useState({
    comparing: [],
    swapped: [],
    sorted: []
  })

  // Generate initial array
  useEffect(() => {
    setArray(generateRandomArray(arraySize))
  }, [arraySize])

  // Generate new random array
  const handleRandomize = useCallback(() => {
    if (!isSorting) {
      setArray(generateRandomArray(arraySize))
      setSortingState({ comparing: [], swapped: [], sorted: [] })
    }
  }, [arraySize, isSorting])

  // Handle manual input
  const handleManualInput = useCallback((input) => {
    if (!isSorting) {
      const numbers = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
      if (numbers.length > 0) {
        setArray(numbers)
        setArraySize(numbers.length)
        setSortingState({ comparing: [], swapped: [], sorted: [] })
      }
    }
  }, [isSorting])

  // Sort function
  const handleSort = useCallback(async () => {
    if (isSorting) return
    
    setIsSorting(true)
    setIsPaused(false)
    
    const algorithm = algorithms[selectedAlgorithm]
    const speed = { fast: 50, medium: 150, slow: 300 }[sortingSpeed]
    
    try {
      await algorithm.sort(
        [...array],
        setArray,
        setSortingState,
        speed,
        () => isPaused
      )
    } catch (error) {
      console.error('Sorting error:', error)
    } finally {
      setIsSorting(false)
      setIsPaused(false)
    }
  }, [array, selectedAlgorithm, sortingSpeed, isSorting, isPaused])

  // Pause/Resume function
  const handlePauseResume = useCallback(() => {
    if (isSorting) {
      setIsPaused(!isPaused)
    }
  }, [isSorting, isPaused])

  // Reset function
  const handleReset = useCallback(() => {
    if (!isSorting) {
      setArray(generateRandomArray(arraySize))
      setSortingState({ comparing: [], swapped: [], sorted: [] })
    }
  }, [arraySize, isSorting])

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-100 text-gray-900'
    }`}>
      {/* Header */}
      <div className="text-center py-6 relative">
        <h1 className="text-3xl font-bold tracking-wider">SORTING VISUALIZER</h1>
        
        {/* Dark Mode Toggle - Top Right Corner */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute top-6 right-6 px-4 py-2 text-sm border rounded-lg transition-all duration-200 ${
            darkMode 
              ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Controls */}
      <Controls
        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmChange={setSelectedAlgorithm}
        arraySize={arraySize}
        onArraySizeChange={setArraySize}
        sortingSpeed={sortingSpeed}
        onSortingSpeedChange={setSortingSpeed}
        onRandomize={handleRandomize}
        onSort={handleSort}
        onPauseResume={handlePauseResume}
        onReset={handleReset}
        isSorting={isSorting}
        isPaused={isPaused}
        onManualInput={handleManualInput}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[560px]">
          {/* Bar Chart - Takes 2/3 of the space */}
          <div className="lg:w-2/3 h-full">
            <BarChart
              array={array}
              sortingState={sortingState}
              darkMode={darkMode}
            />
          </div>

          {/* Algorithm Details - Takes 1/3 of the space */}
          <div className="lg:w-1/3 h-full">
            <AlgorithmDetails
              algorithm={algorithms[selectedAlgorithm]}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

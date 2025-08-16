import { useState, useEffect, useCallback } from 'react'

function App() {
  const [array, setArray] = useState([])
  const [arraySize, setArraySize] = useState(10)
  const [algorithm, setAlgorithm] = useState('Bubble Sort')
  const [speed, setSpeed] = useState('Medium')
  const [isSorting, setIsSorting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [sortingSteps, setSortingSteps] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [manualInput, setManualInput] = useState('')
  const [comparingIndices, setComparingIndices] = useState([])
  const [swappingIndices, setSwappingIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])

  // Algorithm information
  const algorithmInfo = {
    'Bubble Sort': {
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stability: 'Stable',
      description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
    },
    'Selection Sort': {
      timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stability: 'Unstable',
      description: 'Divides the input list into two parts: a sorted sublist and an unsorted sublist. Repeatedly selects the smallest element from the unsorted sublist.'
    },
    'Insertion Sort': {
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stability: 'Stable',
      description: 'Builds the final sorted array one item at a time. It takes each element from the input and inserts it into its correct position in the sorted array.'
    }
  }

  // Generate random array
  const generateRandomArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 1
    )
    setArray(newArray)
    setCurrentStep(0)
    setSortingSteps([])
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    setIsSorting(false)
    setIsPaused(false)
  }, [arraySize])

  // Initialize array on mount and when array size changes
  useEffect(() => {
    generateRandomArray()
  }, [arraySize, generateRandomArray])

  // Generate sorting steps for the selected algorithm
  const generateSortingSteps = useCallback(() => {
    const arrayCopy = [...array]
    const steps = []
    
    if (algorithm === 'Bubble Sort') {
      for (let i = 0; i < arrayCopy.length; i++) {
        for (let j = 0; j < arrayCopy.length - i - 1; j++) {
          steps.push({
            type: 'compare',
            indices: [j, j + 1],
            array: [...arrayCopy]
          })
          
          if (arrayCopy[j] > arrayCopy[j + 1]) {
            [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]]
            steps.push({
              type: 'swap',
              indices: [j, j + 1],
              array: [...arrayCopy]
            })
          }
        }
        steps.push({
          type: 'sorted',
          indices: [arrayCopy.length - i - 1],
          array: [...arrayCopy]
        })
      }
    } else if (algorithm === 'Selection Sort') {
      for (let i = 0; i < arrayCopy.length - 1; i++) {
        let minIndex = i
        for (let j = i + 1; j < arrayCopy.length; j++) {
          steps.push({
            type: 'compare',
            indices: [minIndex, j],
            array: [...arrayCopy]
          })
          
          if (arrayCopy[j] < arrayCopy[minIndex]) {
            minIndex = j
          }
        }
        
        if (minIndex !== i) {
          [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]]
          steps.push({
            type: 'swap',
            indices: [i, minIndex],
            array: [...arrayCopy]
          })
        }
        
        steps.push({
          type: 'sorted',
          indices: [i],
          array: [...arrayCopy]
        })
      }
      steps.push({
        type: 'sorted',
        indices: [arrayCopy.length - 1],
        array: [...arrayCopy]
      })
    } else if (algorithm === 'Insertion Sort') {
      for (let i = 1; i < arrayCopy.length; i++) {
        let key = arrayCopy[i]
        let j = i - 1
        
        while (j >= 0 && arrayCopy[j] > key) {
          steps.push({
            type: 'compare',
            indices: [j, j + 1],
            array: [...arrayCopy]
          })
          
          arrayCopy[j + 1] = arrayCopy[j]
          j--
          
          steps.push({
            type: 'swap',
            indices: [j + 1, j + 2],
            array: [...arrayCopy]
          })
        }
        
        arrayCopy[j + 1] = key
        steps.push({
          type: 'sorted',
          indices: [j + 1],
          array: [...arrayCopy]
        })
      }
    }
    
    setSortingSteps(steps)
    return steps
  }, [array, algorithm])

  // Start sorting
  const startSorting = () => {
    if (isSorting) return
    
    const steps = generateSortingSteps()
    if (steps.length === 0) return
    
    setIsSorting(true)
    setIsPaused(false)
    setCurrentStep(0)
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
  }

  // Pause/Resume sorting
  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  // Reset sorting
  const resetSorting = () => {
    setIsSorting(false)
    setIsPaused(false)
    setCurrentStep(0)
    setComparingIndices([])
    setSwappingIndices([])
    setSortedIndices([])
    generateRandomArray()
  }

  // Handle manual input
  const handleManualInput = () => {
    if (!manualInput.trim()) return
    
    const numbers = manualInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
    if (numbers.length > 0) {
      setArray(numbers)
      setArraySize(numbers.length)
      setCurrentStep(0)
      setSortingSteps([])
      setComparingIndices([])
      setSwappingIndices([])
      setSortedIndices([])
      setIsSorting(false)
      setIsPaused(false)
      setManualInput('')
    }
  }

  // Sorting animation effect
  useEffect(() => {
    if (!isSorting || isPaused || currentStep >= sortingSteps.length) {
      if (currentStep >= sortingSteps.length && isSorting) {
        setIsSorting(false)
      }
      return
    }

    const speedMap = { 'Slow': 1000, 'Medium': 500, 'Fast': 100 }
    const timer = setTimeout(() => {
      const step = sortingSteps[currentStep]
      
      if (step.type === 'compare') {
        setComparingIndices(step.indices)
        setSwappingIndices([])
      } else if (step.type === 'swap') {
        setComparingIndices([])
        setSwappingIndices(step.indices)
        setArray(step.array)
      } else if (step.type === 'sorted') {
        setComparingIndices([])
        setSwappingIndices([])
        setSortedIndices(prev => [...new Set([...prev, ...step.indices])])
        setArray(step.array)
      }
      
      setCurrentStep(prev => prev + 1)
    }, speedMap[speed])

    return () => clearTimeout(timer)
  }, [isSorting, isPaused, currentStep, sortingSteps, speed])

  // Get bar color based on state
  const getBarColor = (index) => {
    if (sortedIndices.includes(index)) return 'bg-green-500'
    if (swappingIndices.includes(index)) return 'bg-red-500'
    if (comparingIndices.includes(index)) return 'bg-yellow-500'
    return 'bg-blue-600'
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      {/* Header */}
      <div className="text-center py-4">
        <h1 className={`text-2xl font-bold border-2 border-black px-6 py-2 inline-block ${
          darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black'
        }`}>
          SORTING VISUALIZER
        </h1>
      </div>

      {/* Control Panel */}
      <div className={`max-w-7xl mx-auto px-4 mb-6 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-200'
      } rounded-lg p-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          {/* Algorithm Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2">ALGORITHM</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className={`w-full p-2 border rounded ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="Bubble Sort">Bubble Sort</option>
              <option value="Selection Sort">Selection Sort</option>
              <option value="Insertion Sort">Insertion Sort</option>
            </select>
          </div>

          {/* Array Size Control */}
          <div>
            <label className="block text-sm font-semibold mb-2">ARRAY SIZE</label>
            <input
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-1 font-semibold">{arraySize}</div>
          </div>

          {/* Sorting Speed Control */}
          <div>
            <label className="block text-sm font-semibold mb-2">SORTING SPEED</label>
            <select
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              className={`w-full p-2 border rounded ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="Slow">Slow</option>
              <option value="Medium">Medium</option>
              <option value="Fast">Fast</option>
            </select>
          </div>

          {/* Manual Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">MANUAL INPUT</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="e.g., 5,2,8,1,9"
                className={`flex-1 p-2 border rounded text-sm ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
              <button
                onClick={handleManualInput}
                className={`px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                  darkMode ? 'hover:bg-blue-700' : ''
                }`}
              >
                Set
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={generateRandomArray}
              className={`px-4 py-2 border border-black rounded hover:bg-gray-100 ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
              }`}
            >
              Randomize
            </button>
            <button
              onClick={startSorting}
              disabled={isSorting}
              className={`px-4 py-2 border border-black rounded ${
                isSorting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-100'
              } ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
              }`}
            >
              Sort
            </button>
          </div>
        </div>

        {/* Play/Pause/Reset Controls */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={startSorting}
            disabled={isSorting && !isPaused}
            className={`px-6 py-2 rounded font-semibold ${
              isSorting && !isPaused
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Play
          </button>
          <button
            onClick={togglePause}
            disabled={!isSorting}
            className={`px-6 py-2 rounded font-semibold ${
              !isSorting
                ? 'opacity-50 cursor-not-allowed bg-gray-400'
                : isPaused
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={resetSorting}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-semibold"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Area */}
        <div className={`lg:col-span-2 ${
          darkMode ? 'bg-gray-800' : 'bg-gray-200'
        } rounded-lg p-6`}>
          {/* Color Legend */}
          <div className="flex flex-wrap gap-4 mb-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm font-semibold">Initial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm font-semibold">Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm font-semibold">Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm font-semibold">Sorted</span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-center gap-1 h-64">
            {array.map((value, index) => (
              <div
                key={index}
                className={`w-8 rounded-t transition-all duration-200 ${
                  getBarColor(index)
                }`}
                style={{ height: `${(value / 100) * 200}px` }}
                title={`Index ${index}: ${value}`}
              >
                <div className="text-xs text-center text-white font-semibold mt-1">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Algorithm Details Panel */}
        <div className={`${
          darkMode ? 'bg-gray-800' : 'bg-gray-200'
        } rounded-lg p-6`}>
          <h2 className="text-xl font-bold mb-4">ALGORITHM DETAILS</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{algorithm}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {algorithmInfo[algorithm].description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Time Complexity</h4>
              <div className="space-y-1 text-sm">
                <div>Best: <span className="font-mono text-green-600">{algorithmInfo[algorithm].timeComplexity.best}</span></div>
                <div>Average: <span className="font-mono text-yellow-600">{algorithmInfo[algorithm].timeComplexity.average}</span></div>
                <div>Worst: <span className="font-mono text-red-600">{algorithmInfo[algorithm].timeComplexity.worst}</span></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Space Complexity</h4>
              <div className="font-mono text-blue-600">{algorithmInfo[algorithm].spaceComplexity}</div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Stability</h4>
              <div className={`font-semibold ${
                algorithmInfo[algorithm].stability === 'Stable' ? 'text-green-600' : 'text-red-600'
              }`}>
                {algorithmInfo[algorithm].stability}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full shadow-lg ${
            darkMode 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' 
              : 'bg-gray-800 hover:bg-gray-900 text-white'
          }`}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  )
}

export default App

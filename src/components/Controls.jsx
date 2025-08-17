import { useState } from 'react'

const Controls = ({
  selectedAlgorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  sortingSpeed,
  onSortingSpeedChange,
  onRandomize,
  onSort,
  onPauseResume,
  onReset,
  isSorting,
  isPaused,
  onManualInput,
  darkMode,
  onDarkModeToggle
}) => {
  const [manualInput, setManualInput] = useState('')
  const [showManualInput, setShowManualInput] = useState(false)

  const algorithms = [
    { value: 'bubble', label: 'Bubble Sort' },
    { value: 'selection', label: 'Selection Sort' },
    { value: 'insertion', label: 'Insertion Sort' },
    { value: 'merge', label: 'Merge Sort' },
    { value: 'quick', label: 'Quick Sort' }
  ]

  const speeds = [
    { value: 'fast', label: 'Fast' },
    { value: 'medium', label: 'Medium' },
    { value: 'slow', label: 'Slow' }
  ]

  const handleManualInputSubmit = () => {
    if (manualInput.trim()) {
      onManualInput(manualInput)
      setManualInput('')
      setShowManualInput(false)
    }
  }

  return (
    <div className="px-6 py-4">
      <div className="container mx-auto">
        {/* Glass Effect Control Panel */}
        <div className={`backdrop-blur-sm rounded-xl shadow-lg border ${
          darkMode 
            ? 'bg-white/10 border-white/20' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div className="p-6">
            {/* First Line: Labels and Sort Button */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-4">
              {/* Algorithm Selection */}
              <div>
                <label className={`block text-sm font-bold mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  ALGORITHM
                </label>
              </div>

              {/* Array Size Control */}
              <div>
                <label className={`block text-sm font-bold mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  ARRAY SIZE
                </label>
              </div>

              {/* Sorting Speed */}
              <div>
                <label className={`block text-sm font-bold mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  SORTING SPEED
                </label>
              </div>

              {/* Manual Input */}
              <div>
                <label className={`block text-sm font-bold mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  MANUAL INPUT
                </label>
              </div>

              {/* Sort Button */}
              <div>
                <button
                  onClick={onSort}
                  disabled={isSorting}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-white text-gray-900 hover:bg-gray-100' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
                >
                  {isSorting && (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <span>{isSorting ? 'Sorting...' : 'sort'}</span>
                </button>
              </div>
            </div>

            {/* Second Line: Input Fields and Randomize/Reset Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              {/* Algorithm Selection Input */}
              <div>
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => onAlgorithmChange(e.target.value)}
                  disabled={isSorting}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-sm border transition-colors ${
                    darkMode 
                      ? 'bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' 
                      : 'bg-white text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {algorithms.map(alg => (
                    <option key={alg.value} value={alg.value}>
                      {alg.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Array Size Slider */}
              <div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={arraySize}
                    onChange={(e) => onArraySizeChange(parseInt(e.target.value))}
                    disabled={isSorting}
                    className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${
                      darkMode 
                        ? 'bg-gray-300 slider-dark' 
                        : 'bg-gray-300 slider-light'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{
                      background: `linear-gradient(to right, ${darkMode ? '#6b7280' : '#d1d5db'} 0%, ${darkMode ? '#6b7280' : '#d1d5db'} ${(arraySize - 5) / 95 * 100}%, ${darkMode ? '#9ca3af' : '#e5e7eb'} ${(arraySize - 5) / 95 * 100}%, ${darkMode ? '#9ca3af' : '#e5e7eb'} 100%)`
                    }}
                  />
                  <span className={`text-sm font-medium min-w-[3rem] text-center ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {arraySize}
                  </span>
                </div>
              </div>

              {/* Sorting Speed Input */}
              <div>
                <select
                  value={sortingSpeed}
                  onChange={(e) => onSortingSpeedChange(e.target.value)}
                  disabled={isSorting}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-sm border transition-colors ${
                    darkMode 
                      ? 'bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' 
                      : 'bg-white text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {speeds.map(speed => (
                    <option key={speed.value} value={speed.value}>
                      {speed.value.charAt(0).toUpperCase() + speed.value.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Manual Input Field */}
              <div>
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="e.g., 5,2,8,1,9"
                  disabled={isSorting}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-sm border transition-colors ${
                    darkMode 
                      ? 'bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' 
                      : 'bg-white text-gray-700 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                />
              </div>

              {/* Randomize and Reset Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={onRandomize}
                  disabled={isSorting}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-white/90 text-gray-900 hover:bg-white border border-gray-300' 
                      : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Randomize
                </button>
                <button
                  onClick={onReset}
                  disabled={isSorting}
                  className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-white/90 text-gray-900 hover:bg-white border border-gray-300' 
                      : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Manual Input Apply Button */}
            {manualInput.trim() && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleManualInputSubmit}
                  disabled={isSorting}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 ${
                    isSorting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Controls

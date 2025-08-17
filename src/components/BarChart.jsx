const BarChart = ({ array, sortingState, darkMode }) => {
  const { comparing, swapped, sorted } = sortingState
  
  const getBarColor = (index) => {
    if (sorted.includes(index)) return 'bg-green-500'
    if (swapped.includes(index)) return 'bg-orange-500'
    if (comparing.includes(index)) return 'bg-red-500'
    return 'bg-blue-600'
  }

  const getBarWidth = () => {
    const containerWidth = 100 // percentage
    const gap = 1 // percentage gap between bars
    const totalGaps = array.length - 1
    const availableWidth = containerWidth - (totalGaps * gap)
    return Math.max(availableWidth / array.length, 0.5) // minimum 0.5% width
  }

  const barWidth = getBarWidth()
  const maxValue = Math.max(...array, 1)

  return (
    <div className={`h-full flex flex-col p-4 rounded-lg ${
      darkMode ? 'bg-gray-800' : 'bg-gray-200'
    }`}>
      {/* Color Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className={`text-sm font-medium ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Initial</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className={`text-sm font-medium ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className={`text-sm font-medium ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className={`text-sm font-medium ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>Final</span>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="flex-1 bg-gray-100 rounded-lg border border-gray-300 overflow-hidden relative">
        {/* Bars */}
        <div className="flex items-end justify-center h-full px-4 py-4 space-x-1">
          {array.map((value, index) => (
            <div
              key={index}
              className={`transition-all duration-200 ease-in-out rounded-t-sm ${
                getBarColor(index)
              }`}
              style={{
                width: `${barWidth}%`,
                height: `${(value / maxValue) * 100}%`,
                minHeight: '4px'
              }}
              title={`Index ${index}: ${value}`}
            />
          ))}
        </div>

        {/* Baseline */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300"></div>
      </div>
    </div>
  )
}

export default BarChart

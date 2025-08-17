const AlgorithmDetails = ({ algorithm, darkMode }) => {
  if (!algorithm) return null

  return (
    <div className={`h-full flex flex-col p-4 rounded-lg ${
      darkMode ? 'bg-gray-800' : 'bg-gray-200'
    }`}>
      <h2 className={`text-lg font-bold mb-4 text-center ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Algorithm Information
      </h2>

      <div className={`flex-1 rounded-lg border-2 p-4 ${
        darkMode 
          ? 'bg-gray-700 border-gray-600' 
          : 'bg-white border-gray-300'
      }`}>
        {/* Time Complexity */}
        <div className="mb-4">
          <h4 className={`font-semibold mb-2 text-sm ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Time Complexity
          </h4>
          <div className={`rounded p-3 ${
            darkMode ? 'bg-gray-600' : 'bg-gray-50'
          }`}>
            <div className="text-xs mb-2">
              <span className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                (Best, Average, Worst)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="font-medium">Best:</span>
              </div>
              <div className={`${
                darkMode ? 'text-white' : 'text-gray-900'
              } font-mono`}>
                {algorithm.timeComplexity.best}
              </div>
              <div className={`${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="font-medium">Average:</span>
              </div>
              <div className={`${
                darkMode ? 'text-white' : 'text-gray-900'
              } font-mono`}>
                {algorithm.timeComplexity.average}
              </div>
              <div className={`${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="font-medium">Worst:</span>
              </div>
              <div className={`${
                darkMode ? 'text-white' : 'text-gray-900'
              } font-mono`}>
                {algorithm.timeComplexity.worst}
              </div>
            </div>
          </div>
        </div>

        {/* Space Complexity */}
        <div className="mb-4">
          <h4 className={`font-semibold mb-2 text-sm ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Space Complexity
          </h4>
          <div className={`rounded p-3 ${
            darkMode ? 'bg-gray-600' : 'bg-gray-50'
          }`}>
            <div className="text-xs">
              <span className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Space:
              </span>
              <span className={`ml-2 font-mono ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {algorithm.spaceComplexity}
              </span>
            </div>
          </div>
        </div>

        {/* Stability */}
        <div className="mb-4">
          <h4 className={`font-semibold mb-2 text-sm ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Stability
          </h4>
          <div className={`rounded p-3 ${
            darkMode ? 'bg-gray-600' : 'bg-gray-50'
          }`}>
            <div className="text-xs">
              <span className={`font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Stable:
              </span>
              <span className={`ml-2 ${
                algorithm.stable 
                  ? 'text-green-500 font-semibold' 
                  : 'text-red-500 font-semibold'
              }`}>
                {algorithm.stable ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlgorithmDetails

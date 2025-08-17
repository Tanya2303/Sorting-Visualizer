import { sleep } from './helpers'

// Helper function to check if sorting should be paused
const checkPaused = (isPaused) => {
  if (isPaused()) {
    throw new Error('Sorting paused')
  }
}

// Bubble Sort
const bubbleSort = async (array, setArray, setSortingState, speed, isPaused) => {
  const arr = [...array]
  const n = arr.length
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      checkPaused(isPaused)
      
      setSortingState(prev => ({ ...prev, comparing: [j, j + 1] }))
      await sleep(speed)
      
      if (arr[j] > arr[j + 1]) {
        setSortingState(prev => ({ ...prev, swapped: [j, j + 1] }))
        await sleep(speed)
        
        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        setArray([...arr])
        
        await sleep(speed)
      }
      
      setSortingState(prev => ({ ...prev, swapped: [] }))
    }
    
    setSortingState(prev => ({ 
      ...prev, 
      sorted: [...prev.sorted, n - i - 1],
      comparing: []
    }))
  }
  
  setSortingState(prev => ({ 
    ...prev, 
    sorted: Array.from({ length: n }, (_, i) => i),
    comparing: [],
    swapped: []
  }))
}

// Selection Sort
const selectionSort = async (array, setArray, setSortingState, speed, isPaused) => {
  const arr = [...array]
  const n = arr.length
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    
    for (let j = i + 1; j < n; j++) {
      checkPaused(isPaused)
      
      setSortingState(prev => ({ ...prev, comparing: [i, j] }))
      await sleep(speed)
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    
    if (minIndex !== i) {
      setSortingState(prev => ({ ...prev, swapped: [i, minIndex] }))
      await sleep(speed)
      
      const temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp
      setArray([...arr])
      
      await sleep(speed)
    }
    
    setSortingState(prev => ({ 
      ...prev, 
      sorted: [...prev.sorted, i],
      comparing: [],
      swapped: []
    }))
  }
  
  setSortingState(prev => ({ 
    ...prev, 
    sorted: [...prev.sorted, n - 1],
    comparing: [],
    swapped: []
  }))
}

// Insertion Sort
const insertionSort = async (array, setArray, setSortingState, speed, isPaused) => {
  const arr = [...array]
  const n = arr.length
  
  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1
    
    setSortingState(prev => ({ ...prev, comparing: [i, j] }))
    await sleep(speed)
    
    while (j >= 0 && arr[j] > key) {
      checkPaused(isPaused)
      
      setSortingState(prev => ({ ...prev, swapped: [j, j + 1] }))
      await sleep(speed)
      
      arr[j + 1] = arr[j]
      setArray([...arr])
      
      j--
      
      if (j >= 0) {
        setSortingState(prev => ({ ...prev, comparing: [i, j] }))
        await sleep(speed)
      }
    }
    
    arr[j + 1] = key
    setArray([...arr])
    
    setSortingState(prev => ({ 
      ...prev, 
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      comparing: [],
      swapped: []
    }))
  }
}

// Merge Sort
const mergeSort = async (array, setArray, setSortingState, speed, isPaused) => {
  const arr = [...array]
  const n = arr.length
  
  const merge = async (left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    
    let i = 0, j = 0, k = left
    
    while (i < leftArr.length && j < rightArr.length) {
      checkPaused(isPaused)
      
      setSortingState(prev => ({ ...prev, comparing: [left + i, mid + 1 + j] }))
      await sleep(speed)
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i]
        i++
      } else {
        arr[k] = rightArr[j]
        j++
      }
      
      setArray([...arr])
      k++
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i]
      setArray([...arr])
      i++
      k++
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j]
      setArray([...arr])
      j++
      k++
    }
  }
  
  const mergeSortHelper = async (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      
      await mergeSortHelper(left, mid)
      await mergeSortHelper(mid + 1, right)
      await merge(left, mid, right)
      
      setSortingState(prev => ({ 
        ...prev, 
        sorted: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        comparing: [],
        swapped: []
      }))
    }
  }
  
  await mergeSortHelper(0, n - 1)
}

// Quick Sort
const quickSort = async (array, setArray, setSortingState, speed, isPaused) => {
  const arr = [...array]
  const n = arr.length
  
  const partition = async (low, high) => {
    const pivot = arr[high]
    let i = low - 1
    
    for (let j = low; j < high; j++) {
      checkPaused(isPaused)
      
      setSortingState(prev => ({ ...prev, comparing: [j, high] }))
      await sleep(speed)
      
      if (arr[j] < pivot) {
        i++
        
        if (i !== j) {
          setSortingState(prev => ({ ...prev, swapped: [i, j] }))
          await sleep(speed)
          
          const temp = arr[i]
          arr[i] = arr[j]
          arr[j] = temp
          setArray([...arr])
          
          await sleep(speed)
        }
      }
    }
    
    if (i + 1 !== high) {
      setSortingState(prev => ({ ...prev, swapped: [i + 1, high] }))
      await sleep(speed)
      
      const temp = arr[i + 1]
      arr[i + 1] = arr[high]
      arr[high] = temp
      setArray([...arr])
      
      await sleep(speed)
    }
    
    return i + 1
  }
  
  const quickSortHelper = async (low, high) => {
    if (low < high) {
      const pi = await partition(low, high)
      
      await quickSortHelper(low, pi - 1)
      await quickSortHelper(pi + 1, high)
      
      setSortingState(prev => ({ 
        ...prev, 
        sorted: [...prev.sorted, pi],
        comparing: [],
        swapped: []
      }))
    } else if (low === high) {
      setSortingState(prev => ({ 
        ...prev, 
        sorted: [...prev.sorted, low],
        comparing: [],
        swapped: []
      }))
    }
  }
  
  await quickSortHelper(0, n - 1)
}

// Algorithm definitions with metadata
export const algorithms = {
  bubble: {
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    sort: bubbleSort,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true
  },
  
  selection: {
    name: 'Selection Sort',
    description: 'An in-place comparison sorting algorithm that divides the input list into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region.',
    sort: selectionSort,
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false
  },
  
  insertion: {
    name: 'Insertion Sort',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.',
    sort: insertionSort,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true
  },
  
  merge: {
    name: 'Merge Sort',
    description: 'A divide-and-conquer algorithm that recursively breaks down a problem into two or more sub-problems until they become simple enough to solve directly.',
    sort: mergeSort,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stable: true
  },
  
  quick: {
    name: 'Quick Sort',
    description: 'A highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy to sort elements.',
    sort: quickSort,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    stable: false
  }
}

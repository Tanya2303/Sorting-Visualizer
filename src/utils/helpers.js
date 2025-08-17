// Generate a random array of given size
export const generateRandomArray = (size) => {
  const array = []
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100) + 1) // Random numbers from 1 to 100
  }
  return array
}

// Sleep function for animations
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}



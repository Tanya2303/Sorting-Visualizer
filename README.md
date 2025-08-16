# Sorting Visualizer

A mobile-responsive web application built with React and Tailwind CSS that visualizes various sorting algorithms in real-time.

## Features

### 🎯 Core Functionality
- **Algorithm Selection**: Choose between Bubble Sort, Selection Sort, and Insertion Sort
- **Array Size Control**: Adjustable slider (5-50 elements) to control the number of bars
- **Sorting Speed Control**: Three speed options (Slow, Medium, Fast)
- **Random Array Generator**: Generate new random arrays with the click of a button

### 🎮 Controls
- **Play/Pause/Reset**: Full control over the sorting animation
- **Manual Input**: Enter custom arrays as comma-separated values
- **Real-time Visualization**: Watch the sorting process step by step

### 🎨 Visual Elements
- **Animated Bar Chart**: Vertical bars representing array values
- **Color Coding**: 
  - 🔵 Blue: Initial/Unsorted bars
  - 🟡 Yellow: Currently comparing bars
  - 🔴 Red: Bars being swapped
  - 🟢 Green: Sorted bars
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 📊 Algorithm Information
- **Time Complexity**: Best, Average, and Worst case scenarios
- **Space Complexity**: Memory usage information
- **Stability**: Whether the algorithm maintains relative order of equal elements
- **Description**: Brief explanation of how each algorithm works

### 🌓 Theme Support
- **Dark/Light Mode Toggle**: Switch between themes with a floating button
- **Smooth Transitions**: Elegant color transitions between themes

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

### Building for Production
```bash
npm run build
```

## Usage

1. **Select an Algorithm**: Choose from the dropdown menu
2. **Adjust Array Size**: Use the slider to set the number of elements
3. **Set Speed**: Choose your preferred animation speed
4. **Generate Array**: Click "Randomize" for a new random array or enter custom values
5. **Start Sorting**: Click "Sort" or "Play" to begin the visualization
6. **Control Animation**: Use Pause/Resume and Reset buttons as needed
7. **Switch Themes**: Click the sun/moon button to toggle between light and dark modes

## Technical Details

- **Frontend**: React 19 with functional components and hooks
- **Styling**: Tailwind CSS for responsive design
- **Build Tool**: Vite for fast development and building
- **State Management**: React useState and useEffect hooks
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

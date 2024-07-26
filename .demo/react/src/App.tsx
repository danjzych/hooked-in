import { useXY } from '@hooked-in/react';
import './App.css'

function App() {
  const {x, y} = useXY()

  return (
    <p>Cursor position is {x}, {y}.</p>
  )
}

export default App

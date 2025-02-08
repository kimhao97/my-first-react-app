import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked]); // Chỉ chạy khi hasLiked thay đổi

  return (
    <div className='card' onClick={() => setCount(count + 1)}>
      <h2>{title} <br/> {count || null} </h2>
      
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "🩷" : "🤍"}
      </button>
    </div>
  )
}
function App() {
  return newFunction()

  function newFunction() {
    return <div className='card-container'>
      <h2>Card</h2>
      <Card title="Box A" />
      <Card title="Box B" />
      <Card title="Box C" />
    </div>
  }
}

export default App

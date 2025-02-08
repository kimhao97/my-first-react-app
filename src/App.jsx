import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked]); // Chỉ chạy khi hasLiked thay đổi

  return (
    <div className='card'>
      <h2>{title}</h2>
      
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
      <Card title="Component 1" />
      <Card title="Component 2" />
      <Card title="Component 3" />
    </div>
  }
}

export default App

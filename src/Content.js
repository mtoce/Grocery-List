import { useState } from 'react'

const Content = () => {
    const [name, setName] = useState('Mike')
    const [count, setCount] = useState(0)
    const handleNameChange = () => {
        const names = ['Bob', 'Kevin', 'Mike']
        const int = Math.floor(Math.random() * names.length)
        setName(names[int]);
    }

    const handleClick = () => {
        setCount(count + 1)
        console.log(`Count ${count}`)
    }

    const handleClick2 = (name) => {
        console.log(`${name} was clicked`)
    }

  return (
    <main>
        <p onDoubleClick={handleClick}>
            Hello {name}!
        </p>
        <button onClick={handleNameChange}>
            Change Name
        </button>
        <button onClick={handleClick}>
            Click it!
        </button>
        <button onClick={handleClick2}>
            Click it
        </button>
    </main>
  )
}

export default Content
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react'

function App() {
  const itemsArray = [
    {
        id: 1,
        checked: false,
        item: "One half pound bag of Cocoa Covered Almonds Unsalted",
    },
    {
        id: 2,
        checked: false,
        item: "Item 2",
    },
    {
        id: 3,
        checked: false,
        item: "Item 3",
    }
  ]
  const [items, setItems] = useState(itemsArray)

  const handleCheck = (id) => {
    // Recreate the list of items from default state by checking if an item is checked by the user. Swap the checked status if it is checked and return the same item if it is not checked.
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems)
    // Save the state of the item list to local storage for use later (instead of going back to default state).
    localStorage.setItem('shoppinglist', JSON.stringify(listItems))
  }

  const handleDelete = (id) => {
    // console.log(id)
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)
    localStorage.setItem('shoppinglist', JSON.stringify(listItems))
  }

  return (
    <div className="App">
      <Header title="Grocery List"/>
      <Content 
        items={items}
        setItems={setItems}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import { useState, useEffect } from 'react';

function App() {

  const API_URL = 'http://localhost:3500/items'
  const shoppingList = JSON.parse(localStorage.getItem('shoppinglist'))
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('Did not receive expected data')
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      fetchItems()
    }, 2000)
    // (async () => await fetchItems())() // used for an async function with a return value (not needed here)
    // [] means useEffect will only operate at load time. Whatever is inside the brackets determines when useEffect will run. If we put our items array in, it would run every time the items array changed. (Which we don't want in this case since we're using useEffect to load out initial array. That could cause an infinite loop.)
  }, [])

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem]
    setItems(listItems);
  }

  const handleCheck = (id) => {
    // Recreate the list of items from default state by checking if an item is checked by the user. Swap the checked status if it is checked and return the same item if it is not checked.
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (!e.target.value) return;
  //   const listItems = items.filter((item) => item.item.contains(e.target.value))
  //   setItems(listItems);
  // }

  const handleDelete = (id) => {
    // console.log(id)
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems);
  }

  return (
    <div className="App">
      <Header title="Grocery List"/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <main>
        { isLoading && <p style={{ color: "mediumblue", paddingTop: "1rem" }}>Loading Items...</p> }
        { fetchError && <p style={{ color: "red", paddingTop: "1rem" }}>{`Error: ${fetchError}`}</p> }
        {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;

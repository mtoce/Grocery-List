import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const Content = () => {
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
    <main>
        {/* If there are items in the list (if it has a length not equal to 0), Show the list of items */}
        { items.length ? (
            <ul>
                {items.map((item) => (
                    <li className='item' key={item.id}>
                        <input
                            type="checkbox"
                            onChange={() => handleCheck(item.id)}
                            checked={item.checked}
                        />
                        <label
                            onDoubleClick={() => handleCheck(item.id)}
                            // If the item is checked, cross out the label.
                            style={(item.checked) ? { textDecoration:'line-through' } : null }
                        >{item.item}</label>
                        <FaTrashAlt
                            onClick={() => handleDelete(item.id)}
                            role="button"
                            tabIndex="0"
                        />
                    </li>
                ))}
            </ul>
            // If the list is empty, show the following message
        ) : (
            <p
                style={{ marginTop: '2rem' }}
            >There are no items in the shopping list.</p>
        )}
    </main>
  )
}

export default Content
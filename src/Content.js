import ItemList from './ItemList'

const Content = ({ items, handleCheck, handleDelete }) => {


  return (
    <>
        {/* If there are items in the list (if it has a length not equal to 0), Show the list of items */}
        { items.length ? (
            <ItemList 
                items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
            // If the list is empty, show the following message
        ) : (
            <p
                style={{ marginTop: '2rem' }}
            >There are no items in the shopping list.</p>
        )}
    </>
  )
}

export default Content
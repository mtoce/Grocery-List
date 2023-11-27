import React from 'react'

const Footer = ({ length }) => {
  return (
    <footer>
        <p>There are {length} { length === 1 ? 'item' : 'items'} in the list.</p>
    </footer>
  )
}

export default Footer
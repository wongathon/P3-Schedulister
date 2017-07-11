import React from 'react'

// This is a stateless functional component - no states just props
// 'this' keyword will not be available so just need 'props'
// also render() method is not necessary to display UI
function Home (props) {

    return (
      <div className="background-1">
        <h1>Home Page - TodoHome</h1>
      </div>
    )
  
}

export default Home;
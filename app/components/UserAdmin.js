import React from 'react'

// This is a stateless functional component - no states just props
// 'this' keyword will not be available so just need 'props'
// also render() method is not necessary to display UI
function UserAdmin (props) {

    return (
      <div className="page-header">
        <h2>Edit My Profile</h2>
      </div>
    )
  
}

export default UserAdmin;
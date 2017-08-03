import React from 'react'

// This is a stateless functional component - no states just props
// 'this' keyword will not be available so just need 'props'
// also render() method is not necessary to display UI
function UserAdmin (props) {

    return (
      <div className="page-header">
        <h2>Edit My Profile</h2>
        <hr />
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Username</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-2 col-md-offset-1">   
                  <img className="img-circle"
                   src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=100"
                   alt="User Pic"/>
              </div>
              <div className="col-md-8">
               <table className="table table-user-information">
                  <tbody>
                    <tr>
                      <td>Username:</td>
                      <td>User</td>
                    </tr>
                    <tr>
                      <td>Member since:</td>
                      <td>06/23/2017</td>
                    </tr>
                    <tr>
                      <td>Tasks Completed:</td>
                      <td>38</td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>Female</td>
                    </tr>
                    <tr>
                      <td>Location</td>
                      <td>Arlington, VA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <span className="pull-right">
              <button className="btn btn-sm btn-warning" type="button"
                data-toggle="tooltip"
                data-original-title="Edit this user"><i className="glyphicon glyphicon-edit"></i></button>
              <button className="btn btn-sm btn-danger" type="button"
                data-toggle="tooltip"
                data-original-title="Remove this user"><i className="glyphicon glyphicon-remove"></i></button>
            </span>
          </div>
        </div>
      </div>
    )
  
}

export default UserAdmin;
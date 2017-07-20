import React, { Component }  from "react"
import moment from 'moment'

class AdminPanel extends Component {
    // Getting a filtered array of weekly and active items.

  renderTodos() {

    const todos = this.props.todos;

<<<<<<< HEAD
    return todos.map(item => (
      <div key={item._id} style={styles.lineHeight}>
        <listItem>{item.text} - Scheduled: {item.taskDate ? moment(item.taskDate).format('MMMM Do YYYY') : moment(item.taskCreated).format('MMMM Do YYYY')}
          <button className="btn btn-xs btn-danger pull-right"
            onClick={() => this.props.deleteTodos(item._id)}
            >DELETE</button>
            {" "}
          <button className="btn btn-xs btn-primary pull-right" style={styles.spacing}
            onClick={() => this.props.openModal(item)}>EDIT</button>
        </listItem>
        <hr/>
      </div>
    ));
=======
    if (todos.length > 0) {
      return todos.map(item => (
        <div key={item._id} style={styles.lineHeight}>
          <listItem>{item.text}
            <button className="btn btn-xs btn-danger pull-right"
              onClick={() => this.props.deleteTodos(item._id)}
              >X</button>
              {" "}
            <button className="btn btn-xs btn-primary pull-right"
              onClick={() => this.props.editTask(item)}>EDIT</button>
              &nbsp;&nbsp;
             <p><i>Next occurs: {item.taskDate ? moment(item.taskDate).format('MMMM Do YYYY') : moment(item.taskCreated).format('MMMM Do YYYY')}&nbsp;&nbsp;</i></p>
          </listItem>
          <hr/>
        </div>
      ));
    } else {
      return (
        <p><i>Nothing here yet!</i></p>
      )
    }

>>>>>>> 66b00a4a51d831d5c4b988df053ff0e84b177851
  }
  //this.setState({ todos: activeTodos });
  render() {
    return (
      <div>
        {this.renderTodos()}
      </div>
    )
  }
};
const styles = {
  spacing: {
    marginRight: 10,
  }
};

export default AdminPanel
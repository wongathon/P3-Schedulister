import React, { Component }  from "react"
import moment from 'moment'

class AdminPanel extends Component {
    // Getting a filtered array of weekly and active items.

  renderTodos() {

    const todos = this.props.todos;

    if (todos.length > 0) {
      return todos.map(item => (
        <div key={item._id} style={styles.lineHeight}>
          <listItem>{item.text}
            <button className="btn btn-xs btn-danger pull-right"
              onClick={() => this.props.deleteTodos(item._id)}
              >X</button>
              {" "}
            <button className="btn btn-xs btn-primary pull-right" style={styles.spacing}
              onClick={() => this.props.openModal(item)}>EDIT</button>
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
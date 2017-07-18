import React, { Component }  from "react"
import moment from 'moment'

class AdminPanel extends Component {
    // Getting a filtered array of weekly and active items.

  renderTodos() {

    const todos = this.props.todos;

    return todos.map(item => (
      <div key={item._id} style={styles.lineHeight}>
        <listItem>{item.text} - Scheduled: {item.taskDate ? moment(item.taskDate).format('MMMM Do YYYY') : moment(item.taskCreated).format('MMMM Do YYYY')}&nbsp;&nbsp;
          <button className="btn btn-xs btn-danger pull-right"
            onClick={() => this.props.deleteTodos(item._id)}
            >X</button>
            {" "}
          <button className="btn btn-xs btn-primary pull-right"
            onClick={() => this.props.editTask(item)}>EDIT</button>
            &nbsp;&nbsp;
        </listItem>
        <hr/>
      </div>
    ));
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
  lineHeight: {
    lineHeight: 2.1,
  }
};

export default AdminPanel
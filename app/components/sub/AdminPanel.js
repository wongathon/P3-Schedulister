import React, { Component }  from "react"
import moment from 'moment'

class AdminPanel extends Component {
    // Getting a filtered array of weekly and active items.

  renderTodos() {

    const todos = this.props.todos;

    return todos.map(item => (
      <div key={item._id} style={styles.lineHeight}>
        <listItem>
          <div className="col-md-10">
            {item.text} - Scheduled: {moment(item.taskDate).format('MMMM Do YYYY')}
          </div>

          <div className="col-md-1">
            <button className="btn btn-xs btn-primary pull-right"
              onClick={() => this.props.editTask(item)}>EDIT
            </button>
          </div>

          <div className="col-md-1">
            <button className="btn btn-xs btn-danger pull-right"
              onClick={() => this.props.deleteTodos(item._id)}
              >DELETE
            </button>
          </div>
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
    lineHeight: 2.5,
  }
};

export default AdminPanel
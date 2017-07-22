import React, { Component }  from "react"
import moment from 'moment'

class AdminPanel extends Component {
    // Getting a filtered array of weekly and active items.

  renderTodos() {

    const todos = this.props.todos;

    if (todos.length > 0) {
      return todos.map(item => (
        <div key={item._id} style={styles.lineHeight}>
          <listItem><div className="col-md-5" style={styles.font}>{item.text}</div>
            <button className="btn btn-xs btn-danger pull-right"
              onClick={() => this.props.deleteTodos(item._id)}
              ><i className="fa fa-trash-o fa-lg"></i>&nbsp;Delete</button>

            <button className="btn btn-xs btn-success pull-right" style={styles.spacing}
              onClick={() => this.props.openModal(item)}><i className="fa fa-pencil fa-lg"></i>&nbsp;Edit</button>
             <p><i><span style={styles.fontColor}>Next occurs:</span> {item.taskDate ? moment(item.taskDate).format('dddd, MMMM Do YYYY') : moment(item.taskCreated).format('MMMM Do YYYY')}&nbsp;&nbsp;</i></p>
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
  },
  font: {
    fontWeight: 'bold',
  },
  fontColor: {
    color: '#BFC3C6',
  }
};

export default AdminPanel
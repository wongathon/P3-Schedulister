import React from "react";

const ScheduleItem = () => (
  <li className="list-group-item">
    <p>{this.props.item.text} -- Due: {this.props.item.nextDate}</p>
  </li>
);

export default ScheduleItem;

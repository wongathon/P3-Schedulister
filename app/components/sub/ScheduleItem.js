import React from "react";

const ScheduleItem = (props) => {

  const { text, taskDate } = props.item;

  return (  
    <li className="list-group-item">
      <p>{text} -- Due: {taskDate}</p>
    </li>
)};

export default ScheduleItem;

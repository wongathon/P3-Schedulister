import React from "react";
import moment from 'moment';

const ScheduleItem = (props) => {

  const { text, taskDate } = props.item;

  return (  
    <li className="list-group-item">
      <p>{text} -- Due: {moment(taskDate).format('MM/DD/YY')}</p>
    </li>
)};

export default ScheduleItem;

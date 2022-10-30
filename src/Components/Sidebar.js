import React from 'react';
import MessageIcon from "../Assets/MessageIcon.svg"

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        <img src={MessageIcon} alt="message-icon" />
        <p>Message</p>
      </div>
    </aside>
  );
};

export default Sidebar;
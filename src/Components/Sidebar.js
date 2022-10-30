import React from 'react';
import BlueMessageIcon from "../Assets/BlueMessageIcon.svg"

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        <img src={BlueMessageIcon} alt="message-icon" />
        <p>Message</p>
      </div>
    </aside>
  );
};

export default Sidebar;
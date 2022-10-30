import React, { memo } from 'react';
import { Handle } from 'reactflow';
import "./DndFlow/DndFlow.css";
import MessageIcon from "../Assets/MessageIcon.svg";
import WhatsApp from "../Assets/WhatsApp.png";

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position="left"
        isConnectable={isConnectable}
      />
      <div className="text-node-container">
        <div className="text-node-header">
          <div>
            <img src={MessageIcon} alt="message-icon" />
            <p>Send Message</p>
          </div>
          <img src={WhatsApp} alt="whats-app" />
        </div>
        <input className="nodrag text-node-input" type="text" onChange={data.onChange} defaultValue={data.text} />
      </div>
      <Handle
        type="source"
        position="right"
        id="source"
        isConnectable={isConnectable}
      />
    </>
  );
});

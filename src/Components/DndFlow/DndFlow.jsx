import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from '../Sidebar';

import '../../index.css';
import InputNode from '../InputNode';
import Navbar from '../Navbar';

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = {
  inputNode: InputNode,
};

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [connectedNodes, setConnectedNodes] = useState([]);
  const [isError, setIsError] = useState(false);

  const onConnect = useCallback((params) => {
    if (!connectedNodes.includes(params.target)) {
      // to track nodes which are connected
      setConnectedNodes([...connectedNodes, params.target]);
    }

    return setEdges((eds) => addEdge(params, eds)), []
  });

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // creating new node setting it's position on drop
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: 'inputNode',
        position,
        data: { onChange: onChange, text: "hello" },
        sourcePosition: 'left',
        targetPosition: 'right',
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onChange = (event) => {
    // updating nodes text on change
    setNodes((nds) =>
      nds.map((node) => {
        const text = event.target.value;
        return {
          ...node,
          data: {
            ...node.data,
            text,
          },
        };
      })
    );
  };

  const handleSave = () => {
    const invalidNodes = nodes.filter(node => {
      if (!connectedNodes.includes(node.id)) return node;
    })

    // if nodes are more than 1 and more than 1 nodes are node target, we'll show error on save 
    if (nodes.length > 1 && invalidNodes.length > 1) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  return (
    <div className="dndflow">
      <Navbar handleSave={handleSave} isError={isError} />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
        >
          <Controls />
        </ReactFlow>
        <Sidebar />
      </div>
    </div>
  );
};

export default DnDFlow;

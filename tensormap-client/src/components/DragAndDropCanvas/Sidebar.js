import React from 'react';

const Sidebar =  () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className='dndnode input-sidebar' onDragStart={(event) => onDragStart(event, 'custominput')} draggable>
        <div>Input Node</div>
      </div>
      <div className='dndnode dense-sidebar' onDragStart={(event) => onDragStart(event, 'customdense')} draggable>
        <div>Dense Node</div>
      </div>
      <div className='dndnode flatten-sidebar' onDragStart={(event) => onDragStart(event, 'customflatten')} draggable>
        <div>Flatten Node</div>
      </div>
    </aside>
  );
};


export default Sidebar;
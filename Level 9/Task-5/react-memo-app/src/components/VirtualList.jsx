import React from 'react';
import { FixedSizeList as List } from 'react-window';
import './VirtualList.css';

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

const Row = ({ index, style }) => (
  <div className="list-item" style={style}>
    {items[index]}
  </div>
);

const VirtualList = () => {
  return (
    <div className="container">
      <h1 className="title">📜 Virtual Scrolling List</h1>
      <List
        height={500}         // Height of the list viewport
        itemCount={items.length} 
        itemSize={35}        // Height of each item
        width={'100%'}       // Width of the list
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualList;

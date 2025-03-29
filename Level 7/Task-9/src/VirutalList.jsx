import React from "react";
import { FixedSizeList as List } from "react-window";
import "./VirtualList.css";

const VirtualList = ({ itemCount }) => {
  const itemHeight = 50; // Height of each item in the list

  const renderItem = ({ index, style }) => (
    <div style={style} className="list-item">
      Item {index + 1}
    </div>
  );

  return (
    <List
      height={500} // Viewport height
      itemCount={itemCount}
      itemSize={itemHeight}
      width="100%"
      className="virtual-list"
    >
      {renderItem}
    </List>
  );
};

export default VirtualList;

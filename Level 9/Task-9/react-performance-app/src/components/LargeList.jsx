import React from 'react';
import { FixedSizeList as List } from 'react-window';

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

const Row = ({ index, style }) => (
  <div style={style} className="list-item">
    {items[index]}
  </div>
);

const LargeList = () => (
  <List
    height={400}
    itemCount={items.length}
    itemSize={35}
    width={'100%'}
  >
    {Row}
  </List>
);

export default LargeList;

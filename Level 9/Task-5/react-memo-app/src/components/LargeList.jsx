import React from 'react';

const LargeList = ({ items }) => {
  console.log('LargeList rendered');

  return (
    <div>
      <h2>Prime Numbers</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(LargeList);

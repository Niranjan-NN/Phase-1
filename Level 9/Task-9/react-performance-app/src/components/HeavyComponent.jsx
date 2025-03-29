import React from 'react';

const HeavyComponent = () => {
  console.log('Heavy Component Loaded!');
  return (
    <div>
      <h1>This is a Heavy Component</h1>
      <p>Loaded only when needed.</p>
    </div>
  );
};

export default React.memo(HeavyComponent);

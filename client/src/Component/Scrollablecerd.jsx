// ScrollableCerd.jsx
import React from 'react';

const ScrollableCerd = ({ content }) => {
  return (
    <div className="scrollable-cerd">
      {/* Assuming 'content' is an object */}
      {Object.entries(content).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  );
};

export default ScrollableCerd;

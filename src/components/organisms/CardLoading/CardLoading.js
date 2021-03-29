import React from 'react';

export default function CardLoading({
  height,
  marginBottom
}) {
  return (
    <div style={{
      width: '100%',
      height: height ? height : '400px',
      backgroundColor: '#e1e1e1',
      borderRadius: '10px',
      marginBottom: marginBottom ? marginBottom : 0
    }} />
  );
}

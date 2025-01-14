import React from 'react';

export default function Product({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div>
      <h1>Product ID: {id}</h1>
    </div>
  );
}


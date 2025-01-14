import React from 'react';

export default function Product({ params }: { params: { id: string } }) {
  const { id } = params; // No need to await params since it's not a Promise

  return (
    <div>Product: {id}</div>
  );
}

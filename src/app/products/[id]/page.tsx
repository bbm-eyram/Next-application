import React from 'react'

export default async function Product({ params }: { params: {id: string } }){
    const { id } = await params;
  return (
    <div>Product: {id}</div>
  )
}
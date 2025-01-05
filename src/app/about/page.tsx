"use client";

import React from 'react'
import { useRouter } from 'next/navigation'

export default function About() {
  const router = useRouter();
  return (
    <div>
      <div>About</div>
      <button onClick={() => router.push("/")} className='bg-blue-500 text-white p-2 rounded-md m-2'>Go Home</button>
    </div>
  )
}

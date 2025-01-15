"use client";

import { useState } from "react";

export const Counter = () => {
    console.log("Counter component");
    const [count, setCount] = useState(0);

    return(
        <button className="bg-gray-900 text-white px-2 py-1 rounded-lg" onClick={() => setCount(count + 1)}>Click {count} times</button>
    );
}
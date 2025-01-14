import { Greet } from "./components/greet";
import { Counter } from "./components/counter";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">

        <Greet />
        <Counter />
      
    </div>
  );
}

"use client";

import Link from "next/link";

//react icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/");
      toast.success("login successful");
    } else if (res?.status === 401) {
      setError("Invalid Credentials");
      setPending(false);
    } else {
      setError("Something went wrong");
    }
  };

  const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/" });
  };
  return (
    <div className="h-full flex items-center justify-center bg-gray-500">
      <div className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white m-5 rounded-lg">
        <div>
          <h1 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in</h1>
          <p className="text-sm text-center text-accent-foreground mb-2">
            Use email or service, to sign in
          </p>
        </div>
        {!!error && (
          <div className="bg-red-200 bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="text-red-700" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <div className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              disabled={pending}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="password"
              disabled={pending}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             disabled={pending}
            >
              continue
            </button>

          </form>

          <hr className="margin: 16px 0; color: white;" />

          <div className="flex my-2 justify-evenly mx-auto items-center">
            <button
              disabled={false}
              onClick={(e) => handleProvider(e, "google")}
              className="bg-slate-300 hover:bg-slate-400 hover:scale-110 p-2 rounded-md w-full flex items-center justify-center m-2"
            >
              <FcGoogle className="size-8 left-2.5 top-2.5" />
            </button>
            <button
              disabled={false}
              onClick={(e) => handleProvider(e, "github")}
              className="bg-slate-300 hover:bg-slate-400 hover:scale-110 p-2 rounded-md w-full flex items-center justify-center"
            >
              <FaGithub className="size-8 left-2.5 top-2.5" />
            </button>
          </div>
          <p className="text-center text-sm mt-2 text-muted-foreground">
            Create new account
            <Link
              className="text-sky-700 ml-4 hover:underline cursor-pointer"
              href="/register"
            >
              Register{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

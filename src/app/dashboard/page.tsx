"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-16">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-gray-400"></div>
      </div>
    );
  }

  if (!session) {
    // Redirect unauthenticated users
    router.push("/not-authorized");
    return null; // Prevent rendering before redirect
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
      {/* Logo or Home Link */}
      <Link href="/" className="text-lg font-semibold text-gray-700">
        MyApp
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
          Dashboard
        </Link>
        <Link href="/profile" className="text-gray-600 hover:text-gray-900">
          Profile
        </Link>
        <Link href="/settings" className="text-gray-600 hover:text-gray-900">
          Settings
        </Link>
      </div>

      {/* User Info and Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{session.user?.name}</span>
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm font-bold">
              {session.user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Dashboard;

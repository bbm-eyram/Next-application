import Link from "next/link";

const NotAuthorized = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">Page Not Authorized</h1>
        <Link
          href="/sign-in"
          className="text-blue-500 hover:underline mt-4"
        >
          Sign In
        </Link>
      </div>
    );
  };
  
  export default NotAuthorized;
  
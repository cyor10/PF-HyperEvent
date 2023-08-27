import Image from "next/image";
import googleLogo from "public/pngwing.com.png";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-md hover:bg-slate-200 "
    >
      <Image src={googleLogo} alt="Google Logo" width={40} height={40} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}

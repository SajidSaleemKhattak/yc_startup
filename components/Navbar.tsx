import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white py-3 px-5 font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo Here" width={120} height={120} />
        </Link>
        <div className="flex justify-between gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">Create</Link>

              {/* Logout button using Server Action */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  className=" hover:cursor-pointer hover:text-pink-500"
                  type="submit"
                >
                  Logout
                </button>
              </form>

              <Link href={`/users/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <>
              {/* Login button using Server Action */}
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button
                  className=" hover:cursor-pointer hover:text-pink-500"
                  type="submit"
                >
                  Log in
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

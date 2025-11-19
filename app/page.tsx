import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black font-sans">
      {/* Navbar */}
      <nav className="flex w-full justify-between items-center px-8 py-4 bg-white dark:bg-zinc-950 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-xl font-bold text-black dark:text-zinc-50">TeamTasks</span>
        </Link>
        <div className="flex gap-6">
          <Link
            href="/signin"
            className="text-base font-medium text-black dark:text-zinc-50 hover:underline"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-base font-medium text-black dark:text-zinc-50 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 sm:px-16 py-32 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
            className="dark:invert"
          />
          <h1 className="text-4xl font-semibold leading-tight text-black dark:text-zinc-50 text-center">
            Welcome to TeamTasks
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-xl">
            Collaborate with your team, manage projects, and track tasks in real time.
          </p>
          <Link href="/dashboard">
            <button className="mt-6 px-8 py-4 rounded-full bg-black text-white font-bold text-xl transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              Get Started
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

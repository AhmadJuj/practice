'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SigninPage() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const router = useRouter()  // ✅ initialize router

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setPending(true)

    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        router.push('/dashboard') // ✅ navigate using Next.js router
      } else {
        const result = await res.json()
        setError(result.error || 'Signin failed')
      }
    } catch (err) {
      setError('Something went wrong')
      console.error(err)
    }

    setPending(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">Sign in to your account</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            name="email"
            required
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <input
            name="password"
            required
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className={`w-full py-3 rounded-xl text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
            ${pending 
              ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}`}
        >
          {pending ? 'Signing in...' : 'Sign In'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <a href="/signup" className="text-purple-600 font-semibold hover:underline">Sign up</a>
        </p>
      </form>
    </div>
  )
}

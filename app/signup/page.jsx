
// app/signup/page.jsx
'use client'
import { useState } from 'react'

export default function SignupPage() {
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setPending(true)

    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      window.location.href = '/signin'
    } else {
      const result = await res.json()
      setError(result.error || 'Signup failed')
    }

    setPending(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 p-4">
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm">Join us today</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <input
            name="name"
            required
            minLength={2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            name="email"
            required
            type="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <input
            name="password"
            required
            type="password"
            minLength={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className={`w-full py-3 rounded-xl text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
            ${pending 
              ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700'}
          `}
        >
          {pending ? 'Signing up...' : 'Sign Up'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <p className="text-center text-sm text-gray-500">
          Already have an account? <a href="/signin" className="text-teal-600 font-semibold hover:underline">Sign in</a>
        </p>
      </form>
    </div>
  )
}
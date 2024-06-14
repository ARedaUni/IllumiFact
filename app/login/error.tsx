'use client' 
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {

    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="text-3xl font-bold text-center text-black mb-8">{error.message}</h2>
      <button
        onClick={() => reset()}
        className="rounded-md py-2 px-4 text-center text-white font-bold shadow-md hover:shadow-lg focus:outline-none bg-gradient-to-r from-blue-500 to-purple-600"
      >
        Try again
      </button>
    </div>
  );
  
}
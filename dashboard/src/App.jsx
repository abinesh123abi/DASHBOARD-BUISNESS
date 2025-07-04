import React, { useState } from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('http://localhost:5000/business-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location }),
    })
    const result = await response.json()
    setData(result)
    setLoading(false)
  }

  const regenerateHeadline = async () => {
    setLoading(true)
    const response = await fetch(
      `http://localhost:5000/regenerate-headline?name=${name}&location=${location}`
    )
    const result = await response.json()
    setData({ ...data, headline: result.headline })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
           Local Business Dashboard
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Business Name"
            className="p-2 border rounded outline-blue-400"
            required
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="p-2 border rounded outline-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {/* Loading */}
        {loading && <p className="text-center mt-4">⏳ Loading...</p>}

        {/* Display Data */}
        {data && !loading && (
          <div className="mt-6 p-4 bg-gray-50 border rounded space-y-2">
            <p className="text-lg font-semibold"> {data.rating} Rating</p>
            <p className="text-sm text-gray-600">{data.reviews} Reviews</p>
            <p className="my-2 italic">"{data.headline}"</p>
            <button
              onClick={regenerateHeadline}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
               Regenerate SEO Headline
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

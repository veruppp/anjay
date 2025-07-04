'use client'
import React, { useState } from 'react'
import axios from 'axios'

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [embedLink, setEmbedLink] = useState('')

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const res = await axios.post('/api/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        )
        setProgress(percent)
      },
    })

    setEmbedLink(`${window.location.origin}/e/${res.data.slug}`)
  }

  return (
    <div className="min-h-screen bg-white text-blue-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">V-Cloud Hosting</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Upload File
      </button>

      {progress > 0 && (
        <div className="w-full max-w-md mt-4">
          <div className="h-4 bg-blue-100 rounded">
            <div
              className="h-4 bg-blue-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center mt-1 text-sm">{progress}%</p>
        </div>
      )}

      {embedLink && (
        <div className="mt-6 text-center">
          <p>Embed Link:</p>
          <input
            className="border px-2 py-1 w-full max-w-md text-sm"
            readOnly
            value={embedLink}
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
        </div>
      )}
    </div>
  )
}

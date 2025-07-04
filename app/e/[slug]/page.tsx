import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

export default async function EmbedPage({ params }: { params: { slug: string } }) {
  const file = await prisma.file.findUnique({ where: { slug: params.slug } })

  if (!file) return notFound()

  const isImage = file.mime.startsWith('image/')
  const isVideo = file.mime.startsWith('video/')
  const isAudio = file.mime.startsWith('audio/')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-blue-900 px-4">
      <h1 className="text-xl font-semibold mb-4">File Preview</h1>

      {isImage && <img src={file.url} alt={file.name} className="max-w-full max-h-[80vh]" />}
      {isVideo && (
        <video controls className="max-w-full max-h-[80vh]">
          <source src={file.url} type={file.mime} />
        </video>
      )}
      {isAudio && (
        <audio controls>
          <source src={file.url} type={file.mime} />
        </audio>
      )}

      <p className="mt-4 text-sm text-gray-600">{file.name}</p>
    </div>
  )
}

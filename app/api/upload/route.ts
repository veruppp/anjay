import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { randomBytes } from 'crypto'
import mime from 'mime'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const file = data.get('file') as File

  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const ext = mime.getExtension(file.type) || 'bin'
  const slug = randomBytes(6).toString('hex')
  const filename = `${slug}.${ext}`
  const uploadPath = path.join(process.cwd(), 'public/uploads', filename)

  await writeFile(uploadPath, buffer)

  await prisma.file.create({
    data: {
      name: file.name,
      slug,
      url: `/uploads/${filename}`,
      mime: file.type
    }
  })

  return NextResponse.json({ slug })
}

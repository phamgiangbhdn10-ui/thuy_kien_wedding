import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const soundsDirectory = path.join(process.cwd(), 'public', 'sounds')
    const files = fs.readdirSync(soundsDirectory)
    
    // Filter only .mp3 files and create song list
    const songs = files
      .filter(file => file.endsWith('.mp3'))
      .map((file, index) => ({
        id: index + 1,
        name: file.replace('.mp3', ''),
        file: `/sounds/${file}`
      }))
    
    return NextResponse.json({ songs })
  } catch (error) {
    console.error('Error reading sounds directory:', error)
    return NextResponse.json(
      { error: 'Failed to read sounds directory' },
      { status: 500 }
    )
  }
}


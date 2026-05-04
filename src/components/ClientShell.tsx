'use client'

import AudioToggle from './AudioToggle'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AudioToggle />
    </>
  )
}

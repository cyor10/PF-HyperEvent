import React from 'react'
import Link from 'next/link'

export default function OrganizeEvents() {
  return (
    <div>
        <h2>Organizar</h2>
        <h3>
        <Link href="/organize-events/create-event">Create Event +</Link>
        </h3>
    </div>
  )
}

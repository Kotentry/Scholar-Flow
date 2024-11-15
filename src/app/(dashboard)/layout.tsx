import { ReactNode } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add Sidebar and Header components here */}
      <main className="ml-64 pt-16">
        {children}
      </main>
    </div>
  )
}

export default function StudentDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">My Classes</h2>
          {/* Add class schedule */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Assignments Due</h2>
          {/* Add assignments list */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">My Performance</h2>
          {/* Add grades overview */}
        </div>
      </div>
    </div>
  )
}

"use client";
import { useState } from "react";

export default function AuthorityDashboard() {
  const [issues, setIssues] = useState([
    { id: 1, title: "Pothole near main road", priority: "High", status: "Pending" },
    { id: 2, title: "Streetlight not working", priority: "Medium", status: "In Progress" },
    { id: 3, title: "Garbage not collected", priority: "Low", status: "Resolved" },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Authority Dashboard</h1>

      {/* Analytics Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Total Issues</h3>
          <p className="text-2xl font-bold">{issues.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">In Progress</h3>
          <p className="text-2xl font-bold">
            {issues.filter((i) => i.status === "In Progress").length}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Resolved</h3>
          <p className="text-2xl font-bold">
            {issues.filter((i) => i.status === "Resolved").length}
          </p>
        </div>
      </div>

      {/* Issue Management */}
      <h2 className="text-xl font-semibold mb-3">Manage Issues</h2>
      <div className="space-y-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{issue.title}</p>
              <p className="text-sm text-gray-500">Priority: {issue.priority}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                issue.status === "Resolved"
                  ? "bg-green-100 text-green-600"
                  : issue.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {issue.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

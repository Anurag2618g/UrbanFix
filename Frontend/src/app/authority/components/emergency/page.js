"use client";

import React from "react";

const EmergencyPage = () => {
  const emergencyIssues = [
    {
      id: 201,
      title: "Major water main break",
      description: "A large water main has burst on Oak Street, causing significant flooding and a loss of water pressure for the surrounding neighborhood. Immediate attention required.",
      status: "Active",
      type: "Public Utilities",
      date: "2023-11-01",
      priority: "Critical",
    },
    {
      id: 202,
      title: "Fallen tree blocking road",
      description: "A large tree has fallen across Elm Avenue due to strong winds, completely blocking traffic. Emergency services are needed to clear the road.",
      status: "Active",
      type: "Roads & Infrastructure",
      date: "2023-11-01",
      priority: "Critical",
    },
    {
      id: 203,
      title: "Power outage in residential area",
      description: "A power outage has affected the entire Northwood residential area. The cause is unknown and requires immediate investigation.",
      status: "Active",
      type: "Public Utilities",
      date: "2023-10-31",
      priority: "High",
    },
    {
      id: 204,
      title: "Structural damage to public bridge",
      description: "Reports of structural cracks on the Old Mill Bridge have been made. The bridge is now closed to traffic and an emergency inspection is needed to assess the safety.",
      status: "Active",
      type: "Public Property",
      date: "2023-10-30",
      priority: "Critical",
    },
    {
      id: 205,
      title: "Gas leak reported",
      description: "A strong smell of gas has been reported near the community garden on Park Lane. The area has been evacuated and emergency responders are on the scene.",
      status: "Active",
      type: "Public Utilities",
      date: "2023-10-30",
      priority: "Critical",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Active":
        return "bg-red-100 text-red-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Emergency Issues</h1>
        <p className="text-lg text-gray-600">
          A list of high-priority, urgent issues requiring immediate attention.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emergencyIssues.map((issue) => (
          <div
            key={issue.id}
            className="p-6 bg-white rounded-xl shadow-md flex flex-col justify-between transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{issue.title}</h3>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(issue.status)}`}
              >
                {issue.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">{issue.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span className="font-medium">Type:</span>
              <span>{issue.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="font-medium">Date Reported:</span>
                <span>{issue.date}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-white px-2 py-1 rounded-full">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${getPriorityColor(issue.priority)} mr-2`}></span>
                  <span className="text-gray-700 font-semibold">{issue.priority} Priority</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EmergencyPage;

"use client";

import React from "react";

const ComplaintsPage = () => {
  const complaints = [
    {
      id: 1,
      title: "Potholes on Main Street",
      description: "Large potholes have formed on Main Street, causing damage to vehicles and posing a risk to cyclists.",
      status: "Pending",
      type: "Roads & Infrastructure",
      date: "2023-10-26",
      priority: "High",
    },
    {
      id: 2,
      title: "Streetlight outage",
      description: "The streetlight at the corner of Oak Avenue and 5th Street has been out for a week, making the area unsafe at night.",
      status: "In Progress",
      type: "Public Utilities",
      date: "2023-10-25",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Overflowing garbage cans",
      description: "The public garbage cans in City Park are overflowing, attracting pests and creating an unpleasant smell.",
      status: "Resolved",
      type: "Waste Management",
      date: "2023-10-24",
      priority: "Low",
    },
    {
      id: 4,
      title: "Graffiti on the community center wall",
      description: "Unsightly graffiti has appeared on the north wall of the community center. Needs to be removed.",
      status: "Pending",
      type: "Public Property",
      date: "2023-10-23",
      priority: "Medium",
    },
    {
      id: 5,
      title: "Broken swing at children's playground",
      description: "One of the swings at the Elm Street playground is broken and needs to be repaired to prevent injury.",
      status: "In Progress",
      type: "Parks & Recreation",
      date: "2023-10-22",
      priority: "High",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      case "Pending":
      default:
        return "bg-red-100 text-red-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Complaints & Issues</h1>
        <p className="text-lg text-gray-600">
          View and manage all civic complaints and their current status.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="p-6 bg-white rounded-xl shadow-md flex flex-col justify-between transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{complaint.title}</h3>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(complaint.status)}`}
              >
                {complaint.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4 flex-grow">{complaint.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <span className="font-medium">Type:</span>
              <span>{complaint.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="font-medium">Reported:</span>
                <span>{complaint.date}</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-white px-2 py-1 rounded-full">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${getPriorityColor(complaint.priority)} mr-2`}></span>
                  <span className="text-gray-700 font-semibold">{complaint.priority} Priority</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ComplaintsPage;

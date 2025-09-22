"use client";

import React from "react";

const ResolvedPage = () => {
  const resolvedIssues = [
    {
      id: 101,
      title: "Potholes on Main Street",
      description: "The large potholes on Main Street were filled and the road has been repaved. The area is now safe for all vehicles.",
      status: "Resolved",
      type: "Roads & Infrastructure",
      date: "2023-10-28",
      priority: "High",
    },
    {
      id: 102,
      title: "Streetlight outage",
      description: "The faulty wiring in the streetlight at Oak Avenue and 5th Street has been fixed. The light is now fully operational.",
      status: "Resolved",
      type: "Public Utilities",
      date: "2023-10-27",
      priority: "Medium",
    },
    {
      id: 103,
      title: "Overflowing garbage cans",
      description: "The public garbage cans in City Park have been emptied and a new waste management schedule has been implemented for this area.",
      status: "Resolved",
      type: "Waste Management",
      date: "2023-10-25",
      priority: "Low",
    },
    {
      id: 104,
      title: "Graffiti on the community center wall",
      description: "The graffiti on the community center wall has been professionally cleaned and removed, restoring the building's appearance.",
      status: "Resolved",
      type: "Public Property",
      date: "2023-10-24",
      priority: "Medium",
    },
    {
      id: 105,
      title: "Broken swing at children's playground",
      description: "A new, sturdy swing has been installed at the Elm Street playground, making the area safe and fun for children again.",
      status: "Resolved",
      type: "Parks & Recreation",
      date: "2023-10-23",
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
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Resolved Issues</h1>
        <p className="text-lg text-gray-600">
          A list of issues that have been successfully resolved by the authorities.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resolvedIssues.map((issue) => (
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
                <span className="font-medium">Date Resolved:</span>
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

export default ResolvedPage;

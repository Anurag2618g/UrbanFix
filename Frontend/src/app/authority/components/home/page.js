"use client";

import React from "react";

const HomePage = () => {
  // Mock data for the dashboard overview
  const stats = [
    { title: "Complaints Raised", count: 125, color: "bg-red-500", icon: "🚨" },
    { title: "Issues Resolved", count: 87, color: "bg-green-500", icon: "✅" },
    { title: "Emergency Issues", count: 12, color: "bg-yellow-500", icon: "⚠️" },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Authority Dashboard</h1>
        <p className="text-lg text-gray-600">
          A centralized platform to manage and monitor civic issues.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-6 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`flex-shrink-0 p-3 rounded-full ${stat.color} text-white`}
              >
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-700">{stat.title}</h3>
                <p className="text-4xl font-bold text-gray-900">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a
            href="/authority/complaints"
            className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
          >
            <h3 className="font-semibold text-blue-700">View All Complaints</h3>
            <p className="text-gray-500">Access the full list of reported issues.</p>
          </a>
          <a
            href="/authority/emergency"
            className="p-4 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors duration-200"
          >
            <h3 className="font-semibold text-red-700">Manage Emergency Issues</h3>
            <p className="text-gray-500">Prioritize and address urgent matters.</p>
          </a>
          <a
            href="/authority/resolved"
            className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors duration-200"
          >
            <h3 className="font-semibold text-green-700">See Resolved Cases</h3>
            <p className="text-gray-500">Review successfully closed issues.</p>
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

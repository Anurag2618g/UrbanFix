"use client";

import React from "react";

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jane Doe",
      role: "Lead Developer",
      bio: "Jane is a passionate software engineer with over 10 years of experience in building scalable web applications. She is dedicated to using technology to solve real-world problems.",
    },
    {
      id: 2,
      name: "John Smith",
      role: "UI/UX Designer",
      bio: "John is an award-winning designer focused on creating intuitive and accessible user interfaces. He believes that great design is the key to effective civic engagement.",
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "Community Liaison",
      bio: "Alice has a background in public administration and is the bridge between the development team and the community. Her goal is to ensure the platform meets the needs of its users.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">About Civic Connect</h1>
        <p className="text-lg text-gray-600">
          Our mission is to empower citizens and authorities by providing a transparent and efficient platform for addressing civic issues.
        </p>
      </div>

      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          Civic Connect was founded with the goal of creating a seamless communication channel between citizens and local authorities. We believe that by making the process of reporting and resolving civic issues more transparent and accessible, we can foster a stronger, more responsive community. Our platform is designed to streamline the flow of information, from the initial report to the final resolution, ensuring every voice is heard.
        </p>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
        <p className="text-gray-600 leading-relaxed">
          Citizens can easily report issues such as potholes, broken streetlights, or sanitation problems through our mobile-friendly interface. Once a complaint is submitted, it is automatically routed to the correct authority. The platform allows both parties to track the issues status in real-time, from pending to resolved. This system minimizes communication delays and ensures accountability.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;

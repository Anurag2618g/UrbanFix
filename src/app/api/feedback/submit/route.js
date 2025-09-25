// pages/api/feedback/submit.js
// OR
// app/api/feedback/submit/route.js (if using App Router)

import fs from 'fs';
import path from 'path';

// For App Router (Next.js 13+)
export async function POST(request) {
  try {
    // Parse the JSON body
    const body = await request.json();
    const { name, email, category, message, rating } = body;

    // Validate required fields
    if (!name || !email || !category || !message || !rating) {
      return Response.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create feedback entry with timestamp
    const timestamp = new Date().toISOString();
    const feedbackEntry = {
      id: Date.now(), // Simple ID generation
      timestamp,
      name,
      email,
      category,
      rating: parseInt(rating),
      message,
      status: 'new'
    };

    // Format the data for text file
    const textEntry = `
=====================================
FEEDBACK ENTRY #${feedbackEntry.id}
=====================================
Date: ${new Date(timestamp).toLocaleString()}
Name: ${name}
Email: ${email}
Category: ${category}
Rating: ${rating}/5 stars
Message:
${message}
Status: ${feedbackEntry.status}
=====================================

`;

    // Define the file path (create feedback directory if it doesn't exist)
    const feedbackDir = path.join(process.cwd(), 'feedback-data');
    const filePath = path.join(feedbackDir, 'feedback-submissions.txt');

    // Create directory if it doesn't exist
    if (!fs.existsSync(feedbackDir)) {
      fs.mkdirSync(feedbackDir, { recursive: true });
    }

    // Append to the text file
    fs.appendFileSync(filePath, textEntry, 'utf8');

    // Also save as JSON for easier parsing if needed
    const jsonFilePath = path.join(feedbackDir, 'feedback-submissions.json');
    let existingData = [];
    
    // Read existing JSON data if file exists
    if (fs.existsSync(jsonFilePath)) {
      try {
        const existingContent = fs.readFileSync(jsonFilePath, 'utf8');
        existingData = JSON.parse(existingContent);
      } catch (error) {
        console.error('Error reading existing JSON data:', error);
        existingData = [];
      }
    }

    // Add new entry
    existingData.push(feedbackEntry);

    // Write updated JSON data
    fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2), 'utf8');

    console.log(`Feedback saved successfully: ${feedbackEntry.id}`);

    return Response.json({
      success: true,
      message: 'Feedback submitted successfully',
      id: feedbackEntry.id
    });

  } catch (error) {
    console.error('Error saving feedback:', error);
    return Response.json(
      { success: false, error: 'Failed to save feedback' },
      { status: 500 }
    );
  }
}

// For Pages Router (Next.js 12 and below)
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, category, message, rating } = req.body;

    // Validate required fields
    if (!name || !email || !category || !message || !rating) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Create feedback entry with timestamp
    const timestamp = new Date().toISOString();
    const feedbackEntry = {
      id: Date.now(), // Simple ID generation
      timestamp,
      name,
      email,
      category,
      rating: parseInt(rating),
      message,
      status: 'new'
    };

    // Format the data for text file
    const textEntry = `
=====================================
FEEDBACK ENTRY #${feedbackEntry.id}
=====================================
Date: ${new Date(timestamp).toLocaleString()}
Name: ${name}
Email: ${email}
Category: ${category}
Rating: ${rating}/5 stars
Message:
${message}
Status: ${feedbackEntry.status}
=====================================

`;

    // Define the file path (create feedback directory if it doesn't exist)
    const feedbackDir = path.join(process.cwd(), 'feedback-data');
    const filePath = path.join(feedbackDir, 'feedback-submissions.txt');

    // Create directory if it doesn't exist
    if (!fs.existsSync(feedbackDir)) {
      fs.mkdirSync(feedbackDir, { recursive: true });
    }

    // Append to the text file
    fs.appendFileSync(filePath, textEntry, 'utf8');

    // Also save as JSON for easier parsing if needed
    const jsonFilePath = path.join(feedbackDir, 'feedback-submissions.json');
    let existingData = [];
    
    // Read existing JSON data if file exists
    if (fs.existsSync(jsonFilePath)) {
      try {
        const existingContent = fs.readFileSync(jsonFilePath, 'utf8');
        existingData = JSON.parse(existingContent);
      } catch (error) {
        console.error('Error reading existing JSON data:', error);
        existingData = [];
      }
    }

    // Add new entry
    existingData.push(feedbackEntry);

    // Write updated JSON data
    fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2), 'utf8');

    console.log(`Feedback saved successfully: ${feedbackEntry.id}`);

    return res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully',
      id: feedbackEntry.id
    });

  } catch (error) {
    console.error('Error saving feedback:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to save feedback'
    });
  }
}
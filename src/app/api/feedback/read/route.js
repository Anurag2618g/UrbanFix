// pages/api/feedback/read.js
// OR
// app/api/feedback/read/route.js (if using App Router)

import fs from 'fs';
import path from 'path';

// For App Router (Next.js 13+)
export async function GET(request) {
  try {
    const feedbackDir = path.join(process.cwd(), 'feedback-data');
    const jsonFilePath = path.join(feedbackDir, 'feedback-submissions.json');

    // Check if file exists
    if (!fs.existsSync(jsonFilePath)) {
      return Response.json({
        success: true,
        data: [],
        message: 'No feedback data found'
      });
    }

    // Read JSON file
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
    const feedbackData = JSON.parse(jsonContent);

    // Calculate statistics
    const totalEntries = feedbackData.length;
    const avgRating = totalEntries > 0 
      ? feedbackData.reduce((sum, entry) => sum + entry.rating, 0) / totalEntries 
      : 0;

    // Count by category
    const categories = {};
    feedbackData.forEach(entry => {
      categories[entry.category] = (categories[entry.category] || 0) + 1;
    });

    // Count by rating
    const ratings = {};
    feedbackData.forEach(entry => {
      ratings[entry.rating] = (ratings[entry.rating] || 0) + 1;
    });

    // Sort by timestamp (newest first)
    const sortedData = feedbackData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return Response.json({
      success: true,
      data: sortedData,
      statistics: {
        totalEntries,
        averageRating: parseFloat(avgRating.toFixed(1)),
        categoryBreakdown: categories,
        ratingBreakdown: ratings
      }
    });

  } catch (error) {
    console.error('Error reading feedback data:', error);
    return Response.json(
      { success: false, error: 'Failed to read feedback data' },
      { status: 500 }
    );
  }
}

// For Pages Router (Next.js 12 and below)
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const feedbackDir = path.join(process.cwd(), 'feedback-data');
    const jsonFilePath = path.join(feedbackDir, 'feedback-submissions.json');

    // Check if file exists
    if (!fs.existsSync(jsonFilePath)) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No feedback data found'
      });
    }

    // Read JSON file
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
    const feedbackData = JSON.parse(jsonContent);

    // Calculate statistics
    const totalEntries = feedbackData.length;
    const avgRating = totalEntries > 0 
      ? feedbackData.reduce((sum, entry) => sum + entry.rating, 0) / totalEntries 
      : 0;

    // Count by category
    const categories = {};
    feedbackData.forEach(entry => {
      categories[entry.category] = (categories[entry.category] || 0) + 1;
    });

    // Count by rating
    const ratings = {};
    feedbackData.forEach(entry => {
      ratings[entry.rating] = (ratings[entry.rating] || 0) + 1;
    });

    // Sort by timestamp (newest first)
    const sortedData = feedbackData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return res.status(200).json({
      success: true,
      data: sortedData,
      statistics: {
        totalEntries,
        averageRating: parseFloat(avgRating.toFixed(1)),
        categoryBreakdown: categories,
        ratingBreakdown: ratings
      }
    });

  } catch (error) {
    console.error('Error reading feedback data:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to read feedback data'
    });
  }
}
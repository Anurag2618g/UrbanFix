import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable Next.js default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Parse form data
    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024, // 50MB max file size
      multiples: true,
    });

    const [fields, files] = await form.parse(req);
    
    // Generate unique issue ID
    const issueId = `ISS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Process uploaded files
    const processedFiles = {
      images: [],
      videos: [],
      audio: null
    };

    // Handle images
    if (files.images) {
      const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
      processedFiles.images = imageFiles.map(file => ({
        filename: file.newFilename,
        originalName: file.originalFilename,
        path: `/uploads/${file.newFilename}`,
        size: file.size
      }));
    }

    // Handle videos
    if (files.videos) {
      const videoFiles = Array.isArray(files.videos) ? files.videos : [files.videos];
      processedFiles.videos = videoFiles.map(file => ({
        filename: file.newFilename,
        originalName: file.originalFilename,
        path: `/uploads/${file.newFilename}`,
        size: file.size
      }));
    }

    // Handle audio
    if (files.audio) {
      const audioFile = Array.isArray(files.audio) ? files.audio[0] : files.audio;
      processedFiles.audio = {
        filename: audioFile.newFilename,
        originalName: audioFile.originalFilename,
        path: `/uploads/${audioFile.newFilename}`,
        size: audioFile.size
      };
    }

    // Create issue record
    const issueData = {
      id: issueId,
      title: fields.issueTitle?.[0] || '',
      category: fields.issueCategory?.[0] || '',
      priority: fields.priority?.[0] || 'medium',
      description: fields.textDescription?.[0] || '',
      reporterName: fields.reporterName?.[0] || '',
      reporterEmail: fields.reporterEmail?.[0] || '',
      files: processedFiles,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real application, you would save this to a database
    // For now, we'll save to a JSON file as an example
    const issuesFile = path.join(process.cwd(), 'data', 'issues.json');
    const issuesDir = path.dirname(issuesFile);
    
    if (!fs.existsSync(issuesDir)) {
      fs.mkdirSync(issuesDir, { recursive: true });
    }

    let issues = [];
    if (fs.existsSync(issuesFile)) {
      const existingData = fs.readFileSync(issuesFile, 'utf8');
      issues = JSON.parse(existingData);
    }

    issues.push(issueData);
    fs.writeFileSync(issuesFile, JSON.stringify(issues, null, 2));

    // Send email notification (in a real app)
    // await sendNotificationEmail(issueData);

    res.status(200).json({
      success: true,
      message: 'Issue submitted successfully',
      issueId: issueId,
      data: issueData
    });

  } catch (error) {
    console.error('Error processing issue submission:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
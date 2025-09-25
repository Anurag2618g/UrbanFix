// scripts/read-feedback.js
// Run with: node scripts/read-feedback.js

const fs = require('fs');
const path = require('path');

function readFeedbackData() {
  const feedbackDir = path.join(process.cwd(), 'feedback-data');
  const txtFilePath = path.join(feedbackDir, 'feedback-submissions.txt');
  const jsonFilePath = path.join(feedbackDir, 'feedback-submissions.json');

  console.log('='.repeat(60));
  console.log('FEEDBACK DATA READER');
  console.log('='.repeat(60));

  // Check if files exist
  if (!fs.existsSync(txtFilePath) && !fs.existsSync(jsonFilePath)) {
    console.log('❌ No feedback data found. Make sure feedback has been submitted.');
    return;
  }

  // Read and display text file content
  if (fs.existsSync(txtFilePath)) {
    console.log('\n📄 TEXT FILE CONTENT:');
    console.log('-'.repeat(40));
    const textContent = fs.readFileSync(txtFilePath, 'utf8');
    console.log(textContent);
  }

  // Read and display JSON file content (parsed)
  if (fs.existsSync(jsonFilePath)) {
    console.log('\n📊 JSON DATA SUMMARY:');
    console.log('-'.repeat(40));
    
    try {
      const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
      const feedbackData = JSON.parse(jsonContent);
      
      console.log(`Total Feedback Entries: ${feedbackData.length}`);
      console.log('\nFeedback Summary:');
      
      feedbackData.forEach((entry, index) => {
        console.log(`\n${index + 1}. Entry #${entry.id}`);
        console.log(`   Date: ${new Date(entry.timestamp).toLocaleString()}`);
        console.log(`   Name: ${entry.name}`);
        console.log(`   Email: ${entry.email}`);
        console.log(`   Category: ${entry.category}`);
        console.log(`   Rating: ${entry.rating}/5 stars`);
        console.log(`   Status: ${entry.status}`);
        console.log(`   Message Preview: ${entry.message.substring(0, 100)}...`);
      });

      // Statistics
      console.log('\n📈 STATISTICS:');
      console.log('-'.repeat(20));
      
      const avgRating = feedbackData.reduce((sum, entry) => sum + entry.rating, 0) / feedbackData.length;
      console.log(`Average Rating: ${avgRating.toFixed(1)}/5`);
      
      const categories = {};
      feedbackData.forEach(entry => {
        categories[entry.category] = (categories[entry.category] || 0) + 1;
      });
      
      console.log('\nFeedback by Category:');
      Object.entries(categories).forEach(([category, count]) => {
        console.log(`  ${category}: ${count} entries`);
      });

    } catch (error) {
      console.error('❌ Error reading JSON data:', error);
    }
  }

  console.log('\n' + '='.repeat(60));
}

// Export and display feedback statistics
function exportFeedbackCSV() {
  const feedbackDir = path.join(process.cwd(), 'feedback-data');
  const jsonFilePath = path.join(feedbackDir, 'feedback-submissions.json');
  const csvFilePath = path.join(feedbackDir, 'feedback-export.csv');

  if (!fs.existsSync(jsonFilePath)) {
    console.log('❌ No JSON data found for CSV export.');
    return;
  }

  try {
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
    const feedbackData = JSON.parse(jsonContent);

    // Create CSV header
    const csvHeader = 'ID,Timestamp,Name,Email,Category,Rating,Status,Message\n';
    
    // Create CSV rows
    const csvRows = feedbackData.map(entry => {
      return [
        entry.id,
        entry.timestamp,
        `"${entry.name}"`,
        entry.email,
        entry.category,
        entry.rating,
        entry.status,
        `"${entry.message.replace(/"/g, '""')}"`
      ].join(',');
    }).join('\n');

    const csvContent = csvHeader + csvRows;
    fs.writeFileSync(csvFilePath, csvContent, 'utf8');

    console.log(`\n✅ CSV export created: ${csvFilePath}`);

  } catch (error) {
    console.error('❌ Error creating CSV export:', error);
  }
}

// Main execution
if (require.main === module) {
  readFeedbackData();
  exportFeedbackCSV();
}

module.exports = { readFeedbackData, exportFeedbackCSV };
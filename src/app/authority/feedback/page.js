// pages/admin/feedback.js
// OR
// app/admin/feedback/page.js (if using App Router)

"use client";
import { useState, useEffect } from "react";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { Search, Download, Eye, Calendar, Star, TrendingUp, Users, MessageSquare, Filter, BarChart3, RefreshCw } from "lucide-react";


import Header from '../components/Header/page';
import Footer from '../components/Footer/page';


// Import the CSS file
import '../../style/FeedbackDashboard.css';

export default function FeedbackDashboardPage() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list');
  const [dateFilter, setDateFilter] = useState('all');
  const router = useRouter();

  // Check if user is authorized (implement your auth logic)
  useEffect(() => {
    // Add your authentication check here
    // if (!isAuthorized()) {
    //   router.push('/login');
    //   return;
    // }
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    
    try {
      const response = await fetch('/api/feedback/read');
      const result = await response.json();
      
      if (result.success) {
        setFeedbackData(result.data);
        setStatistics(result.statistics);
        setError('');
      } else {
        setError(result.error || 'Failed to load feedback data');
      }
    } catch (err) {
      setError('Network error while loading feedback data');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter by date range
  const filterByDate = (data) => {
    if (dateFilter === 'all') return data;
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (dateFilter) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        return data.filter(item => new Date(item.timestamp) >= filterDate);
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        return data.filter(item => new Date(item.timestamp) >= filterDate);
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        return data.filter(item => new Date(item.timestamp) >= filterDate);
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        return data.filter(item => new Date(item.timestamp) >= filterDate);
      default:
        return data;
    }
  };

  // Filter and sort data
  const filteredData = filterByDate(feedbackData).filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesRating = selectedRating === 'all' || item.rating.toString() === selectedRating;
    
    return matchesSearch && matchesCategory && matchesRating;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'highest-rating':
        return b.rating - a.rating;
      case 'lowest-rating':
        return a.rating - b.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const exportToCSV = () => {
    const csvHeader = 'ID,Date,Name,Email,Category,Rating,Status,Message\n';
    const csvRows = filteredData.map(entry => {
      return [
        entry.id,
        new Date(entry.timestamp).toLocaleString(),
        `"${entry.name}"`,
        entry.email,
        entry.category,
        entry.rating,
        entry.status,
        `"${entry.message.replace(/"/g, '""')}"`
      ].join(',');
    }).join('\n');

    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify({
      exportDate: new Date().toISOString(),
      totalEntries: filteredData.length,
      filters: {
        searchTerm,
        category: selectedCategory,
        rating: selectedRating,
        dateFilter,
        sortBy
      },
      data: filteredData
    }, null, 2);
    
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: '#3b82f6',
      bug: '#ef4444',
      feature: '#10b981',
      usability: '#f59e0b',
      performance: '#8b5cf6',
      security: '#f97316',
      accessibility: '#06b6d4',
      other: '#6b7280'
    };
    return colors[category] || colors.other;
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Analytics calculations
  const getAnalytics = () => {
    if (!statistics) return null;
    
    const recentFeedback = feedbackData.filter(item => {
      const itemDate = new Date(item.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return itemDate >= weekAgo;
    });

    return {
      recentCount: recentFeedback.length,
      positiveFeedback: feedbackData.filter(item => item.rating >= 4).length,
      negativeFeedback: feedbackData.filter(item => item.rating <= 2).length,
      mostCommonCategory: Object.entries(statistics.categoryBreakdown)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
    };
  };

  const analytics = getAnalytics();

  if (loading) {
    return (
      <>
        <Head>
          <title>Feedback Dashboard - Loading...</title>
        </Head>
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading feedback data...</p>
        </div>
      </>
    );
  }

  if (error && !feedbackData.length) {
    return (
      <>
        <Head>
          <title>Feedback Dashboard - Error</title>
        </Head>
        <div className="dashboard-error">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={() => fetchFeedbackData()} className="retry-button">
            Try Again
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Feedback Dashboard - {statistics?.totalEntries || 0} Entries</title>
        <meta name="description" content="Monitor and analyze user feedback submissions" />
      </Head>

      {/* Uncomment if you have header/footer components */}
      {/* <Header /> */}

      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <div>
              <h1>📊 Feedback Dashboard</h1>
              <p>Monitor and analyze user feedback</p>
            </div>
            <button 
              onClick={() => fetchFeedbackData(true)} 
              className={`refresh-button ${refreshing ? 'refreshing' : ''}`}
              disabled={refreshing}
            >
              <RefreshCw className="refresh-icon" />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </header>

        {error && (
          <div className="error-banner">
            <p>⚠️ {error}</p>
          </div>
        )}

        {/* Statistics Cards */}
        {statistics && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <MessageSquare />
              </div>
              <div className="stat-content">
                <h3>{statistics.totalEntries}</h3>
                <p>Total Feedback</p>
                <span className="stat-trend">
                  {analytics?.recentCount} this week
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Star />
              </div>
              <div className="stat-content">
                <h3>{statistics.averageRating}/5</h3>
                <p>Average Rating</p>
                <span className="stat-trend">
                  {analytics?.positiveFeedback} positive reviews
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp />
              </div>
              <div className="stat-content">
                <h3>{Object.keys(statistics.categoryBreakdown).length}</h3>
                <p>Categories</p>
                <span className="stat-trend">
                  Most: {analytics?.mostCommonCategory}
                </span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Users />
              </div>
              <div className="stat-content">
                <h3>{filteredData.length}</h3>
                <p>Filtered Results</p>
                <span className="stat-trend">
                  {analytics?.negativeFeedback} need attention
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="dashboard-controls">
          <div className="search-section">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search feedback by name, email, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-group">
              <Calendar className="filter-icon" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            <div className="filter-group">
              <Filter className="filter-icon" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {statistics && Object.keys(statistics.categoryBreakdown).map(category => (
                  <option key={category} value={category}>
                    {category} ({statistics.categoryBreakdown[category]})
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <Star className="filter-icon" />
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div className="filter-group">
              <TrendingUp className="filter-icon" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest-rating">Highest Rating</option>
                <option value="lowest-rating">Lowest Rating</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List View
              </button>
              <button
                className={`view-button ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
              >
                Card View
              </button>
            </div>

            <div className="export-buttons">
              <button onClick={exportToCSV} className="export-button" title="Export as CSV">
                <Download className="button-icon" />
                CSV
              </button>
              <button onClick={exportToJSON} className="export-button json" title="Export as JSON">
                <Download className="button-icon" />
                JSON
              </button>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className={`feedback-list ${viewMode}`}>
          {filteredData.length === 0 ? (
            <div className="no-data">
              <MessageSquare className="no-data-icon" />
              <h3>No feedback found</h3>
              <p>
                {feedbackData.length === 0 
                  ? "No feedback has been submitted yet." 
                  : "No feedback entries match your current filters."
                }
              </p>
              {(searchTerm || selectedCategory !== 'all' || selectedRating !== 'all' || dateFilter !== 'all') && feedbackData.length > 0 && (
                <button 
                  className="clear-filters-button"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedRating('all');
                    setDateFilter('all');
                  }}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            filteredData.map((item) => (
              <div key={item.id} className="feedback-card">
                <div className="feedback-header">
                  <div className="feedback-meta">
                    <h3>{item.name}</h3>
                    <p>{item.email}</p>
                    <div className="time-info">
                      <span className="feedback-date">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                      <span className="time-ago">
                        {getTimeAgo(item.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="feedback-details">
                    <span 
                      className="category-badge" 
                      style={{ backgroundColor: getCategoryColor(item.category) }}
                    >
                      {item.category}
                    </span>
                    <div className="rating">
                      <span className="stars">{getRatingStars(item.rating)}</span>
                      <span className="rating-number">{item.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="feedback-message">
                  <p>{item.message.length > 200 ? `${item.message.substring(0, 200)}...` : item.message}</p>
                </div>
                
                <div className="feedback-actions">
                  <span className={`status-badge status-${item.status}`}>
                    {item.status}
                  </span>
                  <div className="action-buttons">
                    <button 
                      className="view-button"
                      onClick={() => setSelectedFeedback(item)}
                      title="View full details"
                    >
                      <Eye className="button-icon" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results Info */}
        {filteredData.length > 0 && (
          <div className="results-info">
            <p>
              Showing {filteredData.length} of {feedbackData.length} feedback entries
              {searchTerm && ` • Search: "${searchTerm}"`}
              {selectedCategory !== 'all' && ` • Category: ${selectedCategory}`}
              {selectedRating !== 'all' && ` • Rating: ${selectedRating} stars`}
              {dateFilter !== 'all' && ` • Time: ${dateFilter}`}
            </p>
          </div>
        )}

        {/* Modal for detailed view */}
        {selectedFeedback && (
          <div className="modal-overlay" onClick={() => setSelectedFeedback(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Feedback Details #{selectedFeedback.id}</h2>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedFeedback(null)}
                  title="Close details"
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="detail-section">
                  <h4>Basic Information</h4>
                  <div className="detail-row">
                    <strong>ID:</strong> {selectedFeedback.id}
                  </div>
                  <div className="detail-row">
                    <strong>Submitted:</strong> {new Date(selectedFeedback.timestamp).toLocaleString()}
                  </div>
                  <div className="detail-row">
                    <strong>Time Ago:</strong> {getTimeAgo(selectedFeedback.timestamp)}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Contact Details</h4>
                  <div className="detail-row">
                    <strong>Name:</strong> {selectedFeedback.name}
                  </div>
                  <div className="detail-row">
                    <strong>Email:</strong> 
                    <a href={`mailto:${selectedFeedback.email}?subject=Re: Feedback #${selectedFeedback.id}`} className="email-link">
                      {selectedFeedback.email}
                    </a>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Feedback Classification</h4>
                  <div className="detail-row">
                    <strong>Category:</strong> 
                    <span 
                      className="category-badge" 
                      style={{ backgroundColor: getCategoryColor(selectedFeedback.category) }}
                    >
                      {selectedFeedback.category}
                    </span>
                  </div>
                  <div className="detail-row">
                    <strong>Rating:</strong> 
                    <span className="rating">
                      {getRatingStars(selectedFeedback.rating)} ({selectedFeedback.rating}/5)
                    </span>
                  </div>
                  <div className="detail-row">
                    <strong>Status:</strong> 
                    <span className={`status-badge status-${selectedFeedback.status}`}>
                      {selectedFeedback.status}
                    </span>
                  </div>
                </div>

                <div className="detail-message">
                  <strong>Complete Message:</strong>
                  <p>{selectedFeedback.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Uncomment if you have footer component */}
      {/* <Footer /> */}
    </>
  );
}
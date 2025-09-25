// pages/report-issue.js
"use client";

import { useState, useRef, useCallback } from "react";
import Head from 'next/head';
import Footer from '../../public-user/components/Footer/page.js';

import Header from '../../public-user/components/Header/page.js';

import styles from '../../style/ReportIssue.module.css';

function ReportIssue() {
    const [formData, setFormData] = useState({
        issueTitle: '',
        issueCategory: '',
        priority: 'medium',
        textDescription: '',
        reporterName: '',
        reporterEmail: ''
    });

    const [mediaFiles, setMediaFiles] = useState({
        images: [],
        videos: [],
        audioBlob: null
    });

    const [recording, setRecording] = useState({
        isRecording: false,
        mediaRecorder: null,
        audioUrl: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [issueId, setIssueId] = useState('');

    const audioRef = useRef(null);
    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Voice Recording Functions
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const chunks = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);

                setMediaFiles(prev => ({ ...prev, audioBlob }));
                setRecording(prev => ({
                    ...prev,
                    audioUrl,
                    mediaRecorder: null
                }));

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setRecording({
                isRecording: true,
                mediaRecorder,
                audioUrl: null
            });
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Error accessing microphone: ' + error.message);
        }
    };

    const stopRecording = () => {
        if (recording.mediaRecorder && recording.isRecording) {
            recording.mediaRecorder.stop();
            setRecording(prev => ({
                ...prev,
                isRecording: false
            }));
        }
    };

    const playRecording = () => {
        if (audioRef.current && recording.audioUrl) {
            audioRef.current.play();
        }
    };

    // File Upload Functions
    const handleFileUpload = (files, type) => {
        const fileArray = Array.from(files);
        const validFiles = fileArray.filter(file => {
            if (type === 'images') {
                return file.type.startsWith('image/');
            } else if (type === 'videos') {
                return file.type.startsWith('video/');
            }
            return false;
        });

        if (validFiles.length !== fileArray.length) {
            alert(`Some files were filtered out. Only ${type} files are allowed.`);
        }

        setMediaFiles(prev => ({
            ...prev,
            [type]: [...prev[type], ...validFiles]
        }));
    };

    const removeFile = (index, type) => {
        setMediaFiles(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    // Drag and Drop Functions
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.add(styles.dragover);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.remove(styles.dragover);
    }, []);

    const handleDrop = useCallback((e, type) => {
        e.preventDefault();
        e.currentTarget.classList.remove(styles.dragover);
        const files = e.dataTransfer.files;
        handleFileUpload(files, type);
    }, []);

    // Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formDataToSend = new FormData();

            // Add text data
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            // Add files
            mediaFiles.images.forEach((file, index) => {
                formDataToSend.append(`images[${index}]`, file);
            });

            mediaFiles.videos.forEach((file, index) => {
                formDataToSend.append(`videos[${index}]`, file);
            });

            if (mediaFiles.audioBlob) {
                formDataToSend.append('audio', mediaFiles.audioBlob, 'recording.webm');
            }

            // API call
            const response = await fetch('/api/submit', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                const result = await response.json();
                setIssueId(result.issueId || `ISS-${Date.now()}`);
                setSubmitSuccess(true);
            } else {
                throw new Error('Failed to submit issue');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit issue. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setSubmitSuccess(false);
        setFormData({
            issueTitle: '',
            issueCategory: '',
            priority: 'medium',
            textDescription: '',
            reporterName: '',
            reporterEmail: ''
        });
        setMediaFiles({ images: [], videos: [], audioBlob: null });
        setRecording({ isRecording: false, mediaRecorder: null, audioUrl: null });
    };

    if (submitSuccess) {
        return (
            <>
                <Head>
                    <title>Issue Submitted Successfully - CivicConnect</title>
                </Head>

                <Header />

                <div className={styles.container}>
                    <div className={styles.successMessage}>
                        <div className={styles.successIcon}>✅</div>
                        <h1>Issue Reported Successfully!</h1>
                        <p>Your civic issue has been submitted and our team will review it shortly.</p>
                        <p>Issue ID: <span className={styles.issueId}>{issueId}</span></p>
                        <p>You will receive email updates about the progress of your reported issue.</p>
                        <button
                            className={styles.submitBtn}
                            onClick={resetForm}
                        >
                            🆕 Report Another Issue
                        </button>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Report Civic Issue - CivicConnect</title>
                <meta name="description" content="Report civic issues using text, voice, images, and videos" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>🚨 Report a Civic Issue</h1>
                    <p>Help improve your community by reporting civic issues using text, voice, images, or videos</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.issueForm}>
                    {/* Issue Details Section */}
                    <div className={styles.formSection}>
                        <h2>ℹ️ Issue Details</h2>

                        <div className={styles.inputGroup}>
                            <label htmlFor="issueTitle">Issue Title *</label>
                            <input
                                type="text"
                                id="issueTitle"
                                name="issueTitle"
                                value={formData.issueTitle}
                                onChange={handleInputChange}
                                required
                                placeholder="Brief description of the civic issue"
                                className={styles.input} />
                        </div>

                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="issueCategory">Category *</label>
                                <select
                                    id="issueCategory"
                                    name="issueCategory"
                                    value={formData.issueCategory}
                                    onChange={handleInputChange}
                                    required
                                    className={styles.select}
                                >
                                    <option value="">Select Category</option>
                                    <option value="infrastructure">🚧 Infrastructure</option>
                                    <option value="environment">🌳 Environment</option>
                                    <option value="traffic">🚦 Traffic & Transportation</option>
                                    <option value="utilities">💡 Public Utilities</option>
                                    <option value="health">🏥 Public Health</option>
                                    <option value="safety">🔒 Safety & Security</option>
                                    <option value="waste">🗑️ Waste Management</option>
                                    <option value="parks">🌿 Parks & Recreation</option>
                                    <option value="other">📝 Other</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="priority">Priority Level</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleInputChange}
                                    className={styles.select}
                                >
                                    <option value="low">🟢 Low</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="high">🟠 High</option>
                                    <option value="critical">🔴 Critical</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Text Description */}
                    <div className={styles.formSection}>
                        <h2>✏️ Detailed Description</h2>
                        <div className={styles.inputGroup}>
                            <label htmlFor="textDescription">Issue Description</label>
                            <textarea
                                id="textDescription"
                                name="textDescription"
                                value={formData.textDescription}
                                onChange={handleInputChange}
                                rows="6"
                                placeholder="Provide detailed information about the civic issue including location, when it occurred, and how it affects the community..."
                                className={styles.textarea} />
                        </div>
                    </div>

                    {/* Voice Recording */}
                    <div className={styles.formSection}>
                        <h2>🎤 Voice Recording</h2>
                        <p style={{ marginBottom: '1rem', color: '#666' }}>
                            Record a voice message to explain the issue more expressively
                        </p>
                        <div className={styles.voiceRecorder}>
                            <button
                                type="button"
                                onClick={startRecording}
                                disabled={recording.isRecording}
                                className={`${styles.voiceBtn} ${recording.isRecording ? styles.disabled : ''}`}
                            >
                                🎤 Start Recording
                            </button>

                            <button
                                type="button"
                                onClick={stopRecording}
                                disabled={!recording.isRecording}
                                className={`${styles.voiceBtn} ${!recording.isRecording ? styles.disabled : ''}`}
                            >
                                ⏹️ Stop Recording
                            </button>

                            <button
                                type="button"
                                onClick={playRecording}
                                disabled={!recording.audioUrl}
                                className={`${styles.voiceBtn} ${!recording.audioUrl ? styles.disabled : ''}`}
                            >
                                ▶️ Play Recording
                            </button>

                            {recording.isRecording && (
                                <div className={styles.recordingStatus}>🔴 Recording in progress...</div>
                            )}
                        </div>

                        {recording.audioUrl && (
                            <audio
                                ref={audioRef}
                                src={recording.audioUrl}
                                controls
                                className={styles.audioPlayer} />
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className={styles.formSection}>
                        <h2>🖼️ Photo Evidence</h2>
                        <p style={{ marginBottom: '1rem', color: '#666' }}>
                            Upload photos to provide visual evidence of the issue
                        </p>
                        <div
                            className={styles.uploadArea}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'images')}
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <div className={styles.uploadBox}>
                                <div className={styles.uploadIcon}>📸</div>
                                <p>Drag and drop images here or <span className={styles.uploadLink}>browse files</span></p>
                                <p style={{ fontSize: '0.9rem', color: '#999' }}>Supported: JPG, PNG, GIF (Max 50MB per file)</p>
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e.target.files, 'images')}
                                    style={{ display: 'none' }} />
                            </div>
                        </div>

                        {mediaFiles.images.length > 0 && (
                            <div className={styles.filePreview}>
                                {mediaFiles.images.map((file, index) => (
                                    <div key={index} className={styles.fileItem}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Upload ${index + 1}`}
                                            className={styles.previewImage} />
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index, 'images')}
                                            className={styles.removeBtn}
                                            title="Remove image"
                                        >
                                            ×
                                        </button>
                                        <div className={styles.fileName}>{file.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Video Upload */}
                    <div className={styles.formSection}>
                        <h2>🎥 Video Documentation</h2>
                        <p style={{ marginBottom: '1rem', color: '#666' }}>
                            Upload videos to demonstrate issues that require motion or extended explanation
                        </p>
                        <div
                            className={styles.uploadArea}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, 'videos')}
                            onClick={() => videoInputRef.current?.click()}
                        >
                            <div className={styles.uploadBox}>
                                <div className={styles.uploadIcon}>🎬</div>
                                <p>Drag and drop videos here or <span className={styles.uploadLink}>browse files</span></p>
                                <p style={{ fontSize: '0.9rem', color: '#999' }}>Supported: MP4, MOV, AVI (Max 50MB per file)</p>
                                <input
                                    ref={videoInputRef}
                                    type="file"
                                    multiple
                                    accept="video/*"
                                    onChange={(e) => handleFileUpload(e.target.files, 'videos')}
                                    style={{ display: 'none' }} />
                            </div>
                        </div>

                        {mediaFiles.videos.length > 0 && (
                            <div className={styles.filePreview}>
                                {mediaFiles.videos.map((file, index) => (
                                    <div key={index} className={styles.fileItem}>
                                        <video
                                            src={URL.createObjectURL(file)}
                                            controls
                                            className={styles.previewVideo} />
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index, 'videos')}
                                            className={styles.removeBtn}
                                            title="Remove video"
                                        >
                                            ×
                                        </button>
                                        <div className={styles.fileName}>{file.name}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className={styles.formSection}>
                        <h2>👤 Contact Information</h2>
                        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                            Provide your contact details so we can follow up on your report
                        </p>
                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="reporterName">Your Name</label>
                                <input
                                    type="text"
                                    id="reporterName"
                                    name="reporterName"
                                    value={formData.reporterName}
                                    onChange={handleInputChange}
                                    placeholder="Full Name"
                                    className={styles.input} />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="reporterEmail">Email Address *</label>
                                <input
                                    type="email"
                                    id="reporterEmail"
                                    name="reporterEmail"
                                    value={formData.reporterEmail}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="your@email.com"
                                    className={styles.input} />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className={styles.submitSection}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${styles.submitBtn} ${isSubmitting ? styles.loading : ''}`}
                        >
                            {isSubmitting ? '📤 Submitting Issue...' : '📨 Submit Civic Issue Report'}
                        </button>
                        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
                            By submitting this report, you agree to our terms of service and privacy policy.
                            We will use your information solely for addressing this civic issue.
                        </p>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default ReportIssue;
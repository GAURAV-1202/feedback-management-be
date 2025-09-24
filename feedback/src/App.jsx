import React, { useState } from 'react';
import FeedbackManagementSystem from './components/FeedbackManagementSystem';
import FeedbackSubmissionForm from './components/FeedbackSubmissionForm';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('management'); // 'management' or 'submit'
  const [feedbacks, setFeedbacks] = useState([]);

  const handleFeedbackSubmit = (newFeedback) => {
    setFeedbacks(prev => [...prev, newFeedback]);
    console.log('New feedback submitted:', newFeedback);
  };

  const switchToSubmissionForm = () => {
    setCurrentView('submit');
  };

  const switchToManagement = () => {
    setCurrentView('management');
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Feedback System</h1>
            <div className="flex gap-4">
              <button
                onClick={switchToManagement}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'management'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Manage Feedback
              </button>
              <button
                onClick={switchToSubmissionForm}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === 'submit'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-6">
        {currentView === 'management' ? (
          <FeedbackManagementSystem />
        ) : (
          <FeedbackSubmissionForm 
            onSubmit={handleFeedbackSubmit}
            onClose={() => setCurrentView('management')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
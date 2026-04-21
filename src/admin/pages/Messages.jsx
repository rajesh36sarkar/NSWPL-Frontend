import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/common/Loader";
import "../styles/messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubject, setReplySubject] = useState("");
  const [replying, setReplying] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const API_URL = "http://localhost:5000/api/contact";
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");
      
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log("📬 API Response:", res.data);
      
      // Handle different response structures
      let messagesList = [];
      
      if (res.data?.data?.contacts) {
        messagesList = res.data.data.contacts;
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        messagesList = res.data.data;
      } else if (res.data?.contacts) {
        messagesList = res.data.contacts;
      } else if (Array.isArray(res.data)) {
        messagesList = res.data;
      }
      
      console.log("📬 Parsed Messages:", messagesList);
      setMessages(Array.isArray(messagesList) ? messagesList : []);
    } catch (err) {
      console.error("❌ Failed to load messages:", err);
      setError(err.response?.data?.message || "Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMessage = async (msg) => {
    setSelectedMessage(msg);
    setReplySubject(`Re: ${msg.subject || 'Your Inquiry'}`);
    setShowDetail(true);
    
    // Mark as read if not already
    if (!msg.read) {
      try {
        await axios.patch(`${API_URL}/${msg._id}/read`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Update local state
        setMessages(prev => prev.map(m => 
          m._id === msg._id ? { ...m, read: true } : m
        ));
      } catch (err) {
        console.error("Failed to mark as read:", err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    
    try {
      setDeleting(true);
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Remove from local state
      setMessages(prev => prev.filter(m => m._id !== id));
      
      if (selectedMessage?._id === id) {
        setSelectedMessage(null);
        setShowDetail(false);
      }
      
      alert("✅ Message deleted successfully!");
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("❌ Failed to delete message: " + (err.response?.data?.message || err.message));
    } finally {
      setDeleting(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      alert("Please enter a reply message");
      return;
    }
    
    try {
      setReplying(true);
      
      await axios.post(`${API_URL}/${selectedMessage._id}/reply`, {
        subject: replySubject,
        message: replyText
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("✅ Reply sent successfully!");
      setReplyText("");
      setReplySubject(`Re: ${selectedMessage.subject || 'Your Inquiry'}`);
      
      // Update local state to mark as replied
      setMessages(prev => prev.map(m => 
        m._id === selectedMessage._id ? { ...m, replied: true } : m
      ));
    } catch (err) {
      console.error("Failed to send reply:", err);
      alert("❌ Failed to send reply: " + (err.response?.data?.message || err.message));
    } finally {
      setReplying(false);
    }
  };

  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedMessage(null);
    setReplyText("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader type="gradient" size="large" text="Loading messages..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button onClick={loadMessages} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <div className="messages-header-bar">
        <h3>📬 Contact Messages</h3>
        <span className="message-count">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
          {messages.filter(m => !m.read).length > 0 && (
            <span className="unread-count">
              • {messages.filter(m => !m.read).length} unread
            </span>
          )}
        </span>
      </div>

      <div className="messages-container">
        {/* Messages List */}
        <div className={`messages-list ${showDetail ? 'hide-on-mobile' : ''}`}>
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="icon">💬</div>
              <h3>No Messages Yet</h3>
              <p>Customer messages will appear here when someone contacts you.</p>
            </div>
          ) : (
            <div className="messages-scroll">
              {messages
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((msg) => (
                <div
                  key={msg._id}
                  className={`message-item ${!msg.read ? "unread" : ""} ${selectedMessage?._id === msg._id ? "selected" : ""}`}
                  onClick={() => handleSelectMessage(msg)}
                >
                  <div className="message-header">
                    <span className="message-name">{msg.name}</span>
                    <span className="message-date">{formatDate(msg.createdAt)}</span>
                  </div>
                  <div className="message-email">{msg.email}</div>
                  <div className="message-subject">{msg.subject || "No Subject"}</div>
                  <div className="message-preview">{msg.message?.slice(0, 80)}...</div>
                  <div className="message-badges">
                    {!msg.read && <span className="unread-badge">New</span>}
                    {msg.replied && <span className="replied-badge">✓ Replied</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className={`message-detail ${showDetail ? 'show-on-mobile' : ''}`}>
          {selectedMessage ? (
            <>
              <div className="detail-header">
                <button className="mobile-back-btn" onClick={handleBackToList}>
                  ← Back
                </button>
                <button className="mobile-close-btn" onClick={handleBackToList}>×</button>
                <h3>Message Details</h3>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(selectedMessage._id)}
                  disabled={deleting}
                >
                  {deleting ? "..." : "🗑️ Delete"}
                </button>
              </div>

              <div className="detail-content">
                <div className="detail-field">
                  <label>📧 From</label>
                  <p className="detail-name">{selectedMessage.name}</p>
                  <p className="detail-email">
                    <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
                  </p>
                  {selectedMessage.phone && (
                    <p className="detail-phone">
                      <a href={`tel:${selectedMessage.phone}`}>{selectedMessage.phone}</a>
                    </p>
                  )}
                </div>

                <div className="detail-field">
                  <label>📌 Subject</label>
                  <p className="detail-subject">{selectedMessage.subject || "No Subject"}</p>
                </div>

                <div className="detail-field">
                  <label>💬 Message</label>
                  <p className="detail-message">{selectedMessage.message}</p>
                </div>

                <div className="detail-field">
                  <label>🕐 Received</label>
                  <p className="detail-date">{formatDate(selectedMessage.createdAt)}</p>
                </div>

                {/* Reply Section */}
                <div className="reply-section">
                  <h4>📤 Send Reply</h4>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={replySubject}
                    onChange={(e) => setReplySubject(e.target.value)}
                    className="reply-subject"
                  />
                  <textarea
                    placeholder="Type your reply here..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={5}
                    className="reply-textarea"
                  />
                  <button 
                    className="reply-btn"
                    onClick={handleSendReply}
                    disabled={replying || !replyText.trim()}
                  >
                    {replying ? "⏳ Sending..." : "📧 Send Reply"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <div className="icon">👆</div>
              <p>Select a message from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
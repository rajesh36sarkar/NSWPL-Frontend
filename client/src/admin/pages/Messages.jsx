import { useEffect, useState } from "react";
import { fetchMessages } from "../api/adminApi";
import Loader from "../../components/common/Loader";
import "../styles/messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const res = await fetchMessages();
      setMessages(res?.data?.data || []);
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    setShowDetail(true);
  };

  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedMessage(null);
  };

  if (loading) {
    return <Loader type="gradient" size="large" text="Loading messages..." />;
  }

  return (
    <div className="messages-page">
      {/* Mobile Back Button */}
      {showDetail && (
        <button className="mobile-back-btn" onClick={handleBackToList}>
          ← Back to Messages
        </button>
      )}

      <div className="messages-container">
        {/* Messages List */}
        <div className={`messages-list ${showDetail ? 'hide-on-mobile' : ''}`}>
          <div className="messages-header">
            <h3>Contact Messages</h3>
            <span className="message-count">{messages.length} total</span>
          </div>

          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="icon">💬</div>
              <h3>No Messages</h3>
              <p>Customer messages will appear here</p>
            </div>
          ) : (
            <div className="messages-scroll">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`message-item ${!msg.read ? "unread" : ""} ${selectedMessage?._id === msg._id ? "selected" : ""}`}
                  onClick={() => handleSelectMessage(msg)}
                >
                  <div className="message-header">
                    <span className="message-name">{msg.name}</span>
                    <span className="message-date">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="message-email">{msg.email}</div>
                  <div className="message-subject">{msg.subject || "No Subject"}</div>
                  <div className="message-preview">
                    {msg.message?.slice(0, 80)}...
                  </div>
                  {!msg.read && <span className="unread-badge">New</span>}
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
                <button className="mobile-close-btn" onClick={handleBackToList}>
                  ×
                </button>
                <h3>Message Details</h3>
              </div>

              <div className="detail-content">
                <div className="detail-field">
                  <label>From</label>
                  <p className="detail-name">{selectedMessage.name}</p>
                  <p className="detail-email">{selectedMessage.email}</p>
                </div>

                <div className="detail-field">
                  <label>Subject</label>
                  <p className="detail-subject">{selectedMessage.subject || "No Subject"}</p>
                </div>

                <div className="detail-field">
                  <label>Message</label>
                  <p className="detail-message">{selectedMessage.message}</p>
                </div>

                <div className="detail-field">
                  <label>Received</label>
                  <p className="detail-date">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="detail-actions">
                  <button className="btn-reply">📧 Reply</button>
                  <button className="btn-archive">📁 Archive</button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <div className="icon">👆</div>
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
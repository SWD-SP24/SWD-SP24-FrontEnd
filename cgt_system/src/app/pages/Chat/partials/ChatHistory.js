import React from "react";
import image from "../../../assets/img/avatars/default-avatar.jpg";

export default function ChatHistory({ currentUser, recipient, messages }) {
  const formatTimestamp = (timestamp) => {
    if (!timestamp?.seconds) return "Unknown time";

    const messageDate = new Date(timestamp.seconds * 1000);
    const now = new Date();

    const isToday = messageDate.toDateString() === now.toDateString();
    const isThisWeek =
      (now - messageDate) / (1000 * 60 * 60 * 24) < 7 &&
      messageDate.getDay() !== now.getDay();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isThisWeek) {
      return messageDate.toLocaleDateString("en-US", {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return messageDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <div className="col app-chat-history d-block" id="app-chat-history">
      <div className="chat-history-wrapper">
        <div className="chat-history-header border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex overflow-hidden align-items-center">
              <i
                className="icon-base bx bx-menu icon-lg cursor-pointer d-lg-none d-block me-4"
                data-bs-toggle="sidebar"
                data-overlay=""
                data-target="#app-chat-contacts"
              ></i>
              <div className="flex-shrink-0 avatar avatar-online">
                <img
                  src={recipient?.avatar || image}
                  alt="Avatar"
                  className="rounded-circle"
                  data-bs-toggle="sidebar"
                  data-overlay=""
                  data-target="#app-chat-sidebar-right"
                />
              </div>
              <div className="chat-contact-info flex-grow-1 ms-4">
                <h6 className="m-0 fw-normal">
                  {recipient?.name || "Unknown"}
                </h6>
              </div>
            </div>
          </div>
        </div>

        {/* Chat History Body */}
        <div className="chat-history-body overflow-auto">
          <ul className="list-unstyled chat-history">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUser.userId;
              return (
                <li
                  key={index}
                  className={`chat-message ${
                    isCurrentUser ? "chat-message-right" : ""
                  }`}
                >
                  <div className="d-flex overflow-hidden">
                    {/* Avatar (Chỉ hiển thị cho tin nhắn bên trái) */}
                    {!isCurrentUser && (
                      <div className="user-avatar flex-shrink-0 me-4">
                        <div className="avatar avatar-sm">
                          <img
                            src={recipient?.avatar || image}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                    )}

                    {/* Tin nhắn */}
                    <div className="chat-message-wrapper flex-grow-1">
                      <div className="chat-message-text">
                        <p className="mb-0">{message.text}</p>
                      </div>
                      <div
                        className={`text-body-secondary mt-1 ${
                          isCurrentUser ? "text-end" : ""
                        }`}
                      >
                        {isCurrentUser && (
                          <i className="icon-base bx bx-check-double icon-16px text-success me-1"></i>
                        )}
                        <small>{formatTimestamp(message.timestamp)}</small>
                      </div>
                    </div>

                    {/* Avatar (Chỉ hiển thị cho tin nhắn bên phải) */}
                    {isCurrentUser && (
                      <div className="user-avatar flex-shrink-0 ms-4">
                        <div className="avatar avatar-sm">
                          <img
                            src={currentUser.avatar || image}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Chat Input */}
        <div className="chat-history-footer shadow-xs">
          <form className="form-send-message d-flex justify-content-between align-items-center">
            <input
              className="form-control message-input border-0 me-4 shadow-none"
              placeholder="Type your message here..."
            />
            <div className="message-actions d-flex align-items-center">
              <span className="btn btn-text-secondary btn-icon rounded-pill cursor-pointer">
                <i className="speech-to-text icon-base bx bx-microphone icon-md text-heading"></i>
              </span>
              <button className="btn btn-primary d-flex send-msg-btn">
                <span className="align-middle d-md-inline-block d-none">
                  Send
                </span>
                <i className="icon-base bx bx-paper-plane icon-sm ms-md-2 ms-0"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

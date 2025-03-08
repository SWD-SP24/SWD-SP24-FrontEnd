import React, { useEffect, useRef, useState } from "react";
import image from "../../../assets/img/avatars/default-avatar.jpg";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import Skeleton from "react-loading-skeleton";

export default function ChatHistory({
  currentUser,
  recipientId,
  recipient,
  messages,
  conversationId,
}) {
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.seconds) return "---";

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

  const sendMessage = async (newMessage) => {
    if (!conversationId) return;

    try {
      await addDoc(
        collection(db, "conversations", conversationId, "messages"),
        {
          senderId: currentUser.userId,
          recipientId: recipientId,
          text: newMessage,
          timestamp: serverTimestamp(),
        }
      );

      // Cập nhật lastMessage, lastSenderId, lastSenderName, lastSenderAvatar trong conversations
      const conversationRef = doc(db, "conversations", conversationId);
      await updateDoc(conversationRef, {
        lastMessage: newMessage,
        lastSenderId: currentUser.userId,
        lastSenderName: currentUser.fullName,
        lastSenderAvatar: currentUser.avatar || "",
        lastTimestamp: serverTimestamp(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage) return;

    sendMessage(newMessage);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

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
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-history-footer shadow-xs">
          <form
            className="form-send-message d-flex justify-content-between align-items-center"
            onSubmit={handleSendMessage}
          >
            <input
              className="form-control message-input border-0 me-4 shadow-none"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
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

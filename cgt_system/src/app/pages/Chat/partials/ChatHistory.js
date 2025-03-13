import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import image from "../../../assets/img/avatars/default-avatar.jpg";
import { motion } from "framer-motion";
import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import addNotification from "../../../util/addNotification";
import API_URLS from "../../../config/apiUrls";
import useApi from "../../../hooks/useApi";
import boy from "../../../assets/img/illustrations/baby-boy-Photoroom.png";
import girl from "../../../assets/img/illustrations/baby-girl-Photoroom.png";
import { Modal } from "bootstrap";
import ChildHealthBook from "../../ChildHealthBook/ChildHealthBook";
import { useNavigate } from "react-router";
import Tippy from "@tippyjs/react";

export default function ChatHistory({
  currentUser,
  recipientId,
  recipient,
  messages,
  conversationId,
}) {
  const [childIdFromMessage, setChildIdFromMessage] = useState(null);
  const [draggingChild, setDraggingChild] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isRecipientOnline, setIsRecipientOnline] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const [childs, setChilds] = useState([]);
  const [lastSeen, setLastSeen] = useState("");
  const [showDropZone, setShowDropZone] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const { response, callApi } = useApi({
    url:
      currentUser?.role === "member"
        ? `${API_URLS.CHILDREN.GET_CHILDREN_LIST}`
        : `${API_URLS.CHILDREN.GET_CHILDREN_LIST}/admin`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, [conversationId]);

  useEffect(() => {
    if (response?.status === "successful") {
      const childs = response.data || [];
      if (childs) {
        setChilds(childs);
      }
    }
  }, [response]);

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

  // Hàm tính thời gian cuối cùng của đoạn hội thoại tới hiện tại
  const timeAgo = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const timeDiff = Date.now() - timestamp.seconds * 1000;
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const sendMessage = async (type, childId, message) => {
    if (!conversationId) return;

    try {
      await addDoc(
        collection(db, "conversations", conversationId, "messages"),
        {
          type: type || "",
          childId: childId || "",
          senderId: currentUser.userId,
          recipientId: recipientId,
          text: message,
          timestamp: serverTimestamp(),
          isRead: false,
        }
      );

      // Cập nhật lastMessage, lastSenderId, lastSenderName, lastSenderAvatar trong conversations
      const conversationRef = doc(db, "conversations", conversationId);

      await updateDoc(conversationRef, {
        [`unreadCounts.${recipientId}`]: increment(1),
        lastMessage: message,
        lastSenderId: currentUser.userId,
        lastSenderName: currentUser.fullName,
        lastSenderAvatar: currentUser.avatar || "",
        lastTimestamp: serverTimestamp(),
      });

      // Nếu recipient offline, thêm thông báo
      if (!isRecipientOnline) {
        await addNotification(
          recipientId,
          currentUser.fullName,
          currentUser.avatar,
          "message",
          "New Message ✉️",
          `You have new message from ${currentUser.fullName}`,
          currentUser.role === "doctor"
            ? `/member/consultations`
            : "/doctor/consultations"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage) return;
    const message = newMessage;
    setNewMessage("");

    sendMessage("text", "", message);
  };

  useEffect(() => {
    if (!recipientId) return;

    const recipientRef = doc(db, "activeUsers", String(recipientId));

    // Lắng nghe trạng thái online của recipient
    const unsubscribe = onSnapshot(recipientRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsRecipientOnline(snapshot.data().isOnline || false);
        setLastSeen(snapshot.data().lastSeen || "");
        setIsRecipientTyping(snapshot.data().isTyping || false);
      } else {
        setIsRecipientOnline(false);
        setLastSeen("");
        setIsRecipientTyping(false);
      }
    });

    return () => unsubscribe();
  }, [recipientId]);

  useEffect(() => {
    if (!conversationId || !recipientId) return;

    const messagesRef = collection(
      db,
      "conversations",
      conversationId,
      "messages"
    );
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      snapshot.forEach((doc) => {
        if (
          doc.data().recipientId === currentUser.userId &&
          !doc.data().isRead
        ) {
          updateDoc(doc.ref, { isRead: true });
        }
      });
    });

    return () => unsubscribe();
  }, [conversationId, recipientId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, isRecipientTyping]);

  const handleDragStart = (e, child) => {
    e.dataTransfer.setData("childId", child.childrenId);

    setDraggingChild(child);
    setShowDropZone(true);
  };

  const handleDropOutside = (e) => {
    e.preventDefault();
    const childId = e.dataTransfer.getData("childId");

    if (draggingChild && String(draggingChild.childrenId) === childId) {
      sendMessage(
        "childData",
        draggingChild.childrenId,
        `Baby ${draggingChild.fullName}'s data was shared`
      );
    }

    const modalElement = document.getElementById("childsModal");
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }

    setDraggingChild(null);
    setShowDropZone(false);
  };

  const handleTyping = () => {
    const currentUserRef = doc(db, "activeUsers", String(currentUser.userId));
    updateDoc(currentUserRef, {
      isTyping: true,
    });

    setTimeout(() => {
      updateDoc(currentUserRef, {
        isTyping: false,
      });
    }, 3000);
  };

  return (
    <div
      className="col app-chat-history d-block"
      id="app-chat-history"
      draggable
    >
      <div className="chat-history-wrapper">
        <div className="chat-history-header border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex overflow-hidden align-items-center justify-content-between ">
              <i
                className="icon-base bx bx-menu icon-lg cursor-pointer d-lg-none d-block me-4"
                data-bs-toggle="sidebar"
                data-overlay=""
                data-target="#app-chat-contacts"
              ></i>
              <div
                className={`flex-shrink-0 avatar ${
                  isRecipientOnline ? "avatar-online" : "avatar-offline"
                }`}
              >
                <img
                  src={recipient?.avatar || image}
                  alt="Avatar"
                  className="rounded-circle border"
                  data-bs-toggle="sidebar"
                  data-overlay=""
                  data-target="#app-chat-sidebar-right"
                />
              </div>
              <div className="chat-contact-info flex-grow-1 ms-4">
                <h6 className="m-0 fw-normal">
                  {recipient?.name || "Unknown"}
                </h6>
                <small class="user-status text-body">
                  {isRecipientOnline
                    ? "Active now"
                    : lastSeen &&
                      timeAgo(lastSeen) &&
                      `Active ${timeAgo(lastSeen)}`}
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Chat History Body */}
        <div className="chat-history-body overflow-auto">
          <div className="d-flex flex-column justify-content-center align-items-center my-4">
            <img
              className="img-fluid rounded-circle border"
              src={recipient?.avatar || image}
              height="80"
              width="80"
              alt="User avatar"
            />
            <div className="user-info text-center mt-3">
              <h6 className="mb-1">{recipient?.name || "Unknown"}</h6>
              <p className="mt-2 fw-bold">
                You are now connected with {recipient?.name || "the user"}
              </p>
            </div>
          </div>
          <ul className="list-unstyled chat-history">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUser.userId;
              const childId = message.childId || "";
              const child = childs.find((c) => c.childrenId === childId);

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
                            className="rounded-circle border"
                          />
                        </div>
                      </div>
                    )}

                    {/* Tin nhắn */}
                    <div className="chat-message-wrapper flex-grow-1 d-flex flex-column align-items-start">
                      {/* Nếu là tin nhắn văn bản */}
                      {message.type === "text" ? (
                        <div className="chat-message-text p-2 rounded bg-light">
                          <p className="mb-0">{message.text}</p>
                        </div>
                      ) : (
                        // Nếu là tin nhắn kiểu childData (card)
                        <div
                          className="card chat-message-card"
                          style={{ maxWidth: "250px" }}
                        >
                          <img
                            className="card-img-top"
                            src={
                              child?.avatar
                                ? child.avatar
                                : child?.gender === "male"
                                ? boy
                                : girl
                            }
                            alt="Card image cap"
                            style={{ height: "auto", objectFit: "cover" }}
                          />
                          <div className="card-body d-flex flex-column text-center">
                            <h5 className="card-title">{child?.fullName}</h5>
                            <button
                              className="btn btn-outline-primary mt-auto"
                              onClick={() =>
                                setChildIdFromMessage(message.childId)
                              }
                              data-bs-toggle="modal"
                              data-bs-target="#childHealthBookModal"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Thời gian gửi tin nhắn */}
                      <div
                        className={`text-body-secondary mt-1 ${
                          isCurrentUser ? "text-end w-100" : ""
                        }`}
                      >
                        {isCurrentUser && (
                          <i
                            className={`icon-base bx bx-check-double icon-16px ${
                              message.isRead ? "text-success" : "text-secondary"
                            } me-1`}
                          ></i>
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
            {isRecipientTyping && (
              <li className="chat-message">
                <div className="d-flex overflow-hidden">
                  <div className="user-avatar flex-shrink-0 me-4">
                    <div className="avatar avatar-sm">
                      <img
                        src={recipient?.avatar || image}
                        alt="Avatar"
                        className="rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="chat-message-wrapper flex-grow-1 d-flex flex-column align-items-start">
                    <div className="chat-message-text p-2 rounded bg-light">
                      <div className="typing-indicator">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )}
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
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
            />
            <div className="message-actions d-flex align-items-center">
              {currentUser.role === "member" && (
                <span
                  class="btn btn-text-primary btn-icon rounded-pill cursor-pointer me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#childsModal"
                >
                  <i class="speech-to-text icon-base bx bx-share-alt icon-md text-heading"></i>
                </span>
              )}
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

      {/* Modal */}
      <div
        className="modal fade"
        id="childsModal"
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
        draggable={true}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="modal-dialog modal-xl modal-simple modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              background: "transparent",
              border: "none",
              boxShadow: "none",
            }}
            draggable
          >
            {/* Hướng dẫn thả */}
            {showDropZone && <div className="drop-zone"></div>}
            <div
              className="modal-body p-4 d-flex flex-wrap gap-3 justify-content-center"
              onDrop={handleDropOutside}
              draggable={true}
            >
              {childs.length > 0 ? (
                childs.map((child) => (
                  <Tippy
                    content="Drag outside to share child's info"
                    placement="top"
                  >
                    <motion.div
                      key={child.childrenId}
                      className="text-center"
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, child)}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        opacity:
                          draggingChild?.childrenId === child.childrenId
                            ? 0.5
                            : 1,
                      }}
                    >
                      <img
                        src={child.gender === "male" ? boy : girl}
                        alt={child.fullName}
                        className="rounded-circle"
                        width="400"
                        height="400"
                      />
                      <p className="mt-2 fw-bold" style={{ fontSize: "30px" }}>
                        {child.fullName}
                      </p>
                    </motion.div>
                  </Tippy>
                ))
              ) : (
                <div className="d-flex flex-column align-items-center text-center">
                  <div
                    className="d-flex flex-column justify-between align-items-center mb-4 p-2"
                    style={{
                      width: "150px",
                      height: "150px",
                      border: "2px dashed #aaa",
                      borderRadius: "20%",
                      justifyContent: "center",
                      cursor: "pointer",
                      background: "transparent",
                      opacity: 0.9,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    onClick={() => {
                      const modalElement =
                        document.getElementById("childsModal");
                      if (modalElement) {
                        const modalInstance = Modal.getInstance(modalElement);
                        if (modalInstance) {
                          modalInstance.hide();
                        }
                      }
                      navigate("/member/children");
                    }}
                  >
                    <span
                      className="mb-3 p-3 d-flex flex-column justify-between align-items-center"
                      style={{ fontSize: "140px", color: "#aaa" }}
                    >
                      +
                    </span>
                  </div>
                  <p
                    className="text-normal fw-bold"
                    style={{ fontSize: "24px" }}
                  >
                    No children added yet. Please add a new child!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ChildHealthBook childId={childIdFromMessage} />
    </div>
  );
}

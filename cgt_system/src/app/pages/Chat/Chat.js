import React, { useEffect, useRef, useState } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
} from "firebase/firestore";
import "./chat.css";
import image from "../../assets/img/avatars/default-avatar.jpg";
import doctor_image from "../../assets/img/illustrations/doctor.png";
import useUser from "../../hooks/useUser";
import Skeleton from "react-loading-skeleton";
export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);

    // Truy vấn tất cả cuộc trò chuyện mà user hiện tại tham gia
    const conversationsRef = collection(db, "conversations");
    const q = query(
      conversationsRef,
      where(
        "participants",
        "array-contains",
        user.userId,
        orderBy("lastTimestamp", "desc")
      )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conversations = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          participants: data.participants,
          [data.participants[0]]: data[data.participants[0]] || {},
          [data.participants[1]]: data[data.participants[1]] || {},
          lastSenderId: data.lastSenderId,
          lastSenderName: data.lastSenderName,
          lastSenderAvatar: data.lastSenderAvatar,
          lastMessage: data.lastMessage || "",
          lastTimestamp: data.lastTimestamp,
        };
      });

      setConversations(conversations);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Hàm tính thời gian cuối cùng của đoạn hội thoại tới hiện tại
  const timeAgo = (timestamp) => {
    if (!timestamp?.seconds) return "Just now";
    const timeDiff = Date.now() - timestamp.seconds * 1000;
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  return (
    <div className="app-chat card overflow-hidden">
      <div className="row g-0">
        {/* Chats */}
        <div
          className="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
          id="app-chat-contacts"
        >
          <div className="sidebar-header px-6 border-bottom d-flex align-items-center">
            <div className="d-flex align-items-center me-6 me-lg-0">
              <div
                className="flex-shrink-0 avatar avatar-online me-4"
                data-bs-toggle="sidebar"
                data-overlay="app-overlay-ex"
                data-target="#app-chat-sidebar-left"
              >
                <img
                  className="user-avatar rounded-circle cursor-pointer"
                  src={user.avatar ? user.avatar : image}
                  alt="Avatar"
                />
              </div>
              <div className="flex-grow-1 input-group input-group-merge rounded-pill">
                <span className="input-group-text" id="basic-addon-search31">
                  <i className="icon-base bx bx-search icon-sm"></i>
                </span>
                <input
                  type="text"
                  className="form-control chat-search-input"
                  placeholder="Search..."
                  aria-label="Search..."
                  aria-describedby="basic-addon-search31"
                />
              </div>
            </div>
          </div>

          <div className="sidebar-body overflow-auto">
            <ul
              className="list-unstyled chat-contact-list py-2 mb-0"
              id="chat-list"
            >
              <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                <h5 className="text-primary mb-0">Chats</h5>
              </li>

              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <li
                    key={index}
                    className="chat-contact-list-item text-center text-muted d-flex flex-column align-items-center"
                  >
                    <a className="d-flex align-items-center">
                      <Skeleton width={38} height={38} borderRadius={100} />
                      <div className="chat-contact-info flex-grow-1 ms-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                            <Skeleton height={10} width={60} />
                          </h6>
                          <small className="chat-contact-list-item-time">
                            <Skeleton height={10} width={40} />
                          </small>
                        </div>
                        <small className="chat-contact-status text-truncate">
                          <Skeleton height={7} />
                        </small>
                      </div>
                    </a>
                  </li>
                ))
              ) : conversations.length === 0 ? (
                // Khi không có cuộc trò chuyện nào
                <li className="chat-contact-list-item text-center text-muted d-flex flex-column align-items-center">
                  <img
                    src={doctor_image}
                    alt="Chat with a doctor"
                    width="200"
                    className="mb-3"
                  />
                  <p className="fw-bold">No messages yet</p>
                  <p className="text-muted text-center">
                    Have questions about your child's health? Chat with a doctor
                    for expert advice and guidance.
                  </p>
                  <button className="btn btn-primary mt-2">
                    Start Consultation
                  </button>
                </li>
              ) : (
                // Danh sách cuộc trò chuyện
                conversations.map((conversation, index) => {
                  const currentUserId = user.userId;
                  const chatPartnerId = conversation.participants.find(
                    (id) => id !== currentUserId
                  );
                  const chatPartner = conversation[chatPartnerId] || {};

                  return (
                    <li
                      key={index}
                      className={`chat-contact-list-item mb-1 ${
                        selectedConversation?.id === conversation?.id
                          ? "active"
                          : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <a className="d-flex align-items-center">
                        <div className="flex-shrink-0 avatar avatar-online">
                          <img
                            src={chatPartner.avatar || image}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div className="chat-contact-info flex-grow-1 ms-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                              {chatPartner.name}
                            </h6>
                            <small className="chat-contact-list-item-time">
                              {timeAgo(conversation.lastTimestamp)}
                            </small>
                          </div>
                          {user.userId === conversation.lastSenderId && (
                            <small className="chat-contact-status text-truncate me-1">
                              You:
                            </small>
                          )}
                          <small className="chat-contact-status text-truncate">
                            {conversation.lastMessage}
                          </small>
                        </div>
                      </a>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import "./chat.css";
import image from "../../assets/img/avatars/default-avatar.jpg";
import doctor_image from "../../assets/img/illustrations/doctor.png";
import useUser from "../../hooks/useUser";
import Skeleton from "react-loading-skeleton";
import DoctorListModal from "../DoctorListModal/DoctorListModal";
import { Outlet, useNavigate } from "react-router";
export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const navigate = useNavigate();
  // Lấy tất cả cuộc trò chuyện của user
  useEffect(() => {
    if (!user) return;

    setIsLoading(true);

    // Truy vấn tất cả cuộc trò chuyện mà user hiện tại tham gia
    const conversationsRef = collection(db, "conversations");
    const q = query(
      conversationsRef,
      where("participants", "array-contains", user.userId),
      orderBy("lastTimestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const conversations = await Promise.all(
        snapshot.docs.map(async (docc) => {
          const data = docc.data();
          const partnerId = data.participants.find((id) => id !== user.userId);

          let isOnline = false;
          let lastSeen = 0;
          let unsubscribePartner = null;

          if (partnerId) {
            try {
              const partnerRef = doc(db, "activeUsers", String(partnerId));

              // Lắng nghe realtime
              unsubscribePartner = onSnapshot(partnerRef, (partnerSnap) => {
                if (partnerSnap.exists()) {
                  isOnline = partnerSnap.data().isOnline || false;
                  lastSeen = partnerSnap.data().lastSeen || 0;
                } else {
                  isOnline = false;
                  lastSeen = 0;
                }

                // Cập nhật danh sách trò chuyện khi trạng thái online thay đổi
                setConversations((prevConversations) =>
                  prevConversations.map((conv) =>
                    conv.id === docc.id
                      ? { ...conv, isPartnerOnline: isOnline }
                      : conv
                  )
                );
              });
            } catch (error) {
              console.error("Error fetching partner status:", error);
            }
          }

          return {
            id: docc.id,
            participants: data.participants,
            [data.participants[0]]: data[data.participants[0]] || {},
            [data.participants[1]]: data[data.participants[1]] || {},
            lastSenderId: data.lastSenderId,
            lastSenderName: data.lastSenderName,
            lastSenderAvatar: data.lastSenderAvatar,
            lastMessage: data.lastMessage || "",
            lastTimestamp: data.lastTimestamp,
            unreadCounts: data.unreadCounts?.[user.userId] || 0,
            isPartnerOnline: isOnline,
            partnerLastSeen: lastSeen,
            unsubscribePartner,
          };
        })
      );

      setConversations(conversations);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Cập nhật trạng thái online khi vào chat
  useEffect(() => {
    if (!user) return;

    const userId = String(user.userId);
    const userRef = doc(db, "activeUsers", userId);

    const setUserOnline = async () => {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // Nếu user đã tồn tại, cập nhật trạng thái online
        await updateDoc(userRef, {
          isOnline: true,
          lastSeen: serverTimestamp(),
        });
      } else {
        // Nếu user chưa tồn tại, tạo mới
        await setDoc(userRef, {
          isOnline: true,
          lastSeen: serverTimestamp(),
        });
      }
    };

    setUserOnline();

    // Cập nhật trạng thái offline khi rời trang
    const handleOffline = async () => {
      await updateDoc(userRef, {
        isOnline: false,
        lastSeen: serverTimestamp(),
      });
    };

    window.addEventListener("beforeunload", handleOffline);

    return () => {
      handleOffline();
      window.removeEventListener("beforeunload", handleOffline);
    };
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

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);

    const recipientId = conversation
      ? conversation.participants.find((id) => id !== user.userId)
      : null;
    const recipient = conversation
      ? conversation[conversation.participants.find((id) => id !== user.userId)]
      : null;

    const conversationId = conversation.id;

    // Đánh dấu tin nhắn đã đọc bằng cách đặt unreadCount = 0
    const conversationRef = doc(db, "conversations", conversationId);

    updateDoc(conversationRef, {
      [`unreadCounts.${user.userId}`]: 0,
    });

    const messagesRef = collection(
      db,
      "conversations",
      conversationId,
      "messages"
    );
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      navigate(`${conversation.id}`, {
        state: {
          currentUser: user,
          recipientId,
          recipient,
          messages: messagesData,
          conversationId,
        },
      });
    });

    return () => unsubscribe();
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
                    {user.role === "doctor"
                      ? "You haven't had any consultations yet. Stay available for patients seeking medical advice."
                      : "Have questions about your child's health? Chat with a doctor for expert advice and guidance."}
                  </p>
                  {user.role !== "doctor" && (
                    <button
                      className="btn btn-primary mt-2"
                      data-bs-toggle="modal"
                      data-bs-target="#doctorListModal"
                    >
                      Start Consultation
                    </button>
                  )}
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
                      onClick={() => selectConversation(conversation)}
                    >
                      <a className="d-flex align-items-center">
                        <div
                          className={`flex-shrink-0 avatar ${
                            conversation.isPartnerOnline
                              ? "avatar-online"
                              : "avatar-offline"
                          }`}
                        >
                          <img
                            src={chatPartner.avatar || image}
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                        <div className="chat-contact-info flex-grow-1 ms-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <h6
                              className={`chat-contact-name text-truncate m-0 ${
                                conversation.unreadCounts > 0 &&
                                conversation.lastSenderId !== user.userId &&
                                conversation?.id !== selectedConversation?.id
                                  ? "fw-bold"
                                  : "fw-normal"
                              }  `}
                            >
                              {chatPartner.name}
                            </h6>
                            <small className="chat-contact-list-item-time">
                              {timeAgo(conversation.lastTimestamp)}
                            </small>
                          </div>
                          <small
                            className={`chat-contact-status text-truncate ${
                              conversation.unreadCounts > 0 &&
                              conversation.lastSenderId !== user.userId &&
                              conversation?.id !== selectedConversation?.id &&
                              "fw-bold"
                            }`}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: "200px",
                              display: "inline-block",
                            }}
                          >
                            {user.userId === conversation.lastSenderId &&
                              "You: "}{" "}
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
          {conversations.length > 0 && user.role !== "doctor" && (
            <div
              className="d-flex justify-content-center align-items-center p-2"
              data-bs-toggle="modal"
              data-bs-target="#doctorListModal"
              style={{
                position: "sticky",
                bottom: 0,
                zIndex: 1000,
              }}
            >
              <button
                className="btn btn-primary shadow-lg d-flex justify-content-center align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#doctorListModal"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "30%",
                  fontSize: "24px",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <i className="bx bx-plus"></i>
              </button>
            </div>
          )}
        </div>
        {/* End Chats */}

        {/* Chat History */}
        {selectedConversation ? (
          <Outlet />
        ) : (
          <div
            class="col app-chat-conversation d-flex align-items-center justify-content-center flex-column"
            id="app-chat-conversation"
          >
            <div class="bg-label-primary p-8 rounded-circle">
              <i class="icon-base bx bx-message-alt-detail icon-48px"></i>
            </div>
            <p class="my-4">Select a contact to start a conversation.</p>
            <button
              class="btn btn-primary app-chat-conversation-btn"
              id="app-chat-conversation-btn"
            >
              Select Contact
            </button>
          </div>
        )}
        {/* End Chat History */}
      </div>
      <DoctorListModal
        user={user}
        conversations={conversations}
        onSelectConversation={selectConversation}
      />
    </div>
  );
}

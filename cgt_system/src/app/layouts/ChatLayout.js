import React from "react";

export default function ChatLayout() {
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
      </div>
    </div>
  );
}

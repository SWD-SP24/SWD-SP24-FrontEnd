import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { db } from "../../config/firebase";
import useUser from "../../hooks/useUser";
import default_avatar from "../../assets/img/avatars/default-avatar.jpg";
import { Dropdown, Tooltip } from "bootstrap";
import "./notifications.css";

export default function Notifications() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);

    const userId = user.userId;

    const messagesRef = collection(
      db,
      "notifications",
      String(userId),
      "messages"
    );

    const q = query(messagesRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setNotifications(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      setIsLoading(false);
    });

    return () => unsub();
  }, [user]);

  // Xử lý khi click vào thông báo
  const handleNotificationClick = async (msg) => {
    if (msg.link) {
      navigate(msg.link);
    }

    const userId = String(user.userId);

    // Đánh dấu đã đọc
    const msgRef = doc(db, "notifications", userId, "messages", msg.id);
    await updateDoc(msgRef, { isRead: true });

    const dropdownEl = document.querySelector(
      ".dropdown-notifications .dropdown-toggle"
    );
    if (dropdownEl) {
      const bsDropdown = Dropdown.getInstance(dropdownEl);
      bsDropdown?.hide();
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      message: "bx bx-envelope",
      alert: "bx bx-error",
      reminder: "bx bx-alarm",
      payment: "bx bx-credit-card",
      order: "bx bx-package",
      promotion: "bx bx-gift",
      system: "bx bx-cog",
      comment: "bx bx-comment",
      like: "bx bx-heart",
      friend_request: "bx bx-user-plus",
      event: "bx bx-calendar-event",
      default: "bx bx-bell",
    };
    return icons[type] || icons["default"];
  };

  // Xóa một thông báo
  const handleDeleteNotification = async (msgId) => {
    const userId = String(user.userId);
    await deleteDoc(doc(db, "notifications", userId, "messages", msgId));
  };

  // Đánh dấu tất cả đã đọc
  const markAllAsRead = async () => {
    if (!user || notifications.length === 0) return;

    const userId = String(user.userId);
    const batch = [];

    notifications.forEach((msg) => {
      if (!msg.isRead) {
        const msgRef = doc(db, "notifications", userId, "messages", msg.id);
        batch.push(updateDoc(msgRef, { isRead: true }));
      }
    });

    await Promise.all(batch);

    // Cập nhật trạng thái UI
    setNotifications((prev) => prev.map((msg) => ({ ...msg, isRead: true })));
  };

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
    <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
      <button
        className="nav-link dropdown-toggle hide-arrow"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <span className="position-relative">
          <i
            className={`icon-base bx bx-bell icon-md ${
              notifications.some((msg) => !msg.isRead) ? "shake-animation" : ""
            }`}
          ></i>
          <span
            className={`badge rounded-pill ${
              notifications.some((msg) => !msg.isRead)
                ? "bg-danger badge-dot badge-notifications"
                : ""
            } border`}
          ></span>
        </span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end p-0">
        <li class="dropdown-menu-header border-bottom">
          <div class="dropdown-header d-flex align-items-center py-3">
            <h6 class="mb-0 me-auto">Notification</h6>
            <div class="d-flex align-items-center h6 mb-0">
              {notifications.filter((msg) => !msg.isRead).length > 0 && (
                <span class="badge bg-label-primary me-2">
                  {notifications.filter((msg) => !msg.isRead).length} New
                </span>
              )}
              <Link
                class="dropdown-notifications-all p-2"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                aria-label="Mark all as read"
                data-bs-original-title="Mark all as read"
                onClick={markAllAsRead}
              >
                <i class="icon-base bx bx-envelope-open text-heading"></i>
              </Link>
            </div>
          </div>
        </li>
        <li class="dropdown-notifications-list scrollable-container ps overflow-auto">
          <ul class="list-group list-group-flush">
            {notifications.length === 0 ? (
              <li className="p-3 text-center">No notifications</li>
            ) : (
              notifications.map((msg) => (
                <li
                  key={msg.id}
                  className={`list-group-item list-group-item-action dropdown-notifications-item ${
                    msg.isRead ? "marked-as-read" : ""
                  }`}
                  onClick={() => handleNotificationClick(msg)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex">
                    {/* Ảnh theo loại thông báo */}
                    <div className="flex-shrink-0 me-3">
                      <div class="avatar">
                        {msg.type === "message" ? (
                          <img
                            src={msg.senderAvatar || default_avatar}
                            alt=""
                            class="rounded-circle"
                          />
                        ) : (
                          <span class="avatar-initial rounded-circle bg-label-success">
                            <i
                              className={`icon-base ${getNotificationIcon(
                                msg.type
                              )}`}
                            ></i>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Nội dung thông báo */}
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">
                        {msg.title || "Thông báo mới"}
                      </h6>
                      <small className="mb-1 d-block text-body">
                        {msg.body}
                      </small>
                      <small className="text-body-secondary">
                        {timeAgo(msg.timestamp)}
                      </small>
                    </div>

                    {/* Action */}
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <Link class="dropdown-notifications-read">
                        <span class="badge badge-dot"></span>
                      </Link>
                      <Link
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(msg.id);
                        }}
                        class="dropdown-notifications-archive"
                      >
                        <span class="icon-base bx bx-x"></span>
                      </Link>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </li>
        {notifications.length > 10 && (
          <li className="border-top">
            <div className="d-grid p-4">
              <Link className="btn btn-primary btn-sm d-flex">
                <small className="align-middle">View all notifications</small>
              </Link>
            </div>
          </li>
        )}
      </ul>
    </li>
  );
}

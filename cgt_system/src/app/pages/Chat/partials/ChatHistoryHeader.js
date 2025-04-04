import React from "react";
import Cookies from "js-cookie";

import image from "../../../assets/img/avatars/default-avatar.jpg";

export default function ChatHistoryHeader({
  recipient,
  recipientId,
  isRecipientOnline,
  lastSeen,
  currentUser,
  conversationId,
}) {
  const permissions = JSON.parse(Cookies.get("permissions") || "[]");
  const hasPermission = permissions.some(
    (p) => p.permissionName === "DOCTOR_CALL"
  );
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

  // Hàm mở cửa sổ mới khi gọi video
  const handleVideoCall = (callType) => {
    const callData = {
      callType: callType,
      recipient,
      recipientId,
      caller: currentUser,
      conversationId,
      currentUser,
    };

    // Lưu dữ liệu vào sessionStorage (chỉ tồn tại trong phiên làm việc)
    sessionStorage.setItem("videoCallData", JSON.stringify(callData));

    const videoCallUrl = `/call`;
    // Kích thước cửa sổ video call
    const width = 900;
    const height = 600;

    // Lấy kích thước màn hình hiển thị (tránh lỗi ESLint)
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      window.screen.availWidth;
    const screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      window.screen.availHeight;

    // Lấy vị trí hiện tại của cửa sổ (nếu có nhiều màn hình)
    const left = (screenWidth - width) / 2 + window.screenX;
    const top = (screenHeight - height) / 2 + window.screenY;

    // Mở cửa sổ trước, sau đó đặt lại vị trí
    const newWindow = window.open(
      videoCallUrl,
      "_blank",
      `width=${width},height=${height},resizable=yes,scrollbars=yes,status=no`
    );

    if (newWindow) {
      // Đợi một chút rồi căn giữa cửa sổ
      setTimeout(() => {
        newWindow.moveTo(left, top);
        newWindow.focus();
      }, 50);
    } else {
      alert("Popup bị chặn! Hãy bật popup trong trình duyệt.");
    }

    // Lắng nghe tin nhắn từ tab con
    window.addEventListener("message", (event) => {
      if (event.data === "closeVideoCall") {
        console.log("Tab con đóng -> Xóa sessionStorage.");
        sessionStorage.clear();
      }
    });

    // Kiểm tra nếu tab con bị đóng mà không gửi tin nhắn
    const interval = setInterval(() => {
      if (newWindow.closed) {
        console.log("Tab con bị đóng (interval check) -> Xóa sessionStorage.");
        sessionStorage.clear();
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
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
            <h6 className="m-0 fw-normal">{recipient?.name || "Unknown"}</h6>
            <small class="user-status text-body">
              {isRecipientOnline
                ? "Active now"
                : lastSeen &&
                  timeAgo(lastSeen) &&
                  `Active ${timeAgo(lastSeen)}`}
            </small>
          </div>
        </div>
        {currentUser?.role === "member" && (
          <div style={{ position: "relative", display: "inline-block" }}>
            {!hasPermission && currentUser?.role === "member" && (
              <div
                data-bs-target={hasPermission ? "" : "#upgradePlanModal"}
                data-bs-toggle={hasPermission ? "" : "modal"}
                className="border rounded"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#696cff",
                  opacity: 0.2,
                  zIndex: 10,
                  cursor: "pointer",
                }}
              ></div>
            )}
            <div className="d-flex align-items-center gap-2 ps-3">
              {!hasPermission && currentUser?.role === "member" && (
                <div class="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">
                  <i className="bx bx-lock" style={{ fontSize: "18px" }}></i>
                </div>
              )}
              <div class="d-flex align-items-center">
                <span
                  class="btn btn-text-secondary text-secondary cursor-pointer d-sm-inline-flex d-none me-1 btn-icon rounded-pill"
                  onClick={() => {
                    if (hasPermission) {
                      handleVideoCall("audio");
                    }
                  }}
                >
                  <i class="icon-base bx bx-phone icon-md"></i>
                </span>
                <span
                  class="btn btn-text-secondary text-secondary cursor-pointer d-sm-inline-flex d-none me-1 btn-icon rounded-pill"
                  onClick={() => {
                    if (hasPermission) {
                      handleVideoCall("video");
                    }
                  }}
                >
                  <i class="icon-base bx bx-video icon-md"></i>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from "react";
import default_avt from "../../assets/img/avatars/default-avatar.jpg";
import { Phone, PhoneOff } from "lucide-react";
import { Modal } from "bootstrap";
import coming_call_tone from "../../assets/audio/coming_call_tone.mp3";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { getCallMessageText } from "../../pages/VideoCall/usecases/videoCallUseCases";
import addMessage from "../../util/addMessage";

export default function CallPopup({
  incomingCall,
  setIncomingCall,
  currentUser,
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (incomingCall) {
      // Phát âm thanh khi có cuộc gọi đến
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((error) => console.error("Lỗi phát âm thanh:", error));
      }
    }

    return () => {
      // Dừng âm thanh khi popup đóng hoặc khi cuộc gọi kết thúc
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [incomingCall]);

  const handleAccept = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const callData = {
      callId: incomingCall?.callId,
      recipient: { name: currentUser.fullName, avatar: currentUser.avatar },
      recipientId: currentUser.userId,
      caller: incomingCall?.caller,
      conversationId: incomingCall?.conversationId,
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

    // Đóng popup trước khi mở cửa sổ
    const modalElement = document.getElementById("callPopup");
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }

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
  };
  const handleReject = async () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (incomingCall?.callId && incomingCall?.conversationId) {
      const callDocRef = doc(
        db,
        "conversations",
        incomingCall?.conversationId,
        "calls",
        incomingCall?.callId
      );
      await updateDoc(callDocRef, {
        status: "declined",
      });

      const message = {
        type: "call",
        senderId: incomingCall?.caller?.userId,
        recipientId: incomingCall?.recipientId,
        text: getCallMessageText("declined", "video"),
        timestamp: serverTimestamp(),
        isRead: false,
        callType: "video", // "audio" hoặc "video"
        callStatus: "declined",
        duration: 0, // thời gian cuộc gọi (giây)
      };

      await addMessage(
        incomingCall?.conversationId,
        incomingCall?.caller,
        incomingCall?.recipientId,
        message
      );

      const modalElement = document.getElementById("callPopup");

      if (modalElement) {
        let modalInstance = Modal.getInstance(modalElement);
        if (modalInstance) {
          setIncomingCall(null);
          modalInstance.hide();
        }
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="callPopup"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
      style={{
        display: "none",
      }}
    >
      <div className="modal-dialog modal-small modal-simple modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-body p-4 d-flex flex-column gap-10">
            <audio ref={audioRef} src={coming_call_tone} loop />
            <div className="user-avatar-section d-flex align-items-center flex-column">
              <img
                className="img-fluid border rounded-circle mb-4"
                src={
                  incomingCall?.caller?.avatar
                    ? incomingCall?.caller?.avatar
                    : default_avt
                }
                height="120"
                width="120"
                alt="User avatar"
              />
              <div className="user-info text-center">
                <h5 className="mb-1">{incomingCall?.caller?.fullName}</h5>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-10">
              <button
                className="btn btn-danger border rounded-circle p-4 me-10"
                onClick={handleReject}
              >
                <PhoneOff size={28} />
              </button>
              <button
                className="btn btn-success border rounded-circle p-4 ms-10"
                onClick={handleAccept}
              >
                <Phone size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

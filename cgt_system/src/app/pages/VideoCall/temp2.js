import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
} from "react-icons/fa";
import { db } from "../../config/firebase";
import styles from "./videoCall.module.scss";
import classNames from "classnames/bind";
import image from "../../assets/img/avatars/default-avatar.jpg";
import addMessage from "../../util/addMessage";
import { getCallMessageText } from "./usecases/videoCallUseCases";
import ringTone from "../../assets/audio/ringTone.mp3";

const cx = classNames.bind(styles);
const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export default function VideoCall() {
  const [callData, setCallData] = useState(null);
  const [callId, setCallId] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [callStartTime, setCallStartTime] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const audioRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    const storedCallData = sessionStorage.getItem("videoCallData");
    if (storedCallData) setCallData(JSON.parse(storedCallData));

    return () => {
      disconnect();
      sessionStorage.removeItem("videoCallData");
    };
  }, []);

  useEffect(() => {
    if (!callData) return;

    const isCaller = callData?.currentUser?.userId === callData?.caller?.userId;
    const isRecipient = callData?.currentUser?.userId === callData?.recipientId;
    if (isCaller) {
      handleStartCall();
    } else if (isRecipient) {
      setCallId(callData?.callId);
      joinCall(callData?.conversationId, callData?.callId);
    }
  }, [callData]);

  // Lắng nghe status cuộc gọi và xử lí riêng từng status
  useEffect(() => {
    if (!callId) return;

    const conversationId = callData?.conversationId;

    const callRef = doc(db, "conversations", conversationId, "calls", callId);

    const unsubscribe = onSnapshot(callRef, (docSnap) => {
      if (docSnap.exists()) {
        const callStatus = docSnap.data().status;
        setCallStatus(callStatus);

        console.log(callStatus);

        switch (callStatus) {
          case "pending":
            if (audioRef.current) {
              audioRef.current
                .play()
                .catch((error) => console.error("Lỗi phát âm thanh:", error));
            }
            break;
          case "ongoing":
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            break;
          case "declined":
            window.close();
            break;
          case "ended":
            window.close();
            break;

          default:
            break;
        }
      }
    });

    return () => unsubscribe();
  }, [callId]);

  // Khởi tạo hoặc reset PeerConnection nếu chưa có hoặc đã bị đóng
  const initializePeerConnection = () => {
    if (
      !peerConnection.current ||
      peerConnection.current.signalingState === "closed"
    ) {
      // Tạo một PeerConnection mới với cấu hình STUN servers
      peerConnection.current = new RTCPeerConnection(servers);

      // Xử lý sự kiện khi nhận được media stream từ đối phương
      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0]; // Gán luồng video từ remote peer
        }
      };
    }
  };

  // Bật camera
  const startCamera = async () => {
    try {
      // Kiểm tra nếu kết nối đã bị đóng thì khởi tạo lại
      if (
        !peerConnection.current ||
        peerConnection.current.signalingState === "closed"
      ) {
        initializePeerConnection();
      }

      // Yêu cầu quyền truy cập camera và micro
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Gán stream vào thẻ video local
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream.current;
      }

      // Thêm các track vào peer connection
      localStream.current.getTracks().forEach((track) => {
        if (
          peerConnection.current &&
          peerConnection.current.signalingState !== "closed"
        ) {
          peerConnection.current.addTrack(track, localStream.current);
        }
      });
    } catch (error) {
      console.error("Lỗi khi mở camera:", error);
    }
  };

  // Tạo cuộc gọi
  const createCall = async () => {
    // Kiểm tra nếu không có conversationId thì thoát
    if (!callData?.conversationId) return;

    // Trích xuất thông tin từ callData
    const { conversationId, caller, recipientId } = callData;
    const callerId = caller?.userId;
    const callRef = collection(db, "conversations", conversationId, "calls");

    try {
      // Khởi tạo kết nối nếu chưa có hoặc đã đóng
      if (
        !peerConnection.current ||
        peerConnection.current.signalingState === "closed"
      ) {
        initializePeerConnection();
      }

      setCallStartTime(new Date()); // Lưu thời gian bắt đầu cuộc gọi

      // Tạo một document mới trong Firestore để lưu thông tin cuộc gọi
      const callDocRef = await addDoc(callRef, {
        callerId,
        recipientId,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setCallId(callDocRef.id);

      // Tạo reference đến collections để lưu ICE candidates
      const offerCandidates = collection(callDocRef, "offerCandidates");
      const answerCandidates = collection(callDocRef, "answerCandidates");

      // Lắng nghe sự kiện ICE candidate và lưu vào Firestore
      peerConnection.current.onicecandidate = async (event) => {
        if (!event.candidate) return;
        try {
          await addDoc(offerCandidates, event.candidate.toJSON());
        } catch (error) {
          console.error("❌ Lỗi khi lưu ICE Candidate:", error);
        }
      };

      // Kiểm tra trạng thái kết nối trước khi tạo offer
      if (peerConnection.current.signalingState !== "closed") {
        const offerDescription = await peerConnection.current.createOffer(); // Tạo offer SDP
        await peerConnection.current.setLocalDescription(offerDescription); // Đặt làm Local Description
        await updateDoc(callDocRef, { offer: offerDescription }); // Lưu offer vào Firestore
      } else {
        console.error("❌ Không thể tạo offer: Kết nối đã đóng.");
      }

      // Lắng nghe thay đổi trong document cuộc gọi để nhận answer từ người nhận
      onSnapshot(callDocRef, (snapshot) => {
        const data = snapshot.data();
        if (data?.answer && !peerConnection.current.currentRemoteDescription) {
          const answerDescription = new RTCSessionDescription(data.answer);
          peerConnection.current.setRemoteDescription(answerDescription); // Đặt answer làm Remote Description
        }
      });

      // Lắng nghe các ICE candidate từ người nhận và thêm vào kết nối
      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            peerConnection.current.addIceCandidate(candidate);
          }
        });
      });
    } catch (error) {
      console.error("Lỗi khi tạo cuộc gọi:", error);
    }
  };

  const joinCall = async (conversationId, callId) => {
    if (!conversationId || !callId) return;

    changeCallStatus(callId, conversationId, "ongoing");

    // Tham chiếu đến tài liệu cuộc gọi trong Firestore
    const callDocRef = doc(
      db,
      "conversations",
      conversationId,
      "calls",
      callId
    );
    const offerCandidates = collection(callDocRef, "offerCandidates");
    const answerCandidates = collection(callDocRef, "answerCandidates");

    initializePeerConnection();

    // Lắng nghe sự kiện ICE candidate và lưu vào Firestore
    peerConnection.current.onicecandidate = async (event) => {
      if (!event.candidate) return;
      try {
        await addDoc(answerCandidates, event.candidate.toJSON());
      } catch (error) {
        console.error("❌ Lỗi khi lưu ICE Candidate:", error);
      }
    };

    await startCamera();

    // Lấy Offer từ Firestore và thiết lập kết nối
    const callDoc = await getDoc(callDocRef);
    if (callDoc.exists()) {
      const callData = callDoc.data();
      if (callData.offer) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(callData.offer)
        );
        // Tạo và lưu Answer vào Firestore
        const answerDescription = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answerDescription);
        await updateDoc(callDocRef, { answer: answerDescription });
      }
    }

    // Lắng nghe và thêm các ICE Candidate từ Caller
    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.current.addIceCandidate(candidate);
        }
      });
    });
  };

  // Kết thúc cuộc gọi
  const endCall = async () => {
    disconnect();

    changeCallStatus(
      callId,
      callData?.conversationId,
      callStatus === "pending" ? "canceled" : "ended"
    );

    const newCallStatus = callStatus === "pending" ? "canceled" : "ended";

    const callDuration = callStartTime
      ? Math.floor((Date.now() - callStartTime) / 1000)
      : 0;

    const message = {
      type: "call",
      senderId: callData?.caller?.userId,
      recipientId: callData?.recipientId,
      text: getCallMessageText(newCallStatus, "video"),
      timestamp: serverTimestamp(),
      isRead: false,
      callType: "video", // "audio" hoặc "video"
      callStatus: newCallStatus,
      duration: callDuration || 0, // thời gian cuộc gọi (giây)
    };

    await addMessage(
      callData?.conversationId,
      callData?.caller,
      callData?.recipientId,
      message
    );
    setCallStartTime(null);
  };

  const handleStartCall = async () => {
    if (!peerConnection.current) {
      initializePeerConnection();
    }
    await startCamera();
    await createCall();
  };

  // Đóng tất cả tài nguyên liên quan đến cuộc gọi
  const disconnect = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
  };

  // Thay đổi status cuộc gọi
  const changeCallStatus = async (callId, conversationId, status) => {
    if (!callId) callId = callData?.callId;

    console.log(callId, conversationId);

    if (callId && conversationId) {
      const callDocRef = doc(
        db,
        "conversations",
        conversationId,
        "calls",
        callId
      );
      await updateDoc(callDocRef, {
        status: status,
      });
    }
  };

  // Bật/tắt âm thanh
  const toggleMute = () => {
    setIsMuted((prev) => {
      if (localStream.current) {
        localStream.current.getAudioTracks().forEach((track) => {
          track.enabled = prev; // Nếu đang mute thì bật, nếu đang bật thì tắt
        });
      }
      return !prev;
    });
  };

  // Bật/tắt video
  const toggleVideo = () => {
    setIsVideoOn((prev) => {
      if (localStream.current) {
        localStream.current.getVideoTracks().forEach((track) => {
          track.enabled = !prev; // Nếu đang bật thì tắt, nếu đang tắt thì bật
        });
      }
      return !prev;
    });
  };

  return (
    <div className={cx("video-call-container")}>
      <audio ref={audioRef} src={ringTone} loop />
      <div className={cx("connected-container")}>
        {callStatus === "pending" ? (
          <div className={cx("calling-overlay")}>
            <div className={cx("avatar-container")}>
              <div className={cx("avatar-ring")}></div>
              <img
                src={callData?.recipient?.avatar || image}
                alt="Avatar"
                className={cx("avatar")}
              />
            </div>
            <h6 className={cx("calling-text")}>{callData?.recipient?.name}</h6>
            <p className={cx("calling-text")}>Connecting...</p>
          </div>
        ) : (
          <video
            ref={remoteVideoRef}
            className={cx("remote-video")}
            autoPlay
            playsInline
          ></video>
        )}
        <div className={cx("local-video-wrapper")}>
          <video
            ref={localVideoRef}
            className={cx("local-video")}
            autoPlay
            playsInline
            muted
          ></video>
        </div>
      </div>
      <div className={cx("call-controls")}>
        <button
          className={cx("control-button")}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
        <button
          className={cx("control-button")}
          onClick={() => setIsVideoOn(!isVideoOn)}
        >
          {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
        </button>
        <button className={cx("control-button", "end-call")} onClick={endCall}>
          <FaPhoneSlash />
        </button>
      </div>
    </div>
  );
}

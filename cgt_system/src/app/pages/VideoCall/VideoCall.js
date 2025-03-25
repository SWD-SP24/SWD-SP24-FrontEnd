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
import { db } from "../../config/firebase";
import styles from "./videoCall.module.scss";
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import image_avt from "../../assets/img/avatars/default-avatar.jpg";
import addMessage from "../../util/addMessage";
import {
  checkRecipientInCall,
  getCallMessageText,
} from "./usecases/videoCallUseCases";
import ringTone from "../../assets/audio/ringTone.mp3";
import { useNavigate } from "react-router";
import useUser from "../../hooks/useUser";

const cx = classNames.bind(styles);
const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

export default function VideoCall() {
  const permissions = JSON.parse(Cookies.get("permissions") || "[]");
  const hasPermission = permissions.some(
    (p) => p.permissionName === "DOCTOR_CALL"
  );
  const { user } = useUser();
  const [callData, setCallData] = useState(null);
  const [callId, setCallId] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [callStartTime, setCallStartTime] = useState(0);
  const [isRemoteVideoOn, setIsRemoteVideoOn] = useState(true);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const audioRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasPermission && user.role === "member") {
      navigate("/not-authorized");
      return;
    }

    const storedCallData = sessionStorage.getItem("videoCallData");

    if (!storedCallData) {
      navigate(-1);
      return;
    }

    const callData = JSON.parse(storedCallData);

    // Kiểm tra quyền truy cập
    if (
      (user.role === "member" && !hasPermission) ||
      (user.role === "doctor" && user.userId !== callData.recipientId)
    ) {
      navigate("/not-authorized");
      return;
    }

    setCallData(callData);

    window.addEventListener("beforeunload", () => {
      if (window.opener) {
        window.opener.postMessage("closeVideoCall", "*");
      }
    });

    return () => {
      disconnect();
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
        const callStartTime = docSnap.data().callStartTime;
        const miligiay =
          callStartTime?.seconds * 1000 + callStartTime?.nanoseconds / 1000000;
        const result = Math.floor((miligiay - Date.now()) / 1000);
        setCallStartTime(result);

        const isRemoteOn =
          callData?.currentUser.userId === callData.caller.userId
            ? docSnap.data().receiverVideoOn
            : docSnap.data().callerVideoOn;
        setIsRemoteVideoOn(isRemoteOn);
        setCallStatus(callStatus);

        switch (callStatus) {
          case "pending":
            if (audioRef.current) {
              audioRef.current
                .play()
                .catch((error) => console.error("Lỗi phát âm thanh:", error));
            }

            // Đợi 30 giây nếu không trả lời thì chuyển thành cuộc gọi nhỡ
            if (!timeoutRef.current) {
              // Tránh set nhiều lần
              timeoutRef.current = setTimeout(() => {
                changeCallStatus(callId, callData?.conversationId, "missed");
              }, 30000);
            }
            break;
          case "ongoing":
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }

            // Hủy timeout nếu cuộc gọi được nhận
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }

            break;
          case "canceled":
            window.close();
            break;
          case "declined":
            window.close();
            break;
          case "ended":
            window.close();
            break;
          case "missed":
            handleMissedCall();
            window.close();
            break;

          default:
            break;
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [callId]);

  useEffect(() => {
    let timer;

    timer = setInterval(() => {
      setCallStartTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [callStartTime]);

  const initializePeerConnection = () => {
    if (
      !peerConnection.current ||
      peerConnection.current.signalingState === "closed"
    ) {
      // Tạo một PeerConnection mới với cấu hình STUN servers
      peerConnection.current = new RTCPeerConnection(servers);

      // Xử lý sự kiện khi nhận được media stream từ đối phương
      peerConnection.current.ontrack = (event) => {
        console.log("📡 Nhận track:", event.track.kind);
        const [remoteStream] = event.streams;

        // Nếu có video, gán vào remoteVideoRef
        if (event.track.kind === "video" && remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;

          // Kiểm tra trạng thái của video
          const videoTrack = remoteStream.getVideoTracks()[0];
          if (videoTrack) {
            videoTrack.onmute = () => setIsRemoteVideoOn(false);
            videoTrack.onunmute = () => setIsRemoteVideoOn(true);
          } else {
            setIsRemoteVideoOn(false);
          }
        }

        // Nếu có audio, gán vào remoteAudioRef
        if (event.track.kind === "audio" && remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.muted = false;
          remoteAudioRef.current
            .play()
            .catch((error) => console.error("Lỗi phát âm thanh:", error));
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

  const startAudio = async () => {
    try {
      if (
        !peerConnection.current ||
        peerConnection.current.signalingState === "closed"
      ) {
        initializePeerConnection();
      }

      // Yêu cầu quyền truy cập micro (chỉ audio)
      localStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null; // Không cần video stream cho cuộc gọi âm thanh
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
      console.error("Lỗi khi mở micro:", error);
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

      // Tạo một document mới trong Firestore để lưu thông tin cuộc gọi
      const callDocRef = await addDoc(callRef, {
        callType: callData?.callType,
        callerId,
        recipientId,
        status: "pending",
        callerVideoOn: true,
        receiverVideoOn: false,
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

    if (callData?.callType === "video") {
      await startCamera();
    } else {
      await startAudio();
    }

    updateDoc(callDocRef, {
      receiverVideoOn: true,
      callStartTime: serverTimestamp(),
    });

    // Lấy Offer từ Firestore và thiết lập kết nối
    const callDoc = await getDoc(callDocRef);
    if (callDoc.exists()) {
      const callData = callDoc.data();
      if (callData.offer) {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(callData.offer)
        );

        // Lắng nghe và thêm các ICE Candidate từ Caller
        onSnapshot(offerCandidates, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              const candidate = new RTCIceCandidate(change.doc.data());
              peerConnection.current.addIceCandidate(candidate);
            }
          });
        });

        // Tạo và lưu Answer vào Firestore
        const answerDescription = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answerDescription);
        await updateDoc(callDocRef, { answer: answerDescription });
      }
    }
  };

  // Kết thúc cuộc gọi
  const endCall = async () => {
    const newCallStatus = callStatus === "pending" ? "canceled" : "ended";

    const message = {
      type: "call",
      senderId: callData?.caller?.userId,
      recipientId: callData?.recipientId,
      text: getCallMessageText(newCallStatus, callData?.callType),
      timestamp: serverTimestamp(),
      isRead: false,
      callType: callData?.callType,
      callStatus: newCallStatus,
      duration: callStartTime || 0,
    };

    await addMessage(
      callData?.conversationId,
      callData?.caller,
      callData?.recipientId,
      message
    );

    setCallStartTime(0);

    await changeCallStatus(
      callId,
      callData?.conversationId,
      callStatus === "pending" ? "canceled" : "ended"
    );

    disconnect();
  };

  // Xử lí khi bắt đầu cuộc gọi
  const handleStartCall = async () => {
    const isInCall = await checkRecipientInCall(callData?.recipientId);
    if (isInCall) {
      handleBusyCall();
      return;
    }

    if (!peerConnection.current) {
      initializePeerConnection();
    }
    if (callData?.callType === "video") {
      await startCamera();
    } else {
      await startAudio();
    }

    await createCall();
  };

  // Xử lí khi cuộc gọi bị nhỡ
  const handleMissedCall = async () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setCallStatus("missed");

    const message = {
      type: "call",
      senderId: callData?.caller?.userId,
      recipientId: callData?.recipientId,
      text: getCallMessageText("missed", callData?.callType),
      timestamp: serverTimestamp(),
      isRead: false,
      callType: callData?.callType,
      callStatus: "missed",
      duration: 0,
    };

    await addMessage(
      callData?.conversationId,
      callData?.caller,
      callData?.recipientId,
      message
    );
  };

  // Xử lí cuộc gọi bận
  const handleBusyCall = async () => {
    setCallStatus("busy");

    const message = {
      type: "call",
      senderId: callData?.caller?.userId,
      recipientId: callData?.recipientId,
      text: getCallMessageText("busy", callData?.callType),
      timestamp: serverTimestamp(),
      isRead: false,
      callType: callData?.callType,
      callStatus: "busy",
      duration: 0,
    };

    await addMessage(
      callData?.conversationId,
      callData?.caller,
      callData?.recipientId,
      message
    );
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

        const callDocRef = doc(
          db,
          "conversations",
          callData?.conversationId,
          "calls",
          callId
        );

        const updateField =
          callData?.currentUser?.userId === callData?.caller?.userId
            ? "callerVideoOn"
            : "receiverVideoOn";
        updateDoc(callDocRef, {
          [updateField]: !prev,
        });
      }
      return !prev;
    });
  };

  const formatElapsedTime = (seconds) => {
    if (!seconds || seconds < 0) return "00:00";

    const hrs = Math.floor(seconds / 3600); // Giờ
    const mins = Math.floor((seconds % 3600) / 60); // Phút
    const secs = seconds % 60; // Giây

    // Format thành dạng 2 chữ số
    const formattedMins = String(mins).padStart(2, "0");
    const formattedSecs = String(secs).padStart(2, "0");

    if (hrs > 0) {
      const formattedHrs = String(hrs).padStart(2, "0");
      return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
    } else {
      return `${formattedMins}:${formattedSecs}`;
    }
  };

  const buttonDisable = callStatus !== "ongoing";
  const endButtonDisable = callStatus === "ended";

  console.log(callData);

  return (
    <div className={cx("video-call-container")}>
      <audio ref={audioRef} src={ringTone} loop />
      {callStatus === "busy" ? (
        <div className="d-flex flex-column align-items-center">
          <div className={cx("calling-overlay")}>
            <div className={cx("avatar-container")}>
              <img
                src={callData?.recipient?.avatar || image_avt}
                alt="Avatar"
                className={cx("avatar")}
              />
            </div>
            <h6 className={cx("calling-text")}>{callData?.recipient?.name}</h6>
            <small className={cx("connecting-text")}>
              The user is currently on another call
            </small>
          </div>
          <div className={cx("call-controls-busy")}>
            <div className="d-flex flex-column align-items-center gap-1">
              <button
                className="btn rounded-pill btn-icon btn-label-secondary"
                onClick={() => window.close()}
              >
                <i className="bx bx-x"></i>
              </button>
              <p className="mb-0 fw-blod">Cancel</p>
            </div>

            <div className="d-flex flex-column align-items-center gap-1">
              <button
                className="btn rounded-pill btn-icon btn-success"
                onClick={() => handleStartCall()}
              >
                <i className="bx bx-revision"></i>
              </button>
              <p className="mb-0 fw-blod">Try Again</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={cx("connected-container")}>
          {callStatus === "pending" || !callStatus ? (
            <div className={cx("calling-overlay")}>
              <div className={cx("avatar-container")}>
                <div className={cx("avatar-ring")}></div>
                <img
                  src={callData?.recipient?.avatar || image_avt}
                  alt="Avatar"
                  className={cx("avatar")}
                />
              </div>
              <h6 className={cx("calling-text")}>
                {callData?.recipient?.name}
              </h6>
              <small className={cx("connecting-text")}>Connecting...</small>
            </div>
          ) : (
            <>
              {callData?.callType === "audio" && callStatus === "ongoing" ? (
                <div className={cx("calling-overlay")}>
                  <div className={cx("avatar-container")}>
                    <div className={cx("avatar-ring")}></div>
                    <img
                      src={
                        callData?.currentUser?.userId ===
                        callData?.caller?.userId
                          ? callData?.recipient?.avatar
                          : callData?.caller?.avatar || image_avt
                      }
                      alt="Avatar"
                      className={cx("avatar")}
                    />
                  </div>
                  <h6 className={cx("calling-text")}>
                    {callData?.recipient?.name}
                  </h6>
                  <small className={cx("connecting-text")}>
                    {formatElapsedTime(callStartTime)}
                  </small>

                  <audio ref={remoteAudioRef} autoPlay playsInline />
                </div>
              ) : (
                <video
                  ref={remoteVideoRef}
                  className={cx("remote-video")}
                  autoPlay
                  playsInline
                />
              )}

              {!isRemoteVideoOn && (
                <img
                  src={
                    callData?.currentUser?.userId === callData?.caller?.userId
                      ? callData?.recipient?.avatar
                      : callData?.caller?.avatar || image_avt
                  }
                  alt="Remote Avatar"
                  className={cx("remote-avatar-overlay")}
                />
              )}
            </>
          )}
          {callData?.callType === "video" && (
            <div className={cx("local-video-wrapper")}>
              <video
                ref={localVideoRef}
                className={cx("local-video")}
                autoPlay
                playsInline
                muted
              ></video>
              {!isVideoOn && (
                <img
                  src={callData?.currentUser?.avatar || image_avt}
                  alt="Your Avatar"
                  className={cx("local-avatar-overlay")}
                />
              )}
            </div>
          )}
        </div>
      )}
      {callStatus !== "busy" && (
        <div className={cx("call-controls")}>
          <button
            disabled={buttonDisable}
            className="btn rounded-pill btn-icon btn-label-secondary"
            onClick={() => !buttonDisable && toggleMute()}
          >
            {isMuted ? (
              <i className="bx bxs-microphone-off"></i>
            ) : (
              <i className="bx bxs-microphone"></i>
            )}
          </button>
          {callData?.callType === "video" && (
            <button
              disabled={buttonDisable}
              className="btn rounded-pill btn-icon btn-label-secondary"
              onClick={() => !buttonDisable && toggleVideo()}
            >
              {isVideoOn ? (
                <i className="bx bxs-video"></i>
              ) : (
                <i className="bx bxs-video-off"></i>
              )}
            </button>
          )}
          <button
            disabled={endButtonDisable}
            className="btn rounded-pill btn-icon btn-danger"
            onClick={() => !endButtonDisable && endCall()}
          >
            <i className="bx bxs-phone"></i>
          </button>
        </div>
      )}
    </div>
  );
}

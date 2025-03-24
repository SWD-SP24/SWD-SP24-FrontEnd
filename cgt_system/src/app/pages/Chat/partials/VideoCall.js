// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   onSnapshot,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";
// import React, { useEffect, useRef, useState } from "react";
// import { db } from "../../../config/firebase";
// import image from "../../../assets/img/avatars/default-avatar.jpg";

// const servers = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };

// export default function VideoCall() {
//   const [callId, setCallId] = useState("");
//   const [callStartTime, setCallStartTime] = useState(null);
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnection = useRef(null);
//   const localStream = useRef(null);

//   const [micMuted, setMicMuted] = useState(false);
//   const [videoOff, setVideoOff] = useState(false);
//   const [callDuration, setCallDuration] = useState(0);

//   const chatRef = collection(db, "conversations", conversationId, "messages");
//   const callRef = collection(db, "conversations", conversationId, "calls");

//   const parentId = currentUser?.userId;
//   const doctorId = recipientId;

//   // Khởi tạo PeerConnection
//   const initializePeerConnection = () => {
//     if (
//       !peerConnection.current ||
//       peerConnection.current.signalingState === "closed"
//     ) {
//       peerConnection.current = new RTCPeerConnection(servers);

//       peerConnection.current.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//         }
//       };

//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           console.log("New ICE candidate:", event.candidate);
//         }
//       };

//       console.log("✅ PeerConnection initialized!");
//     }
//   };

//   // Bật camera
//   const startCamera = async () => {
//     try {
//       console.log("📸 Requesting camera access...");

//       // Kiểm tra nếu peerConnection đã bị đóng thì khởi tạo lại
//       if (
//         !peerConnection.current ||
//         peerConnection.current.signalingState === "closed"
//       ) {
//         console.log("🔄 Re-initializing PeerConnection...");
//         initializePeerConnection();
//       }

//       localStream.current = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });

//       console.log("🎥 Camera access granted!", localStream.current);

//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream.current;
//         console.log("✅ Local video attached!", localVideoRef.current);
//       } else {
//         console.warn("⚠️ localVideoRef.current is null.");
//       }

//       localStream.current.getTracks().forEach((track) => {
//         if (
//           peerConnection.current &&
//           peerConnection.current.signalingState !== "closed"
//         ) {
//           peerConnection.current.addTrack(track, localStream.current);
//           console.log("🎬 Track added to peer connection:", track);
//         }
//       });

//       console.log("🎥 Camera started successfully!");
//     } catch (error) {
//       console.error("❌ Lỗi khi mở camera:", error);
//     }
//   };

//   // Lưu lịch sử cuộc gọi vào tin nhắn
//   const saveCallMessage = async (callStatus, duration) => {
//     await addDoc(chatRef, {
//       senderId: parentId,
//       type: "call",
//       callStatus, // "ended" | "missed" | "rejected"
//       duration, // Thời gian gọi (giây)
//       timestamp: new Date(),
//     });
//   };

//   // Tạo cuộc gọi
//   const createCall = async () => {
//     if (!conversationId) return;

//     try {
//       if (
//         !peerConnection.current ||
//         peerConnection.current.signalingState === "closed"
//       ) {
//         initializePeerConnection();
//       }

//       const callId = callRef.id;
//       setCallId(callId);
//       setCallStartTime(new Date());

//       await setDoc(callRef, {
//         callerId: currentUser.userId,
//         recipientId: recipientId,
//         status: "pending",
//         createdAt: serverTimestamp(),
//       });

//       const offerCandidates = collection(callRef, "offerCandidates");
//       const answerCandidates = collection(callRef, "answerCandidates");

//       peerConnection.current.onicecandidate = async (event) => {
//         if (event.candidate) {
//           await addDoc(offerCandidates, event.candidate.toJSON());
//         }
//       };

//       if (peerConnection.current.signalingState !== "closed") {
//         const offerDescription = await peerConnection.current.createOffer();
//         await peerConnection.current.setLocalDescription(offerDescription);
//         await updateDoc(callRef, { offer: offerDescription });
//       } else {
//         console.error("❌ Không thể tạo offer: Kết nối đã đóng.");
//       }

//       onSnapshot(callRef, (snapshot) => {
//         const data = snapshot.data();
//         if (data?.answer && !peerConnection.current.currentRemoteDescription) {
//           const answerDescription = new RTCSessionDescription(data.answer);
//           peerConnection.current.setRemoteDescription(answerDescription);
//         }
//       });

//       onSnapshot(answerCandidates, (snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//           if (change.type === "added") {
//             const candidate = new RTCIceCandidate(change.doc.data());
//             peerConnection.current.addIceCandidate(candidate);
//           }
//         });
//       });

//       console.log("📞 Call created successfully!");
//     } catch (error) {
//       console.error("Lỗi khi tạo cuộc gọi:", error);
//     }
//   };

//   // Tham gia cuộc gọi
//   const joinCall = async () => {
//     initializePeerConnection();
//     await startCamera();

//     const callDoc = doc(db, "calls", callId);
//     const offerCandidates = collection(callDoc, "offerCandidates");
//     const answerCandidates = collection(callDoc, "answerCandidates");
//     setCallStartTime(new Date());

//     peerConnection.current.onicecandidate = async (event) => {
//       if (event.candidate) {
//         await addDoc(answerCandidates, event.candidate.toJSON());
//       }
//     };

//     const callData = (await getDoc(callDoc)).data();
//     await peerConnection.current.setRemoteDescription(
//       new RTCSessionDescription(callData.offer)
//     );
//     const answerDescription = await peerConnection.current.createAnswer();
//     await peerConnection.current.setLocalDescription(answerDescription);
//     await setDoc(callDoc, { answer: answerDescription }, { merge: true });

//     onSnapshot(offerCandidates, (snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//           const candidate = new RTCIceCandidate(change.doc.data());
//           peerConnection.current.addIceCandidate(candidate);
//         }
//       });
//     });
//   };

//   // Kết thúc cuộc gọi
//   const endCall = async () => {
//     if (!callStartTime) return; // Tránh lỗi nếu cuộc gọi chưa bắt đầu

//     const duration = Math.floor((new Date() - callStartTime) / 1000);
//     await saveCallMessage("ended", duration);

//     // Dừng tất cả tracks của local stream (camera & microphone)
//     if (localStream.current) {
//       localStream.current.getTracks().forEach((track) => {
//         track.stop(); // Dừng track (camera, microphone)
//       });
//       localStream.current = null;
//     }

//     // Xóa video để giải phóng tài nguyên
//     if (localVideoRef.current) {
//       localVideoRef.current.srcObject = null;
//     }
//     if (remoteVideoRef.current) {
//       remoteVideoRef.current.srcObject = null;
//     }

//     // Đóng kết nối WebRTC nếu còn hoạt động
//     if (peerConnection.current) {
//       if (peerConnection.current.signalingState !== "closed") {
//         peerConnection.current.close();
//       }
//       peerConnection.current = null;
//     }

//     // Reset trạng thái cuộc gọi
//     setCallId("");
//     setCallStartTime(null);
//   };

//   // Hàm tính thời gian cuối cùng của đoạn hội thoại tới hiện tại
//   const timeAgo = (timestamp) => {
//     if (!timestamp?.seconds) return "";
//     const timeDiff = Date.now() - timestamp.seconds * 1000;
//     const minutes = Math.floor(timeDiff / (1000 * 60));
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);

//     if (minutes < 1) return "";
//     if (minutes < 60) return `${minutes} minutes ago`;
//     if (hours < 24) return `${hours} hours ago`;
//     return `${days} days ago`;
//   };

//   // Gộp bật camera và tạo cuộc gọi
//   const handleStartCall = async () => {
//     if (!peerConnection.current) {
//       initializePeerConnection();
//     }
//     await createCall();
//   };

//   useEffect(() => {
//     if (callId) {
//       setTimeout(startCamera, 100);
//     }
//   }, [callId]);
//   return (
//     <div className="video-call-container">
//       <div>
//         <video
//           ref={remoteVideoRef}
//           className="remote-video"
//           autoPlay
//           playsInline
//         ></video>
//         <video
//           ref={localVideoRef}
//           className="local-video"
//           autoPlay
//           playsInline
//           muted
//         ></video>
//       </div>
//       <div className="call-controls">
//         <button className="control-button">
//           <i className="bx bx-microphone"></i>
//         </button>
//         <button className="control-button">
//           <i className="bx bx-video-off"></i>
//         </button>
//         <button className="control-button end-call" onClick={endCall}>
//           <i className="bx bx-phone-off"></i>
//         </button>
//       </div>
//     </div>
//   );
// }

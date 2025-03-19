import React from "react";

const servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function ChatHistoryHeader() {
  const [callId, setCallId] = useState("");
  const [callStartTime, setCallStartTime] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(new RTCPeerConnection(servers));
  const localStream = useRef(null);

  const parentId = "parent_123";
  const doctorId = "doctor_456";
  const chatRef = collection(db, "messages", `${parentId}_${doctorId}`);

  // Bật camera
  const startCamera = async () => {
    localStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = localStream.current;
    localStream.current.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current);
    });

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };
  };

  // Lưu lịch sử cuộc gọi vào tin nhắn
  const saveCallMessage = async (callStatus, duration) => {
    await addDoc(chatRef, {
      senderId: parentId,
      type: "call",
      callStatus: callStatus, // "ended" | "missed" | "rejected"
      duration: duration, // Thời gian gọi (giây)
      timestamp: new Date(),
    });
  };

  // Tạo cuộc gọi
  const createCall = async () => {
    const callDoc = doc(collection(db, "calls"));
    setCallId(callDoc.id);
    setCallStartTime(new Date());

    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        await addDoc(offerCandidates, event.candidate.toJSON());
      }
    };

    const offerDescription = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offerDescription);
    await setDoc(callDoc, { offer: offerDescription });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.current.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        peerConnection.current.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.current.addIceCandidate(candidate);
        }
      });
    });
  };

  // Tham gia cuộc gọi
  const joinCall = async () => {
    const callDoc = doc(db, "calls", callId);
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");
    setCallStartTime(new Date());

    peerConnection.current.onicecandidate = async (event) => {
      if (event.candidate) {
        await addDoc(answerCandidates, event.candidate.toJSON());
      }
    };

    const callData = (await getDoc(callDoc)).data();
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(callData.offer)
    );
    const answerDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answerDescription);
    await setDoc(callDoc, { answer: answerDescription }, { merge: true });

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
    const endTime = new Date();
    const duration = Math.floor((endTime - callStartTime) / 1000);
    await saveCallMessage("ended", duration);

    localStream.current?.getTracks().forEach((track) => track.stop());
    peerConnection.current.close();
    peerConnection.current = new RTCPeerConnection(servers);
    setCallId("");
    setCallStartTime(null);
  };

  return (
    <div>
      <h1>Video Call App</h1>
      <video ref={localVideoRef} autoPlay playsInline muted></video>
      <video ref={remoteVideoRef} autoPlay playsInline></video>

      <button onClick={startCamera}>Start Camera</button>
      <button onClick={createCall}>Create Call</button>
      <input value={callId} onChange={(e) => setCallId(e.target.value)} />
      <button onClick={joinCall}>Join Call</button>
      <button onClick={endCall}>End Call</button>
    </div>
  );
}

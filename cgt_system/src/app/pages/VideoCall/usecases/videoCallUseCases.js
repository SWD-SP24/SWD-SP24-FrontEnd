import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const checkRecipientInCall = async (recipientId) => {
  if (!recipientId) return false;

  // Tìm tất cả conversations mà recipientId là participant
  const conversationsQuery = query(
    collection(db, "conversations"),
    where("participants", "array-contains", recipientId)
  );

  const conversationsSnapshot = await getDocs(conversationsQuery);
  if (conversationsSnapshot.empty) return false;

  // Lấy danh sách conversationId từ kết quả
  const conversationIds = conversationsSnapshot.docs.map((doc) => doc.id);

  // Kiểm tra xem có cuộc gọi nào đang pending hoặc ongoing không
  for (const conversationId of conversationIds) {
    const callsQuery = query(
      collection(db, "conversations", conversationId, "calls"),
      where("status", "in", ["ongoing", "pending"])
    );

    const callsSnapshot = await getDocs(callsQuery);
    if (!callsSnapshot.empty) return true; // Nếu có cuộc gọi thỏa mãn, return true ngay
  }

  return false; // Không tìm thấy cuộc gọi nào đang active
};

// // ✅ Khi cuộc gọi được chấp nhận
// const handleCallAccepted = () => {
//     console.log("✅ Cuộc gọi đã được chấp nhận.");
//     startCall(); // Bắt đầu WebRTC
//   };

// // ✅ Khi cuộc gọi bị hủy
// const handleCallCanceled = async () => {
//   console.log("🚫 Cuộc gọi bị hủy.");

//   await addCallMessageToFirestore("canceled");
//   closeCallWindow();
// };

// const handleCallDeclined = async () => {
//   console.log("🚫 Cuộc gọi bị từ chối.");

//   closeCallWindow();
// };

// // ✅ Khi cuộc gọi kết thúc bình thường
// const handleCallEnded = async () => {
//   console.log("📴 Cuộc gọi đã kết thúc.");

//   await addCallMessageToFirestore("ended");
//   closeCallWindow();
// };

// // ✅ Khi cuộc gọi bị nhỡ (không ai trả lời)
// const handleCallMissed = async () => {
//   console.log("⏳ Cuộc gọi bị nhỡ.");

//   await addCallMessageToFirestore("missed");
//   closeCallWindow();
// };

export const getCallMessageText = (callStatus, callType) => {
  if (callStatus === "missed") {
    return `Missed ${callType === "video" ? "video" : "audio"} call`;
  } else if (callStatus === "canceled") {
    return `Missed ${callType === "video" ? "video" : "audio"} call`;
  } else if (callStatus === "ended") {
    return `${callType === "video" ? "Video" : "Audio"} call`;
  } else if (callStatus === "declined") {
    return `Missed ${callType === "video" ? "video" : "audio"} call`;
  } else if (callStatus === "busy") {
    return `Missed ${callType === "video" ? "video" : "audio"} call`;
  }
  return `${callType === "video" ? "Video" : "audio"} call`;
};

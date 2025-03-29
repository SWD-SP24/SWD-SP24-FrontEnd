import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const addMessage = async (conversationId, sender, recipientId, messageData) => {
  if (!conversationId) return;

  try {
    // Thêm tin nhắn vào Firestore
    await addDoc(
      collection(db, "conversations", conversationId, "messages"),
      messageData
    );

    // Kiểm tra trạng thái activeConversation của recipient
    const recipientRef = doc(db, "activeUsers", String(recipientId));
    const recipientSnap = await getDoc(recipientRef);

    const isRecipientInChat =
      recipientSnap.exists() &&
      recipientSnap.data().activeConversation === conversationId;

    // Cập nhật thông tin cuộc trò chuyện
    const conversationRef = doc(db, "conversations", conversationId);
    await updateDoc(conversationRef, {
      lastMessage: messageData.text,
      lastSenderId: sender.userId,
      lastSenderName: sender.fullName,
      lastSenderAvatar: sender.avatar || "",
      lastTimestamp: serverTimestamp(),
      ...(isRecipientInChat
        ? {}
        : { [`unreadCounts.${recipientId}`]: increment(1) }),
    });
  } catch (error) {
    console.error("Error adding message:", error);
  }
};

export default addMessage;

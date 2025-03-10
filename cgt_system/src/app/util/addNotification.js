import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  getDocs,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

const addNotification = async (
  userId,
  senderName,
  senderAvatar,
  type,
  title,
  body,
  link
) => {
  if (!userId) return;

  const userNotificationsRef = doc(db, "notifications", String(userId));
  const messagesRef = collection(
    db,
    "notifications",
    String(userId),
    "messages"
  );

  try {
    // Kiểm tra xem userId đã tồn tại trong notifications chưa
    const userDoc = await getDoc(userNotificationsRef);

    if (!userDoc.exists()) {
      // Nếu chưa có, tạo document rỗng
      await setDoc(userNotificationsRef, { createdAt: serverTimestamp() });
    }

    // Kiểm tra xem đã có thông báo nào cùng senderName và type "message" chưa
    const q = query(
      messagesRef,
      where("type", "==", "message"),
      where("senderName", "==", senderName)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Nếu đã có thông báo cũ, cập nhật lại nội dung và timestamp
      const existingNotification = querySnapshot.docs[0].ref;
      await updateDoc(existingNotification, {
        title,
        body,
        link,
        timestamp: serverTimestamp(),
        isRead: false, // Đánh dấu chưa đọc lại khi có tin nhắn mới
      });
    } else {
      // Nếu chưa có, thêm mới
      await addDoc(messagesRef, {
        senderName,
        senderAvatar,
        type,
        title,
        body,
        link,
        timestamp: serverTimestamp(),
        isRead: false,
      });
    }
  } catch (error) {
    console.error("Lỗi khi thêm thông báo:", error);
  }
};

export default addNotification;

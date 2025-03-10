import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const addNotification = async (userId, title, body, link) => {
  if (!userId) return;

  const messagesRef = collection(db, "notifications", userId, "messages");

  await addDoc(messagesRef, {
    title,
    body,
    link,
    timestamp: serverTimestamp(),
    isRead: false,
  });
};

export default addNotification;

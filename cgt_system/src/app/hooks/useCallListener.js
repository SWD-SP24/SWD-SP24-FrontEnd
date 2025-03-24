import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const useCallListener = (currentUser) => {
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    if (!currentUser?.userId) return;

    const currentUserId = currentUser.userId;

    // Lấy tất cả các cuộc hội thoại mà user tham gia
    const conversationsQuery = query(
      collection(db, "conversations"),
      where("participants", "array-contains", currentUserId) // Tìm tất cả cuộc hội thoại có user
    );

    const unsubscribeConversations = onSnapshot(
      conversationsQuery,
      (conversationSnapshot) => {
        conversationSnapshot.docs.forEach((conversationDoc) => {
          const conversationId = conversationDoc.id;
          const callerId = conversationDoc
            .data()
            .participants.find((id) => id !== currentUserId);
          const caller = conversationDoc.data()[callerId] || {};

          // Lấy các cuộc gọi trong từng cuộc hội thoại
          const callsCollection = collection(
            db,
            "conversations",
            conversationId,
            "calls"
          );

          // Lắng nghe các cuộc gọi trong từng cuộc hội thoại
          const unsubscribeCalls = onSnapshot(
            callsCollection,
            (callSnapshot) => {
              callSnapshot.docs.forEach(async (callDoc) => {
                const call = callDoc.data();

                if (call.recipientId !== currentUserId) return;

                switch (call.status) {
                  case "pending":
                    setIncomingCall({
                      conversationId,
                      callId: callDoc.id,
                      callerId: call.callerId,
                      caller: {
                        userId: call.callerId,
                        fullName: caller.name,
                        avatar: caller.avatar,
                      },
                      recipientId: call.recipientId,
                    });
                    break;

                  case "canceled":
                    setIncomingCall(null);
                    break;

                  case "missed":
                    setIncomingCall(null);
                    break;

                  default:
                    break;
                }
              });
            }
          );

          return () => unsubscribeCalls();
        });
      }
    );

    return () => unsubscribeConversations();
  }, [currentUser?.userId]);

  return { incomingCall, setIncomingCall };
};

export default useCallListener;

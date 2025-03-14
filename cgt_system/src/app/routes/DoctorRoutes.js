import { Route, Routes, useOutletContext } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "../pages/Chat";
import ChatHistory from "../pages/Chat/partials/ChatHistory";

export default function DoctorRoutes() {
  const { user } = useOutletContext();

  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute
            isAllowed={user.role === "doctor"}
            redirectTo={"/not-authorized"}
          />
        }
      >
        <Route path="consultations" element={<Chat />}>
          <Route path=":chatId" element={<ChatHistory />} />
        </Route>
      </Route>
    </Routes>
  );
}

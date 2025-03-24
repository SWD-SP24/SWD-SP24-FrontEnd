import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet } from "react-router";
import useUser from "../hooks/useUser";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Nav/Navbar";
import Loading from "../components/Loading/Loading";
import useApi from "../hooks/useApi";
import API_URLS from "../config/apiUrls";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import useCallListener from "../hooks/useCallListener";
import CallPopup from "../components/CallPopup/CallPopup";
import { Modal } from "bootstrap";

export default function MainLayout() {
  const { user, setUser } = useUser();

  const { incomingCall, setIncomingCall } = useCallListener(user);
  console.log(incomingCall);

  const { response, callApi } = useApi({
    url: `${API_URLS.USER.CURRENT_USER}`,
    method: "GET",
  });

  useEffect(() => {
    callApi();
  }, []);

  useEffect(() => {
    if (response?.status === "successful") {
      const user = response.data;
      Cookies.set("user", JSON.stringify(user));
      setUser(user);
    }
  }, [response]);

  // Cập nhật trạng thái online khi vào chat
  useEffect(() => {
    if (!user) return;

    const userId = String(user.userId);
    const userRef = doc(db, "activeUsers", userId);

    const setUserOnline = async () => {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // Nếu user đã tồn tại, cập nhật trạng thái online
        await updateDoc(userRef, {
          isOnline: true,
          lastSeen: serverTimestamp(),
        });
      } else {
        // Nếu user chưa tồn tại, tạo mới
        await setDoc(userRef, {
          isOnline: true,
          lastSeen: serverTimestamp(),
        });
      }
    };

    setUserOnline();

    // Cập nhật trạng thái offline khi rời trang
    const handleOffline = async () => {
      await updateDoc(userRef, {
        isOnline: false,
        lastSeen: serverTimestamp(),
      });
    };

    window.addEventListener("beforeunload", handleOffline);

    return () => {
      handleOffline();
      window.removeEventListener("beforeunload", handleOffline);
    };
  }, [user]);

  useEffect(() => {
    const modalElement = document.getElementById("callPopup");

    if (modalElement) {
      let modalInstance = Modal.getInstance(modalElement);

      if (!modalInstance) {
        modalInstance = new Modal(modalElement, { backdrop: "static" });
      }

      if (incomingCall) {
        modalInstance.show();
      } else {
        modalInstance.hide();
      }
    }
  }, [incomingCall]);

  if (user === null) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <div className="pattern-bg"></div>

        <div className="layout-wrapper layout-content-navbar bg-body  ">
          <div className="layout-container">
            <Sidebar role={user.role} />
            <div className="menu-mobile-toggler d-xl-none rounded-1">
              <a
                href="javascript:void(0);"
                className="layout-menu-toggle menu-link text-large text-bg-secondary p-2 rounded-1"
              >
                <i className="bx bx-menu icon-base"></i>
                <i className="bx bx-chevron-right icon-base"></i>
              </a>
            </div>
            <div
              className="layout-page"
              style={{
                paddingLeft: "260px",
                paddingTop: "76px",
              }}
            >
              <Navbar user={user} />
              <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                  <Outlet context={{ user, setUser, callApi }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CallPopup
        incomingCall={incomingCall}
        setIncomingCall={setIncomingCall}
        currentUser={user}
      />
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const SpeechRecognitionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói!");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "vi-VN";
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      setTranscript(text);
      console.log("Bạn đã nói:", text);
      handleCommand(text);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Lỗi nhận diện:", event.error);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    // Yêu cầu quyền micro ngay khi component load
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setHasPermission(true);
        console.log("Quyền micro đã được cấp!");
      })
      .catch((err) => console.error("Lỗi cấp quyền micro:", err));
  }, []);

  const handleStartListening = () => {
    if (!hasPermission) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => {
          setHasPermission(true);
          recognitionRef.current.start();
          setIsListening(true);
        })
        .catch((err) => console.error("Lỗi cấp quyền micro:", err));
    } else {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
      setIsListening(!isListening);
    }
  };

  const handleCommand = (text) => {
    if (text.includes("chuyển tới trang quản lý trẻ em")) {
      window.open("/member/children");
    } else if (text.includes("chuyển tới trang hồ sơ cá nhân")) {
      navigate("/member/profile");
    } else if (text.includes("chuyển tới trang chủ")) {
      navigate("/");
    } else {
      console.log("Không nhận diện được lệnh.");
    }
  };

  return (
    <div>
      <button onClick={handleStartListening}>
        {isListening ? "🛑 Dừng" : "🎙️ Bắt đầu"}
      </button>
      <p>{transcript ? `Bạn đã nói: ${transcript}` : "Chưa có dữ liệu..."}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.scss";
import { AiOutlineClose, AiOutlineMessage } from "react-icons/ai";
import { API_KEY } from "../../../chatbotkey.js";
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Thêm state isTyping
  const chatBoxRef = useRef(null);

  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        setMessages([{ role: "bot", content: "Hi, what can I help you?" }]);
      }
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true); // Bắt đầu hiển thị "..." khi bot đang trả lời

    try {
      const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
        contents: [{ parts: [{ text: input }] }],
      });

      const botMessage =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Xin lỗi, tôi không hiểu.";
      setMessages([...newMessages, { role: "bot", content: botMessage }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { role: "bot", content: "Lỗi khi gọi API" },
      ]);
    } finally {
      setIsTyping(false); // Ẩn "..." khi bot có câu trả lời
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot">
          <div className="chatbot-header">
            <span>ChatBot</span>
            <AiOutlineClose
              className="close-icon"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="chatbot-messages" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? "user-message" : "bot-message"}
              >
                {msg.content}
              </div>
            ))}
            {isTyping && <div className="bot-message typing">...</div>}{" "}
            {/* Hiển thị "..." khi bot đang gõ */}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Thêm sự kiện Enter
              placeholder="Enter here"
            />

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <AiOutlineMessage size={24} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;

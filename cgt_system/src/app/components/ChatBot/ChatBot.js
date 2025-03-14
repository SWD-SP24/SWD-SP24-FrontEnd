import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.scss";
import { AiOutlineClose, AiOutlineMessage } from "react-icons/ai";
import { API_KEY } from "../../../chatbotKey";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Tracks which category is expanded
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Tracks the selected question from predefined list
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

  const formatBotMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
      .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic text
      .replace(/\n/g, "<br />") // Line breaks
      .replace(/\- /g, "• "); // Change bullet points
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
        contents: [{ parts: [{ text: message }] }],
      });

      let botMessage =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Xin lỗi, tôi không hiểu.";

      botMessage = formatBotMessage(botMessage);

      setMessages([...newMessages, { role: "bot", content: botMessage }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { role: "bot", content: "Lỗi khi gọi API" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const predefinedQuestions = {
    vaccines: [
      "When should my child receive their first vaccine?",
      "What are the recommended vaccines for children?",
      "Are there any side effects to vaccinations?",
    ],
    growthIndicators: [
      "What is the normal weight for my child's age?",
      "How to monitor my child's growth rate?",
      "What are the common growth concerns in children?",
    ],
    oralHealth: [
      "When should I start brushing my child's teeth?",
      "What should I do if my child has a toothache?",
      "When should I take my child to the dentist?",
    ],
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle category
    setSelectedQuestion(null); // Reset selected question when changing categories
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    sendMessage(question); // Send the question immediately
    setSelectedCategory(null); // Close the category after sending the question
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
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            ))}
            {isTyping && <div className="bot-message typing">...</div>}
          </div>

          {/* Display questions above the categories section */}
          <div className="question-section">
            {selectedCategory && (
              <div className="question-list">
                {predefinedQuestions[selectedCategory].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="question-item"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Predefined categories section */}
          <div className="categories-section">
            {["vaccines", "growthIndicators", "oralHealth"].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`category-button ${selectedCategory === category ? "active" : ""}`}
              >
                {category === "vaccines" && "Vaccines"}
                {category === "growthIndicators" && "Child Growth"}
                {category === "oralHealth" && "Oral Health"}
              </button>
            ))}
          </div>

          {/* User input field */}
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Enter your message..."
            />
            <button onClick={() => sendMessage(input)}>Send</button>
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

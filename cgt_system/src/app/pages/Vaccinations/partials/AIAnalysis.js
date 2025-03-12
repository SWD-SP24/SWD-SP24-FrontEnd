import React, { useEffect, useState } from "react";
import { API_KEY } from "../../../../chatbotKey";
import "../vaccine.scss";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function AIAnalysis({ indicators }) {
  const [aiResponse, setAiResponse] = useState("");
  const age = localStorage.getItem("userAge");
  const bloodType = localStorage.getItem("bloodType");
  const gender = localStorage.getItem("gender");

  useEffect(() => {
    if (!indicators || indicators.length === 0) return;

    const fetchAIResponse = async () => {
      try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `
                                    📊 **AI Analysis - Tiêm Chủng**
                                    **Thông tin cá nhân:**
                                    - **Tuổi:** ${age}
                                    - **Nhóm máu:** ${bloodType}
                                    - **Giới tính:** ${gender}

                                    **Phân tích của chuyên gia:** 
                                    Dựa trên độ tuổi, nhóm máu và giới tính, hãy đưa ra nhận xét về tình trạng tiêm chủng phù hợp.
                                    
                                    **Lời khuyên:**
                                    - Những vắc-xin nào thường được khuyến nghị cho độ tuổi này?
                                    - Nếu chưa được tiêm đầy đủ, các bước tiếp theo nên làm gì?
                                    - Lưu ý nào quan trọng để đảm bảo sức khỏe tốt nhất?
                                    
                                    `,
                  },
                ],
              },
            ],
          }),
        });

        const data = await response.json();
        if (data && data.candidates) {
          let rawText =
            data.candidates[0]?.content?.parts[0]?.text || "Không có phản hồi.";
          let formattedText = rawText
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bôi đậm
            .replace(/\*(.*?)\*/g, "<em>$1</em>") // In nghiêng
            .replace(/\n/g, "<br />") // Xuống dòng
            .replace(/\- /g, "• "); // Thay thế dấu "-" thành "•"

          setAiResponse(formattedText);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API AI:", error);
        setAiResponse("Lỗi khi lấy phản hồi từ AI.");
      }
    };

    fetchAIResponse();
  }, [indicators]);

  return (
    <div className="card mt-4">
      <h5 className="card-header">AI Analysis</h5>
      <div className="card-body">
        <div
          dangerouslySetInnerHTML={{
            __html: aiResponse || "Analyzing...",
          }}
        />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { API_KEY } from "../../../../chatbotKey";
import "../vaccine.scss";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function AIAnalysis({ vaccinations }) {
  const [aiResponse, setAiResponse] = useState("");
  const name = localStorage.getItem("name");
  const age = localStorage.getItem("userAge");
  const bloodType = localStorage.getItem("bloodType");
  const gender = localStorage.getItem("gender");

  const vaccinationInfo = vaccinations
    .map(
      (vaccination) =>
        `${vaccination.vaccineName} - Dose: ${vaccination.dose} - Note: none  - Status: Completed`
    )
    .join(", ");

  useEffect(() => {
    if (!vaccinations || vaccinations.length === 0) return;

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
                                    Dưới đây là thông tin tiêm chủng của trẻ:  
🧒 **Tên bé:** ${name}, **Tuổi:** ${age}, 🩸 **Nhóm máu:** ${bloodType}, ⚧️ **Giới tính:** ${gender}.  
💉 **Lịch sử tiêm chủng:** ${vaccinationInfo}  

Hãy phân tích và phản hồi theo đúng format sau:  

📊 **Phân tích của chuyên gia**  

**💉 Nhận xét:** {Đánh giá tổng quan về tình trạng tiêm chủng, ví dụ: đã tiêm đầy đủ theo lịch, còn thiếu mũi nào, có phản ứng sau tiêm không}.  

**🔍 Nguy cơ tiềm ẩn:**  
- {Nếu thiếu mũi tiêm quan trọng, hãy phân tích nguy cơ mắc bệnh và ảnh hưởng}.  
- {Nếu đã tiêm đủ, xác nhận và nhấn mạnh tầm quan trọng của việc tiếp tục theo dõi}.  

**🛡️ Lời khuyên chăm sóc:**  
- **Tiêm chủng bổ sung:** {Nếu còn thiếu mũi, gợi ý thời gian và địa điểm tiêm}.  
- **Theo dõi phản ứng sau tiêm:** {Cách quan sát dấu hiệu bất thường, khi nào cần đến bác sĩ}.  
- **Tăng cường miễn dịch:** {Lời khuyên về dinh dưỡng, giấc ngủ giúp trẻ khỏe mạnh}.  

**🏥 Khi nào cần đi khám bác sĩ?**  
- {Gợi ý khi nào nên kiểm tra tình trạng miễn dịch, dấu hiệu bất thường sau tiêm cần thăm khám}.  

Không thêm nội dung nào ngoài format trên.

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
  }, [vaccinations]);

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

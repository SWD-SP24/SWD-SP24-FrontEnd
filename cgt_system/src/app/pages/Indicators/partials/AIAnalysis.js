import React, { useEffect, useState } from "react";
import { API_KEY } from "../../../../chatbotKey";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function AIAnalysis({ indicators }) {
  const [aiResponse, setAiResponse] = useState("");
  const name = localStorage.getItem("name");
  const age = localStorage.getItem("userAge");
  const bloodType = localStorage.getItem("bloodType");
  const gender = localStorage.getItem("gender");

  const currentIndicator = indicators[0];
  console.log(currentIndicator);

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
                    text: `Dưới đây là thông tin sức khỏe tổng quát của trẻ:  
🧒 **Tên bé:** ${name}, **Tuổi:** ${age}, 🩸 **Nhóm máu:** ${bloodType}, ⚧️ **Giới tính:** ${gender}.  
📏 **Chiều cao:** ${currentIndicator.height} cm, ⚖️ **Cân nặng:** ${currentIndicator.weight} kg, 📊 **BMI:** ${currentIndicator.bmi}  

Hãy phân tích và phản hồi theo đúng format sau:  

📊 **Phân tích của chuyên gia**  

**📏 Nhận xét:** {Đánh giá tổng quan về chỉ số sức khỏe, ví dụ: chiều cao và cân nặng có phù hợp với độ tuổi không, BMI có ở mức bình thường không}.  

**🔍 Nguy cơ tiềm ẩn:**  
- {Nếu BMI quá thấp/cao, phân tích nguyên nhân và nguy cơ}.  
- {Nếu chỉ số ở mức bình thường, xác nhận và khuyến khích duy trì lối sống lành mạnh}.  

**🛡️ Lời khuyên chăm sóc:**  
- **Chế độ dinh dưỡng:** {Gợi ý thực phẩm nên ăn hoặc tránh để duy trì cân nặng và chiều cao hợp lý}.  
- **Hoạt động thể chất:** {Đề xuất các bài tập phù hợp với lứa tuổi để hỗ trợ phát triển thể chất}.  
- **Thói quen tốt:** {Mẹo giúp trẻ khỏe mạnh như ngủ đủ giấc, uống nhiều nước, duy trì chế độ ăn cân đối}.  

**🏥 Khi nào cần đi khám bác sĩ?**  
- {Gợi ý khi nào cần tham khảo bác sĩ dinh dưỡng hoặc kiểm tra sức khỏe tổng quát}.  

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
  }, [indicators]);

  return (
    <div className="card mt-4">
      <h5 className="card-header">Analysis</h5>
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

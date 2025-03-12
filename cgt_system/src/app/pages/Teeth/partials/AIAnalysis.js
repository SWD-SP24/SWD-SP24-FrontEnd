import React, { useEffect, useState } from "react";
import { API_KEY } from "../../../../chatbotKey";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function AIAnalysis({ toothRecords }) {
  const [aiResponse, setAiResponse] = useState("");
  const age = localStorage.getItem("userAge");
  const bloodType = localStorage.getItem("bloodType");
  const gender = localStorage.getItem("gender");

  const toothInfo = toothRecords
    .map((tooth) => `${tooth.toothName} (${tooth.note})`)
    .join(", ");

  useEffect(() => {
    if (!toothRecords || toothRecords.length === 0) return;

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
                    text: `Dưới đây là thông tin sức khỏe răng miệng của trẻ:  
      🧒 **Tuổi:** ${age}, 🩸 **Nhóm máu:** ${bloodType}, ⚧️ **Giới tính:** ${gender}.  
      🦷 **Các răng đã mọc:** ${toothInfo}  
      
      Hãy phân tích và phản hồi theo đúng format sau:  

      📊 **Phân tích của chuyên gia**  
      
      **🦷 Nhận xét:** {Đánh giá tổng quan về tình trạng răng miệng, ví dụ: răng mọc đúng tiến độ, có dấu hiệu mọc lệch, tình trạng sâu răng, viêm nướu...}  
      
      **🔍 Nguy cơ tiềm ẩn:**  
      - {Nếu có vấn đề như răng mọc chậm, mọc lệch, sâu răng, hãy phân tích nguyên nhân và ảnh hưởng}.  
      - {Nếu không có vấn đề đáng lo, hãy xác nhận và khuyến khích duy trì thói quen tốt}.  
      
      **🛡️ Lời khuyên chăm sóc:**  
      - **Vệ sinh răng miệng:** {Hướng dẫn cách đánh răng đúng, số lần/ngày, có nên dùng chỉ nha khoa không}.  
      - **Chế độ ăn uống:** {Thực phẩm nên ăn/tránh để bảo vệ răng miệng}.  
      - **Thói quen tốt:** {Mẹo giúp răng khỏe như uống nhiều nước, hạn chế đồ ngọt, đi khám nha khoa định kỳ}.  
      
      **🏥 Khi nào nên đi khám nha khoa?**  
      - {Gợi ý tần suất khám răng định kỳ, dấu hiệu cần đi khám sớm}.  

      Không thêm nội dung nào ngoài format trên.`,
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
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchAIResponse();
  }, [toothRecords]);

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

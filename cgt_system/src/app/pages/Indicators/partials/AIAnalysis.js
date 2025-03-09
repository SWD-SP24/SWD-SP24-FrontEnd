import React, { useEffect, useState } from "react";
import { API_KEY } from "../../../../chatbotkey";

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
                                        text: `Dưới đây là chỉ số mới nhất của trẻ: ${JSON.stringify(indicators[0])}.  
                                               Tuổi: ${age}, Nhóm máu: ${bloodType}, Giới tính: ${gender}.  
                                               Hãy phân tích và phản hồi theo đúng format sau:  
                                               ---  
📊                                            **Phân tích của AI**  
 **Nhận xét:** {Đánh giá nhanh về tình trạng hiện tại, ví dụ: cân nặng hợp lý, BMI hơi thấp, tăng trưởng tốt, so với mặt bằng chung về độ tuổi, giới tính, nhóm máu}.  
**Lời khuyên:**  
- **Dinh dưỡng:** {Gợi ý thực phẩm cụ thể phù hợp với độ tuổi, ví dụ: Nếu thiếu cân, nên bổ sung protein, sữa, ngũ cốc nguyên hạt; nếu thừa cân, nên hạn chế đồ ngọt, tăng rau xanh}.  
- **Vận động:** {Gợi ý bài tập hoặc hoạt động phù hợp với độ tuổi, ví dụ: Nếu cần cải thiện chiều cao, nên tập bơi lội, nhảy dây; nếu muốn kiểm soát cân nặng, nên đi bộ, đạp xe}.  
- **Theo dõi:** {Khuyến nghị kiểm tra sức khỏe định kỳ hoặc cách tự theo dõi chỉ số}.  
---  
Không thêm nội dung nào ngoài format trên.`
                                    }
                                ]
                            }
                        ]
                    })

                });

                const data = await response.json();
                if (data && data.candidates) {
                    let rawText = data.candidates[0]?.content?.parts[0]?.text || "Không có phản hồi.";
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
                <div dangerouslySetInnerHTML={{ __html: aiResponse || "Đang phân tích..." }} />
            </div>
        </div>
    );
}

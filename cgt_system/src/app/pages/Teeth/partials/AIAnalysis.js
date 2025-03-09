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
                                        text: `
                                        📊 **AI Analysis - Tiêm Chủng & Sức Khỏe Răng Miệng**
                                        **Thông tin cá nhân:**
                                        - **Tuổi:** ${age}
                                        - **Nhóm máu:** ${bloodType}
                                        - **Giới tính:** ${gender}
    
                                        **Phân tích AI:** 
                                        Dựa trên độ tuổi, nhóm máu và giới tính, hãy đưa ra nhận xét về tình trạng sức khỏe răng miệng phù hợp.
                                        **Lời khuyên về răng miệng:**
                                        - Với độ tuổi này, có nguy cơ nào về răng miệng cần lưu ý không?
                                        - Nên có thói quen vệ sinh răng miệng như thế nào?
                                        - Khi nào cần đi khám nha khoa định kỳ?
                                        Trả lời với độ dài vừa phải, không quá dài
                                        `
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

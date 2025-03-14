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
                    text: `Below is the general health information of the child:  
🧒 **Name:** ${name}, **Age:** ${age}, 🩸 **Blood Type:** ${bloodType}, ⚧️ **Gender:** ${gender}.  
📏 **Height:** ${currentIndicator.height} cm, ⚖️ **Weight:** ${currentIndicator.weight} kg, 📊 **BMI:** ${currentIndicator.bmi}  

Please analyze and respond strictly following this format:  

📊 **Expert Analysis**  

**📏 Assessment:** {General evaluation of health indicators, e.g., whether height and weight are appropriate for age, and whether BMI is in the normal range}.  

**🔍 Potential Risks:**  
- {If BMI is too low/high, analyze possible causes and risks}.  
- {If indicators are within the normal range, confirm and encourage maintaining a healthy lifestyle}.  

**🛡️ Care Recommendations:**  
- **Nutrition:** {Suggest foods to eat or avoid to maintain appropriate weight and height}.  
- **Physical Activity:** {Recommend suitable exercises for the child’s age to support physical development}.  
- **Healthy Habits:** {Tips for maintaining good health, such as getting enough sleep, drinking plenty of water, and following a balanced diet}.  

**🏥 When to See a Doctor?**  
- {Suggest when to consult a nutritionist or undergo a general health check-up}.  

Do not include any content outside the format above.
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
        {indicators.length > 0 ? (
          <div
            dangerouslySetInnerHTML={{
              __html: aiResponse || "Analyzing...",
            }}
          />
        ) : (
          <div>No data to analyze</div>
        )}
      </div>
    </div>
  );
}

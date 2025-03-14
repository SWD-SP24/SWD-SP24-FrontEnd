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
                    text: `Below is the child's vaccination information:  
🧒 **Name:** ${name}, **Age:** ${age}, 🩸 **Blood Type:** ${bloodType}, ⚧️ **Gender:** ${gender}.  
💉 **Vaccination History:** ${vaccinationInfo}  

Please analyze and respond strictly following this format:  

📊 **Expert Analysis**  

**💉 Assessment:** {General evaluation of the vaccination status, e.g., whether the child has received all required doses, any missing vaccines, or any post-vaccination reactions}.  

**🔍 Potential Risks:**  
- {If important vaccines are missing, analyze the risk of disease and possible consequences}.  
- {If all vaccinations are complete, confirm and emphasize the importance of continued monitoring}.  

**🛡️ Care Recommendations:**  
- **Additional Vaccinations:** {If any vaccines are missing, suggest the recommended time and place for vaccination}.  
- **Post-Vaccination Monitoring:** {How to observe for abnormal reactions and when to consult a doctor}.  
- **Boosting Immunity:** {Advice on nutrition and sleep to help strengthen the child's immune system}.  

**🏥 When to See a Doctor?**  
- {Suggest when to check immune status and signs of abnormal reactions that require medical consultation}.  

Do not include any content outside the format above. `,
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
      <h5 className="card-header">Analysis</h5>
      <div className="card-body">
        {vaccinations.length > 0 ? (
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

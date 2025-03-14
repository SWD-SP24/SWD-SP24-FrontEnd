import React, { useEffect, useState } from "react";
import { API_KEY } from "../../../../chatbotKey";

const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function AIAnalysis({ toothRecords }) {
  const [aiResponse, setAiResponse] = useState("");
  const name = localStorage.getItem("name");
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
                    text: `Below is the child's oral health information:  
🧒 **Name:** ${name}, **Age:** ${age}, 🩸 **Blood Type:** ${bloodType}, ⚧️ **Gender:** ${gender}.  
🦷 **Teeth erupted:** ${toothInfo}  

Please analyze and respond strictly following this format:  

📊 **Expert Analysis**  

**🦷 Assessment:** {General evaluation of oral health, e.g., whether teeth are developing on schedule, signs of misalignment, cavities, or gum inflammation}.  

**🔍 Potential Risks:**  
- {If issues such as delayed tooth eruption, misalignment, or cavities are present, analyze the causes and impact}.  
- {If no significant concerns exist, confirm and encourage maintaining good oral hygiene}.  

**🛡️ Care Recommendations:**  
- **Oral Hygiene:** {Guide on proper brushing techniques, frequency per day, and whether to use dental floss}.  
- **Dietary Recommendations:** {Foods to eat or avoid for good dental health}.  
- **Healthy Habits:** {Tips for maintaining strong teeth, such as drinking plenty of water, limiting sugary foods, and visiting the dentist regularly}.  

**🏥 When to See a Dentist?**  
- {Suggest the recommended frequency of dental check-ups and signs indicating the need for an early visit}.  

Do not include any content outside the format above.`,
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
      <h5 className="card-header">Analysis</h5>
      <div className="card-body">
        {toothRecords.length > 0 ? (
          <div
            dangerouslySetInnerHTML={{
              __html: aiResponse || "Analyzing...",
            }}
          />
        ) : (
          <div>No data to analyzie</div>
        )}
      </div>
    </div>
  );
}

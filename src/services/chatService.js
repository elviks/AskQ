import { QWEN_KEY } from "../../config";

const apiKey = QWEN_KEY;

const chatService = async (message) => {
     try {
          const response = await fetch(
               "https://openrouter.ai/api/v1/chat/completions",
               {
                    method: "POST",
                    headers: {
                         Authorization: `Bearer ${apiKey}`,
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                         model: "qwen/qwen2.5-vl-32b-instruct:free",
                         messages: [
                              {
                                   role: "user",
                                   content: message,
                              },
                         ],
                    }),
               }
          );
          const data = await response.json();
          const messageRespondFromApi =
               data.choices?.[0]?.message?.content || "No response received.";
     } catch (error) {
          console.log("Api error: ", error);
     }
};

export default chatService;

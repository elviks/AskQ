import React from "react";
import { QWEN_KEY } from "../config";
const apiKey = QWEN_KEY;

const Api = async ({ userInput }) => {
     const response = awaitfetch(
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
                              content: [
                                   {
                                        type: "text",
                                        text: { userInput },
                                   },
                              ],
                         },
                    ],
               }),
          }
     );
     const data = await response.json();
     console.log(data);
};

export default Api;

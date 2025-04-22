import React, { useState } from "react";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import { QWEN_KEY } from "../config";

const apiKey = QWEN_KEY;

const App = () => {
     const [message, setMessage] = useState("");
     const [quests, setQuests] = useState([]);
     const [responses, setResponses] = useState([]);
     const [loading, setLoading] = useState(false);

     const handleSend = async () => {
          if (message.trim() !== "") {
               setQuests([...quests, message]);
               setMessage("");
               setLoading(true);
          }

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
                    data.choices?.[0]?.message?.content ||
                    "No response received.";
               setResponses([...responses, messageRespondFromApi]);
          } catch (error) {
               console.log(error);
               setResponses([
                    ...responses,
                    "An error occurred while responding",
               ]);
          } finally {
               setLoading(false);
          }
     };

     const hasStarted = quests.length > 0;

     return (
          <div
               className="bg-gray-800 text-white min-h-screen flex flex-col"
               style={{ fontFamily: "Montserrat" }}
          >
               <nav className="sticky top-0 z-10 bg-gray-900 w-full text-center p-6 text-3xl md:text-5xl font-bold shadow-md">
                    AskQ <pre className="text-sm mt-3">ChatGPT, but better.</pre>
               </nav>

               <main className="flex-1 overflow-y-auto px-4 py-6 md:px-10">
                    {!hasStarted ? (
                         <div className="flex flex-1 items-center justify-center h-[calc(100vh-120px)]">
                              <div className="text-center">
                                   <img
                                        src="src/assets/bot.png"
                                        width={100}
                                        className="animate-bounce mb-4 mx-auto"
                                        alt="Bot"
                                   />
                                   <p
                                        className="text-2xl text-white"
                                        style={{ fontFamily: "Roboto" }}
                                   >
                                        How can I help you?
                                   </p>
                              </div>
                         </div>
                    ) : (
                         <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                              {quests.map((quest, index) => (
                                   <div
                                        key={index}
                                        className="flex flex-col gap-4"
                                   >
                                        <div className="self-end bg-gray-700 px-4 py-2 rounded-lg max-w-full">
                                             {quest}
                                        </div>
                                        {index < responses.length ? (
                                             <div className="self-start bg-gray-900 px-4 py-2 rounded-lg max-w-full">
                                                  {responses[index]}
                                             </div>
                                        ) : loading &&
                                          index === quests.length - 1 ? (
                                             <div className="self-start bg-gray-900 px-4 py-2 rounded-lg max-w-full">
                                                  Thinking...
                                             </div>
                                        ) : null}
                                   </div>
                              ))}
                         </div>
                    )}
               </main>

               <footer className="bg-gray-800 w-full px-4 py-6 md:px-10 sticky bottom-0">
                    <div className="flex items-center max-w-2xl mx-auto">
                         <input
                              type="text"
                              className="flex-1 px-4 py-3 rounded-l-lg bg-white text-gray-900 text-base focus:border-blue-500 outline-none"
                              placeholder="Ask anything..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyDown={(e) => {
                                   if (e.key === "Enter") handleSend();
                              }}
                         />
                         <button
                              className="px-6 py-3 rounded-r-lg bg-black text-white font-semibold hover:bg-gray-900 transition-all"
                              onClick={handleSend}
                         >
                              ▶︎
                         </button>
                    </div>
               </footer>
          </div>
     );
};

export default App;

// import React, { useState } from "react";
// import "@fontsource/roboto";
// import "@fontsource/montserrat";
// import { QWEN_KEY } from "../config";

// const apiKey = QWEN_KEY;

// const App = () => {
//      const [message, setMessage] = useState("");
//      const [quests, setQuests] = useState([]);
//      const [responses, setResponses] = useState([]);
//      const [loading, setLoading] = useState(false);
//      const handleSend = async () => {
//           if (message.trim() != "") {
//                setQuests([...quests, message]);
//                setMessage("");
//                setLoading(true);
//           }

//           //  ====

//           try {
//                const response = await fetch(
//                     "https://openrouter.ai/api/v1/chat/completions",
//                     {
//                          method: "POST",
//                          headers: {
//                               Authorization: `Bearer ${apiKey}`,
//                               "Content-Type": "application/json",
//                          },
//                          body: JSON.stringify({
//                               model: "qwen/qwen2.5-vl-32b-instruct:free",
//                               messages: [
//                                    {
//                                         role: "user",
//                                         content: message,
//                                    },
//                               ],
//                          }),
//                     }
//                );
//                const data = await response.json();
//                console.log(data);
//                const messageRespondFromApi =
//                     data.choices?.[0]?.message?.content ||
//                     "No response received.";
//                setResponses([...responses, messageRespondFromApi]);
//           } catch (error) {
//                console.log(error);
//                setResponses([
//                     ...responses,
//                     "An error occured while responding",
//                ]);
//           } finally {
//                setLoading(false);
//           }
//      };

//      //  ====
//      return (
//           <div
//                className="bg-gray-800 text-white h-screen  flex flex-col justify-between items-center"
//                style={{ fontFamily: "Montserrat" }}
//           >
//                <nav className="flex justify-center items-center p-6 text-5xl font-bold ">
//                     Kalu AI
//                </nav>
//                <main className="flex justify-center flex-col items-center w-3xl">
//                     <img
//                          src="src/assets/bot.png"
//                          width={100}
//                          className="animate-bounce"
//                     />
//                     <p className="text-2xl" style={{ fontFamily: "Roboto" }}>
//                          How can i help you?
//                     </p>
//                     <div className="w-fit p-4 ">
//                          {quests.map((quest, index) => (
//                               <div key={index} className="mb-4">
//                                    {/* User message */}
//                                    <div className="bg-gray-700 px-4 py-2 rounded-lg w-lg self-end float-right mt-4">
//                                         {quest}
//                                    </div>

//                                    {/* AI response */}
//                                    {index < responses.length ? (
//                                         <div className="bg-gray-900 px-4 py-2 rounded-lg w-lg self-start mt-4 float-left">
//                                              {responses[index]}
//                                         </div>
//                                    ) : loading &&
//                                      index === quests.length - 1 ? (
//                                         <div className="bg-gray-900 px-4 py-2 rounded-lg w-lg self-start mt-4 float-left">
//                                              Thinking...
//                                         </div>
//                                    ) : null}
//                               </div>
//                          ))}
//                     </div>
//                </main>
//                <footer className="flex flex-col items-center bg-gray-800 w-full">
//                     {/* <div className="w-fit text-right self-end max-w-xl bg-gray-700 px-4 py-2 rounded-lg">
//                          {quests.map((qn, index) => {
//                               return (
//                                    <li key={index} className="list-none">
//                                         {qn}
//                                    </li>
//                               );
//                          })}
//                     </div>
//                     <div className="w-fit text-left self-start max-w-xl bg-gray-900 px-4 py-2 rounded-lg ">
//                          {responses.map((res, index) => {
//                               return (
//                                    <li key={index} className="list-none">
//                                         {res}
//                                    </li>
//                               );
//                          })}
//                     </div> */}
//                     <div className="w-3xl flex justify-between py-10">
//                          <input
//                               type="text"
//                               className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-900 text-base  focus:border-blue-500 outline-none transition-all duration-200"
//                               placeholder="Ask anything..."
//                               value={message}
//                               onChange={(e) => setMessage(e.target.value)}
//                          />
//                          <button
//                               type="submit"
//                               className="px-6 py-3 rounded-r-lg bg-black text-white font-semibold hover:bg-bl"
//                               onClick={handleSend}
//                          >
//                               ▶︎
//                          </button>
//                     </div>
//                </footer>
//           </div>
//      );
// };

// export default App;

import { useState, useRef, useEffect } from "react";
import "../Styles/Aichat.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function Aichat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current && userSubmitted) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      setUserSubmitted(false); // Reset after scrolling once
    }
  }, [chatHistory]);
  
  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;
  
    setGeneratingAnswer(true);
    setUserSubmitted(true); // Enable scrolling only when the user submits
    const currentQuestion = question;
    setQuestion("");
  
    setChatHistory(prev => [...prev, { type: "question", content: currentQuestion }]);
  
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
  
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory(prev => [...prev, { type: "answer", content: aiResponse }]);
      setAnswer(aiResponse);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
  
    setGeneratingAnswer(false);
  }

  return (
    <div className="inset-0 bg-color">
      <div className="max-w-4xl mx-auto flex flex-col p-3">
        {/* Fixed Header */}
        <header className="text-center py-4">
            <h1 className="text-4xl font-bold text-white transition-colors">
              Sera - Your Own AI Bot
            </h1>
        </header>

        {/* Scrollable Chat Container - Updated className */}
        <div 
  ref={chatContainerRef}
  className="h-full chat-container flex-1 mb-7 rounded-lg bg-white shadow-lg p-4 hide-scrollbar"
>
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-6">
              <div className="bg-blue-50 rounded-xl p-8 max-w-2xl">
                <h2 className="text-2xl font-bold text-black mb-4">Chat with Sera!</h2>
                <p className="text-gray-600 mb-4">
                  I'm here to help you with anything you'd like to know. You can ask me about:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-color p-4 rounded-lg shadow-sm">
                    <span className="text-blue-500">💡</span> Emotional Support 
                  </div>
                  <div className="bg-color p-4 rounded-lg shadow-sm">
                    <span className="text-blue-500">🤔</span> Active Listening
                  </div>
                  <div className="bg-color p-4 rounded-lg shadow-sm">
                    <span className="text-blue-500">📝</span> Mindfulness Strategies
                  </div>
                  <div className="bg-color p-4 rounded-lg shadow-sm">
                    <span className="text-blue-500">🔧</span> 24/7 Availability
                  </div>
                </div>
                <p className="text-gray-500 mt-6 text-sm">
                  Just type your question below and press Enter or click Send!
                </p>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-4 ${chat.type === 'question' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-[80%] p-3 rounded-lg hide-scrollbar ${
                    chat.type === 'question' 
                      ? 'bg-purple-400 text-white rounded-br-none'
                      : 'bg-gray-400 text-white rounded-bl-none'
                  }`}>
                    <ReactMarkdown className="hide-scrollbar">{chat.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </>
          )}
          {generatingAnswer && (
            <div className="text-left">
              <div className="inline-block bg-black p-3 rounded-lg animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Fixed Input Form */}
        <form onSubmit={generateAnswer} className="bg-color rounded-lg shadow-lg p-4">
          <div className="flex gap-2">
            <input
              required
              className="flex-1 border border-gray-300 rounded p-3 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></input>
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
                generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Aichat;
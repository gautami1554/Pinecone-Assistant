import React from 'react'
import { useState, useEffect, useRef } from "react"
import Dropdown from "./dropdown"
import { KeyboardArrowUp, DeleteOutline } from "@mui/icons-material"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"

const Playground = () => {
  const userName = "user" // Replace this with the name given while logging in
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showClearDialog, setShowClearDialog] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { sender: "user", text: input, timestamp: new Date() }
    setMessages([...messages, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate assistant response after a delay
    setTimeout(() => {
      const assistantMessage = {
        sender: "assistant",
        text: "I'm Pinecone, your AI assistant. How can I help you today?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Clear chat history
  const clearChat = () => {
    setMessages([])
    setShowClearDialog(false)
  }

  return (
    <div className="bg-white flex flex-col justify-between h-screen">
      {/* Top Bar */}
      <div className="p-4 bg-white flex items-center justify-between border-b border-gray-200 shadow-sm h-16">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-gray-800">Assistant playground</span>
          <Dropdown userName={userName} />
        </div>
      </div>

      {/* Chat Display Area */}
      <div className="flex-grow bg-white p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex justify-center items-center text-gray-600">
            <div className="text-center">
              <p className="text-center text-gray-500">
                <span className="font-bold text-2xl text-black">Pinecone</span>
                <br />
                Your assistant is set up. Get started by uploading your files.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-6 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block max-w-[80%] rounded-lg p-4 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}

            {/* Assistant typing indicator */}
            {isTyping && (
              <div className="mb-6 text-left">
                <div className="inline-block max-w-[80%] rounded-lg p-4 bg-white border border-gray-200">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Text Input Bar */}
      <div className="p-4 bg-gray-100 border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full p-3 pr-12 border rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50"
              disabled={!input.trim()}
            >
              <KeyboardArrowUp className="h-5 w-5" />
            </button>
          </form>

          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">Press Enter to send your message</p>
            {messages.length > 0 && (
              <button
                onClick={() => setShowClearDialog(true)}
                className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-1"
              >
                <DeleteOutline className="h-3 w-3" />
                CLEAR
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Clear Chat Dialog */}
      <Dialog open={showClearDialog} onClose={() => setShowClearDialog(false)}>
        <DialogTitle>Clear conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear the entire conversation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowClearDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={clearChat} color="error">
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Playground


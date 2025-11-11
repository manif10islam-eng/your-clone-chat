import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/ChatMessage";
import { useChat } from "@/hooks/useChat";
import { Send, Loader2 } from "lucide-react";

const Index = () => {
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Muhammad Chatbot</h1>
          <p className="text-sm text-muted-foreground mt-1">Ask me anything!</p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Start a conversation</h2>
              <p className="text-muted-foreground max-w-md">Type a message below to begin chatting with the AI assistant.</p>
            </div>
          ) : (
            messages.map((msg, idx) => <ChatMessage key={idx} role={msg.role} content={msg.content} />)
          )}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
              </div>
              <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-chat-ai text-chat-ai-foreground rounded-bl-sm border border-border">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="border-t border-border bg-card shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="flex-shrink-0">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Index;

import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm",
          isUser ? "bg-chat-user text-chat-user-foreground rounded-br-sm" : "bg-chat-ai text-chat-ai-foreground rounded-bl-sm border border-border"
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{content}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <User className="w-5 h-5 text-accent-foreground" />
        </div>
      )}
    </div>
  );
};

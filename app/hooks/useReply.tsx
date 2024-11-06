import { useContext } from "react";
import { ReplyContext } from "@/app/context/ReplyProvider";

export function useReply() {
  const context = useContext(ReplyContext)
  if (!context) {
    throw new Error('useReply must be used within an AuthProvider');
  }

  return context
}
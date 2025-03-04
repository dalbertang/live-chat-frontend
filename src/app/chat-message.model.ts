export interface ChatMessage {
  id?: string;
  sender: string;
  content: string;
  timestamp: string;
  parentId?: string; // If it's a reply, this contains the parent message ID
}

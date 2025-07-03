import React, { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Info, Smile, Paperclip, ArrowLeft, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';
import VideoCallInterface from './VideoCallInterface';
import FileAttachment from './FileAttachment';
import EmojiPicker from './EmojiPicker';
import { useToast } from '../../hooks/use-toast';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  isOnline?: boolean;
}

const MessagesContent: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [showFileAttachment, setShowFileAttachment] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { toast } = useToast();

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      lastMessage: 'Hey! Are you ready for the calculus exam tomorrow?',
      timestamp: '2 min ago',
      unread: 2,
      avatar: 'SC',
      isOnline: true
    },
    {
      id: '2',
      name: 'Study Group - CS101',
      lastMessage: 'Meeting at 3 PM in the library',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: 'SG',
      isOnline: false
    },
    {
      id: '3',
      name: 'Alex Rodriguez',
      lastMessage: 'Thanks for sharing your notes!',
      timestamp: '3 hours ago',
      unread: 1,
      avatar: 'AR',
      isOnline: true
    },
    {
      id: '4',
      name: 'Emma Thompson',
      lastMessage: 'Can we schedule a tutoring session?',
      timestamp: 'Yesterday',
      unread: 0,
      avatar: 'ET',
      isOnline: false
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Chen',
      content: 'Hey! Are you ready for the calculus exam tomorrow?',
      timestamp: '2:30 PM',
      isMe: false,
      status: 'read'
    },
    {
      id: '2',
      sender: 'You',
      content: 'I think so! I\'ve been studying all week. How about you?',
      timestamp: '2:32 PM',
      isMe: true,
      status: 'delivered'
    },
    {
      id: '3',
      sender: 'Sarah Chen',
      content: 'Same here. Want to do a quick review session together?',
      timestamp: '2:33 PM',
      isMe: false,
      status: 'read'
    },
    {
      id: '4',
      sender: 'You',
      content: 'That sounds great! Meet at the library in 30 minutes?',
      timestamp: '2:35 PM',
      isMe: true,
      status: 'sent'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim() || attachedFiles.length > 0) {
      console.log('Sending message:', newMessage);
      if (attachedFiles.length > 0) {
        console.log('With attachments:', attachedFiles);
        toast({
          title: "Files sent",
          description: `${attachedFiles.length} file(s) sent successfully`,
        });
      }
      setNewMessage('');
      setAttachedFiles([]);
      setShowFileAttachment(false);
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setShowMobileChat(true);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
  };

  const handleVideoCall = () => {
    setIsVideoCallActive(true);
    toast({
      title: "Video call started",
      description: "Connecting to video call...",
    });
  };

  const handleVoiceCall = () => {
    toast({
      title: "Voice call started",
      description: "Connecting to voice call...",
    });
  };

  const handleEndCall = () => {
    setIsVideoCallActive(false);
    toast({
      title: "Call ended",
      description: "Video call has been ended",
    });
  };

  const handleFileSelect = (files: any[]) => {
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="max-w-7xl mx-auto">
      <VideoCallInterface
        isActive={isVideoCallActive}
        onEndCall={handleEndCall}
        participantName={selectedConv?.name || ''}
        participantAvatar={selectedConv?.avatar || ''}
      />

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-140px)]">
        <div className="flex h-full">
          {/* Conversations List - Desktop always visible, Mobile conditionally hidden */}
          <div className={`w-full md:w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-gray-50 dark:bg-gray-800/50 ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            {/* Header with enhanced styling */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">M</span>
                </div>
                Messages
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500 rounded-xl"
                />
              </div>
            </div>

            {/* Conversations with enhanced design */}
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 group relative ${
                      selectedConversation === conversation.id
                        ? 'bg-white dark:bg-gray-900 shadow-lg border border-blue-200 dark:border-blue-800 transform scale-[1.02]'
                        : 'hover:bg-white/70 dark:hover:bg-gray-700/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                          {conversation.avatar}
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-blue-500 hover:bg-blue-600 text-white min-w-[20px] h-5 text-xs rounded-full flex items-center justify-center">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area - Enhanced design */}
          <div className={`flex-1 flex flex-col ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            {selectedConversation && selectedConv ? (
              <>
                {/* Enhanced Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={handleBackToList}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                        {selectedConv.avatar}
                      </div>
                      {selectedConv.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {selectedConv.name}
                      </h3>
                      <p className="text-sm text-green-500 font-medium">
                        {selectedConv.isOnline ? 'Online' : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={handleVoiceCall}
                    >
                      <Phone className="w-5 h-5 text-blue-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={handleVideoCall}
                    >
                      <Video className="w-5 h-5 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-50 dark:hover:bg-gray-800">
                      <Info className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* File Attachment Panel */}
                {showFileAttachment && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <FileAttachment
                      onFileSelect={handleFileSelect}
                      attachedFiles={attachedFiles}
                      onRemoveFile={handleRemoveFile}
                    />
                  </div>
                )}

                {/* Enhanced Messages Area */}
                <ScrollArea className="flex-1 p-6 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md relative group ${message.isMe ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`px-4 py-3 rounded-2xl shadow-sm ${
                              message.isMe
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-md'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                          <div className={`flex items-center mt-1 space-x-1 ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {message.timestamp}
                            </span>
                            {message.isMe && message.status && (
                              <div className={`text-xs ${
                                message.status === 'read' ? 'text-blue-500' :
                                message.status === 'delivered' ? 'text-gray-400' : 'text-gray-300'
                              }`}>
                                ✓✓
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Enhanced Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      onClick={() => setShowFileAttachment(!showFileAttachment)}
                    >
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="pr-12 rounded-full border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        >
                          <Smile className="w-5 h-5" />
                        </Button>
                        <EmojiPicker
                          isOpen={showEmojiPicker}
                          onEmojiSelect={handleEmojiSelect}
                          onClose={() => setShowEmojiPicker(false)}
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage} 
                      size="icon"
                      className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="text-center text-gray-500 dark:text-gray-400 max-w-md">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Welcome to Messages</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Select a conversation from the sidebar to start messaging with your classmates and study groups.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesContent;

import React, { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Info, Smile, Paperclip, ArrowLeft, Plus, Star, Archive, Bell, BellOff } from 'lucide-react';
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

      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden h-[calc(100vh-140px)] animate-fade-in">
        <div className="flex h-full">
          {/* Enhanced Conversations List */}
          <div className={`w-full md:w-80 border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col bg-gradient-to-b from-gray-50/50 via-blue-50/20 to-purple-50/20 dark:from-gray-800/50 dark:via-blue-900/10 dark:to-purple-900/10 ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            {/* Enhanced Header */}
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">M</span>
                  </div>
                  Messages
                </h2>
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Plus className="w-5 h-5 text-blue-600" />
                </Button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500/50 rounded-xl backdrop-blur-sm transition-all"
                />
              </div>
            </div>

            {/* Enhanced Conversations with animations */}
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-2">
                {conversations.map((conversation, index) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationSelect(conversation.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 group relative overflow-hidden animate-fade-in hover:scale-[1.02] ${
                      selectedConversation === conversation.id
                        ? 'bg-white/90 dark:bg-gray-900/90 shadow-xl border border-blue-200/50 dark:border-blue-800/50 transform scale-[1.02] backdrop-blur-lg'
                        : 'hover:bg-white/60 dark:hover:bg-gray-800/60 hover:shadow-lg backdrop-blur-sm'
                    }`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      background: selectedConversation === conversation.id 
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)' 
                        : undefined
                    }}
                  >
                    {/* Subtle gradient overlay for selected item */}
                    {selectedConversation === conversation.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
                    )}
                    
                    <div className="flex items-start space-x-3 relative z-10">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg hover:shadow-xl transition-shadow">
                          {conversation.avatar}
                        </div>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white dark:border-gray-900 shadow-lg animate-pulse"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {conversation.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {conversation.timestamp}
                            </span>
                            {conversation.unread > 0 && (
                              <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white min-w-[20px] h-5 text-xs rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate leading-relaxed">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Enhanced Chat Area */}
          <div className={`flex-1 flex flex-col ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            {selectedConversation && selectedConv ? (
              <>
                {/* Enhanced Chat Header with gradient */}
                <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-white/80 via-blue-50/30 to-purple-50/30 dark:from-gray-900/80 dark:via-blue-900/10 dark:to-purple-900/10 backdrop-blur-sm flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={handleBackToList}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {selectedConv.avatar}
                      </div>
                      {selectedConv.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-md animate-pulse"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {selectedConv.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${selectedConv.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        <p className={`text-sm font-medium ${selectedConv.isOnline ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                          {selectedConv.isOnline ? 'Active now' : 'Last seen recently'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-110 transition-all"
                      onClick={handleVoiceCall}
                    >
                      <Phone className="w-5 h-5 text-green-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-110 transition-all"
                      onClick={handleVideoCall}
                    >
                      <Video className="w-5 h-5 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-110 transition-all">
                      <Info className="w-5 h-5 text-gray-600" />
                    </Button>
                  </div>
                </div>

                {/* Enhanced File Attachment Panel */}
                {showFileAttachment && (
                  <div className="p-4 bg-gradient-to-r from-gray-50/80 to-blue-50/40 dark:from-gray-800/80 dark:to-blue-900/20 border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm animate-fade-in">
                    <FileAttachment
                      onFileSelect={handleFileSelect}
                      attachedFiles={attachedFiles}
                      onRemoveFile={handleRemoveFile}
                    />
                  </div>
                )}

                {/* Enhanced Messages Area with better gradients */}
                <ScrollArea className="flex-1 p-6 bg-gradient-to-br from-gray-50/30 via-blue-50/10 to-purple-50/10 dark:from-gray-800/30 dark:via-blue-900/5 dark:to-purple-900/5">
                  <div className="space-y-6">
                    {messages.map((message, index) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'} animate-fade-in`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`max-w-xs lg:max-w-md relative group ${message.isMe ? 'order-2' : 'order-1'}`}>
                          <div
                            className={`px-5 py-3 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl ${
                              message.isMe
                                ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white rounded-br-md transform hover:scale-[1.02]'
                                : 'bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-700/30 rounded-bl-md hover:bg-white dark:hover:bg-gray-800'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                          <div className={`flex items-center mt-2 space-x-2 ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                              {message.timestamp}
                            </span>
                            {message.isMe && message.status && (
                              <div className={`text-xs font-medium ${
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

                {/* Enhanced Message Input with better styling */}
                <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-white/80 via-blue-50/30 to-purple-50/30 dark:from-gray-900/80 dark:via-blue-900/10 dark:to-purple-900/10 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-110 transition-all"
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
                        className="pr-12 rounded-2xl border-gray-300/50 dark:border-gray-600/50 focus:ring-2 focus:ring-blue-500/50 focus:border-transparent bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all shadow-sm hover:shadow-md"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full text-gray-500 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:scale-110 transition-all"
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
                      className="rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50/50 via-blue-50/20 to-purple-50/20 dark:from-gray-800/50 dark:via-blue-900/10 dark:to-purple-900/10">
                <div className="text-center text-gray-500 dark:text-gray-400 max-w-md animate-fade-in">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Send className="w-12 h-12 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Welcome to Messages</h3>
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


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Send, Link, MessageCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: any[];
  shares: number;
  type: string;
  isLiked: boolean;
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onShare: (postId: number, message?: string, recipients?: string[]) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, post, onShare }) => {
  const [shareMessage, setShareMessage] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [shareType, setShareType] = useState<'public' | 'direct' | 'link'>('public');
  const { toast } = useToast();

  // Mock contacts for demonstration
  const contacts = [
    { id: '1', name: 'Sarah Chen', avatar: '👩‍💻', online: true },
    { id: '2', name: 'Mike Thompson', avatar: '👨‍🔬', online: true },
    { id: '3', name: 'Emma Davis', avatar: '👩‍🎨', online: false },
    { id: '4', name: 'Alex Johnson', avatar: '👨‍💼', online: true },
  ];

  const handleShare = () => {
    if (!post) return;

    if (shareType === 'direct' && selectedRecipients.length === 0) {
      toast({
        description: "Please select at least one recipient",
        variant: "destructive",
      });
      return;
    }

    onShare(post.id, shareMessage, selectedRecipients);
    
    // Reset form
    setShareMessage('');
    setSelectedRecipients([]);
    setShareType('public');
    onClose();

    // Show success message based on share type
    const message = shareType === 'link' 
      ? "Link copied to clipboard!" 
      : shareType === 'direct' 
        ? `Post shared with ${selectedRecipients.length} ${selectedRecipients.length === 1 ? 'person' : 'people'}`
        : "Post shared publicly!";
    
    toast({
      description: message,
      duration: 3000,
    });
  };

  const toggleRecipient = (contactId: string) => {
    setSelectedRecipients(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const copyLink = () => {
    const link = `${window.location.origin}/post/${post?.id}`;
    navigator.clipboard.writeText(link);
    setShareType('link');
    handleShare();
  };

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Share Post</span>
          </DialogTitle>
        </DialogHeader>

        {/* Post Preview */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-sm">
              {post.avatar}
            </div>
            <div>
              <p className="font-semibold text-sm">{post.author}</p>
              <p className="text-xs text-gray-500">{post.time} ago</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {post.content}
          </p>
        </div>

        {/* Share Options */}
        <div className="space-y-4">
          {/* Share Type Buttons */}
          <div className="flex space-x-2">
            <Button
              variant={shareType === 'public' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShareType('public')}
              className="flex-1"
            >
              <Users className="w-4 h-4 mr-2" />
              Public
            </Button>
            <Button
              variant={shareType === 'direct' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShareType('direct')}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Direct
            </Button>
            <Button
              variant={shareType === 'link' ? 'default' : 'outline'}
              size="sm"
              onClick={copyLink}
              className="flex-1"
            >
              <Link className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>

          {/* Share Message */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Add a message (optional)
            </label>
            <Textarea
              placeholder="What do you think about this post?"
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Recipients (only for direct sharing) */}
          {shareType === 'direct' && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select recipients
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                      selectedRecipients.includes(contact.id)
                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => toggleRecipient(contact.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-sm">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{contact.name}</p>
                        <p className="text-xs text-gray-500">
                          {contact.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    {selectedRecipients.includes(contact.id) && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <X className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share Button */}
          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleShare} className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Share Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;

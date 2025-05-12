import React, { useState } from 'react';
import Button from '../ui/Button';
import { Send } from 'lucide-react';

interface CommentFormProps {
  onSubmit: (text: string) => Promise<boolean>;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    const success = await onSubmit(text);
    
    if (success) {
      setText('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start space-x-3">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a comment..."
        className="input flex-1"
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        variant="primary"
        size="sm"
        isLoading={isSubmitting}
        disabled={!text.trim() || isSubmitting}
        icon={<Send className="h-4 w-4" />}
      >
        Send
      </Button>
    </form>
  );
};

export default CommentForm;
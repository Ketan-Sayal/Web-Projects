import { BookOpen, CheckCircle, Star, Book } from "lucide-react";
export const getStatusIcon = (status) => {
    switch (status) {
      case 'currently-reading':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Book className="h-5 w-5 text-gray-600" />;
    }
  };

export const getStatusText = (status) => {
    switch (status) {
      case 'currently-reading':
        return 'Currently Reading';
      case 'completed':
        return 'Completed';
      case 'want-to-read':
        return 'Want to Read';
      default:
        return 'Unknown';
    }
  };

export const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

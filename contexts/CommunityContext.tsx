
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CommunityPost, Comment } from '../types';
import { CURRENT_USER } from '../constants';

interface CommunityContextType {
  posts: CommunityPost[];
  addPost: (title: string, content: string, category: CommunityPost['category']) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      authorName: 'Sarah Lee',
      authorAvatar: 'https://picsum.photos/200?random=20',
      role: 'Alumni',
      title: 'Best resources for Data Structures?',
      content: 'I am struggling a bit with Graphs. Does anyone have recommendations for good video tutorials or practice sites besides LeetCode?',
      category: 'Academic',
      likes: 12,
      isLiked: false,
      timestamp: '2 hours ago',
      comments: [
        {
          id: 'c1',
          authorName: 'Mark Chen',
          content: 'Check out the NeetCode roadmap. It helped me a ton!',
          timestamp: '1 hour ago',
          isAuthor: false
        }
      ]
    },
    {
      id: '2',
      authorName: 'David Kim',
      authorAvatar: 'https://picsum.photos/200?random=21',
      role: '2nd Year',
      title: 'Anyone selling their old drafter?',
      content: 'Need one for the Engineering Graphics lab next week. Condition doesn\'t matter as long as it works.',
      category: 'Campus Life',
      likes: 5,
      isLiked: false,
      timestamp: '5 hours ago',
      comments: []
    }
  ]);

  const addPost = (title: string, content: string, category: CommunityPost['category']) => {
    const newPost: CommunityPost = {
      id: crypto.randomUUID(),
      authorName: CURRENT_USER.name,
      authorAvatar: CURRENT_USER.avatarUrl,
      role: CURRENT_USER.yearOfStudy,
      title,
      content,
      category,
      likes: 0,
      isLiked: false,
      comments: [],
      timestamp: 'Just now'
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const addComment = (postId: string, content: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: crypto.randomUUID(),
          authorName: CURRENT_USER.name,
          content,
          timestamp: 'Just now',
          isAuthor: true
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
  };

  return (
    <CommunityContext.Provider value={{ posts, addPost, toggleLike, addComment }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};

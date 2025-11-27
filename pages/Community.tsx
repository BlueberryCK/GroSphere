
import React, { useState } from 'react';
import { Search, MessageSquare, ThumbsUp, Send, User, Lock, Tag, Filter } from 'lucide-react';
import { useCommunity } from '../contexts/CommunityContext';
import { CURRENT_USER } from '../constants';
import { CommunityPost } from '../types';

export const Community: React.FC = () => {
  const { posts, addPost, toggleLike, addComment } = useCommunity();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // New Post State
  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityPost['category']>('General');
  
  // Comment Visibility State
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const categories = ['All', 'Academic', 'Career', 'Campus Life', 'General'];

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    addPost(newTitle, newContent, newCategory);
    setNewTitle('');
    setNewContent('');
    setIsPosting(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const content = commentInputs[postId];
    if (!content?.trim()) return;
    addComment(postId, content);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen bg-slate-50">
      
      {/* Header Banner */}
      <div className="mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center">
            <span className="bg-blue-100 p-2 rounded-lg mr-3">
              <User className="w-5 h-5 text-blue-600" />
            </span>
            Student Community
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-lg">
            A verified space for {CURRENT_USER.department} students to ask questions, share resources, and support each other.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
          <Lock className="w-3 h-3 mr-1.5" />
          Restricted to Department Students
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Filters */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <Filter className="w-4 h-4 mr-2" /> Categories
            </h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-xl p-4 text-white shadow-md">
            <h3 className="font-bold text-sm mb-2">Community Guidelines</h3>
            <ul className="text-xs space-y-2 opacity-90 list-disc list-inside">
              <li>Be respectful and constructive.</li>
              <li>Keep discussions relevant to college life.</li>
              <li>No spam or self-promotion.</li>
            </ul>
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Mobile */}
          <div className="flex flex-col sm:flex-row gap-3 lg:hidden">
            <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border ${
                    activeCategory === cat 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Create Post Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {!isPosting ? (
              <div 
                onClick={() => setIsPosting(true)}
                className="p-4 flex items-center cursor-text hover:bg-slate-50 transition-colors"
              >
                <img 
                  src={CURRENT_USER.avatarUrl} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full border border-slate-200 mr-3"
                />
                <div className="flex-1 bg-slate-100 rounded-full h-10 flex items-center px-4 text-slate-500 text-sm">
                  What's on your mind, {CURRENT_USER.name.split(' ')[0]}?
                </div>
              </div>
            ) : (
              <form onSubmit={handlePostSubmit} className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900">Ask the Community</h3>
                  <button 
                    type="button" 
                    onClick={() => setIsPosting(false)}
                    className="text-slate-400 hover:text-slate-600 text-sm"
                  >
                    Cancel
                  </button>
                </div>
                
                <input
                  type="text"
                  placeholder="Title (e.g., Question about Physics Lab)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-lg font-medium placeholder-slate-400 border-none focus:ring-0 p-0 mb-3"
                  autoFocus
                />
                
                <textarea
                  placeholder="Share details or context..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={3}
                  className="w-full resize-none text-slate-600 placeholder-slate-400 border-none focus:ring-0 p-0 mb-4"
                />

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as CommunityPost['category'])}
                      className="text-sm border-none bg-slate-50 rounded-lg text-slate-600 focus:ring-0 cursor-pointer hover:bg-slate-100"
                    >
                      <option value="General">General</option>
                      <option value="Academic">Academic</option>
                      <option value="Career">Career</option>
                      <option value="Campus Life">Campus Life</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={!newTitle.trim() || !newContent.trim()}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
                  >
                    <Send className="w-3 h-3 mr-2" />
                    Post
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:shadow-md transition-shadow">
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full border border-slate-100 mr-3" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{post.authorName}</h4>
                        <div className="flex items-center text-xs text-slate-500">
                          <span>{post.role}</span>
                          <span className="mx-1.5">•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      post.category === 'Academic' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                      post.category === 'Career' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      post.category === 'Campus Life' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                      'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h3>
                    <p className="text-slate-600 whitespace-pre-line">{post.content}</p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center space-x-6 border-t border-slate-100 pt-3">
                    <button 
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center space-x-1.5 text-sm font-medium transition-colors ${
                        post.isLiked ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button 
                      onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                      className="flex items-center space-x-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {expandedPostId === post.id && (
                    <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-xl animate-in slide-in-from-top-2 fade-in">
                      {/* Existing Comments */}
                      <div className="space-y-4 mb-4">
                        {post.comments.length > 0 ? (
                          post.comments.map(comment => (
                            <div key={comment.id} className="flex space-x-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                {comment.authorName[0]}
                              </div>
                              <div className="bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm border border-slate-100 flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-bold text-slate-900">{comment.authorName}</span>
                                  <span className="text-xs text-slate-400">{comment.timestamp}</span>
                                </div>
                                <p className="text-sm text-slate-700">{comment.content}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-slate-400 text-center italic">No comments yet. Be the first!</p>
                        )}
                      </div>

                      {/* Add Comment Input */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Write a reply..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          className="flex-1 text-sm rounded-lg border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                        />
                        <button 
                          onClick={() => handleCommentSubmit(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:bg-slate-300"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No discussions found</h3>
                <p className="text-slate-500 mt-1">Try changing filters or be the first to ask!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

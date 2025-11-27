
export enum SessionCategory {
  ALUMNI = 'Alumni Talks',
  GUEST = 'Guest Speakers',
  WORLD = 'World Updates'
}

export enum SessionStatus {
  VERIFIED = 'Verified',
  UNVERIFIED = 'Unverified'
}

export interface Session {
  id: string;
  title: string;
  speaker: string;
  date: string;
  time: string;
  description: string;
  category: SessionCategory;
  status: SessionStatus;
  thumbnail: string;
}

export interface UserProfile {
  name: string;
  department: string;
  yearOfStudy: string;
  email: string;
  hobbies: string[];
  avatarUrl: string;
  studentId: string;
}

export interface HomeCardData {
  id: string;
  title: string;
  description: string;
  route: string;
  bgImage: string;
  iconName: 'video' | 'calendar' | 'book' | 'bell';
  status?: SessionStatus;
  ctaText: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string; // YYYY-MM-DD
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface Comment {
  id: string;
  authorName: string;
  content: string;
  timestamp: string;
  isAuthor: boolean;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  role: string; // e.g., '3rd Year'
  title: string;
  content: string;
  category: 'Academic' | 'Career' | 'Campus Life' | 'General';
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  timestamp: string;
}


import { Session, SessionCategory, SessionStatus, UserProfile, HomeCardData } from './types';

export const CURRENT_USER: UserProfile = {
  name: "Alex Johnson",
  department: "Computer Science",
  yearOfStudy: "3rd Year",
  email: "alex.j@college.edu",
  hobbies: ["Photography", "Coding", "Hiking", "Chess"],
  avatarUrl: "https://picsum.photos/200/200",
  studentId: "CS2024-8821"
};

export const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    title: "Tech Careers in 2025",
    speaker: "Sarah Lee (Class of '18)",
    date: "Oct 24, 2024",
    time: "5:00 PM",
    description: "An insightful discussion on the future landscape of software engineering and AI roles.",
    category: SessionCategory.ALUMNI,
    status: SessionStatus.VERIFIED,
    thumbnail: "https://picsum.photos/400/250?random=1"
  },
  {
    id: '2',
    title: "Startups 101",
    speaker: "Mark Chen (Founder, GoFast)",
    date: "Oct 26, 2024",
    time: "2:00 PM",
    description: "From idea to execution: How to launch your first product while still in college.",
    category: SessionCategory.ALUMNI,
    status: SessionStatus.UNVERIFIED,
    thumbnail: "https://picsum.photos/400/250?random=2"
  },
  {
    id: '3',
    title: "Quantum Computing Basics",
    speaker: "Dr. A. Patel",
    date: "Nov 01, 2024",
    time: "11:00 AM",
    description: "Introduction to qubits and the future of computational power.",
    category: SessionCategory.GUEST,
    status: SessionStatus.VERIFIED,
    thumbnail: "https://picsum.photos/400/250?random=3"
  },
  {
    id: '4',
    title: "Global Economic Shift",
    speaker: "Prof. R. Keynes",
    date: "Nov 05, 2024",
    time: "4:00 PM",
    description: "Analyzing market trends in the post-pandemic era.",
    category: SessionCategory.WORLD,
    status: SessionStatus.VERIFIED,
    thumbnail: "https://picsum.photos/400/250?random=4"
  },
  {
    id: '5',
    title: "Cybersecurity Workshop",
    speaker: "Jane Doe (CyberSec Lead)",
    date: "Nov 12, 2024",
    time: "1:00 PM",
    description: "Hands-on workshop on network security fundamentals.",
    category: SessionCategory.GUEST,
    status: SessionStatus.UNVERIFIED,
    thumbnail: "https://picsum.photos/400/250?random=5"
  }
];

export const HOME_CARDS: HomeCardData[] = [
  {
    id: 'card-1',
    title: "Trending Alumni Sessions",
    description: "Watch verified talks from successful graduates sharing industry insights.",
    route: "/sessions",
    bgImage: "https://picsum.photos/800/300?random=10",
    iconName: 'video',
    status: SessionStatus.VERIFIED,
    ctaText: "View Sessions"
  },
  {
    id: 'card-2',
    title: "Campus Events",
    description: "Stay updated with the latest hackathons, cultural fests, and workshops.",
    route: "/events",
    bgImage: "https://picsum.photos/800/300?random=11",
    iconName: 'calendar',
    ctaText: "Browse Events"
  },
  {
    id: 'card-3',
    title: "Student Resources",
    description: "Access library catalogs, research papers, and study materials.",
    route: "/resources",
    bgImage: "https://picsum.photos/800/300?random=12",
    iconName: 'book',
    ctaText: "Access Library"
  },
  {
    id: 'card-4',
    title: "Announcements",
    description: "Important updates from the administration and department heads.",
    route: "/announcements",
    bgImage: "https://picsum.photos/800/300?random=13",
    iconName: 'bell',
    ctaText: "Read Updates"
  }
];

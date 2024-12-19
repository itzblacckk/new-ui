export interface Tour {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Expert';
  images: string[];
  location: string;
  maxGroupSize: number;
  startDates: string[];
  included: string[];
  notIncluded: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  images: string[];
  createdAt: string;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  images: string[];
  price: number;
  capacity: number;
  registeredCount: number;
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  averageTimeOnSite: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  visitorsByDay: Array<{
    date: string;
    count: number;
  }>;
}
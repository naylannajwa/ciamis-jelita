
export enum View {
  GUEST = 'GUEST',
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  NEWS = 'NEWS',
  CULINARY = 'CULINARY',
  MISSIONS = 'MISSIONS',
  PROFILE = 'PROFILE',
  AI_CHAT = 'AI_CHAT',
  LEADERBOARD = 'LEADERBOARD',
  EVENT = 'EVENT',
  EVENT_DETAIL = 'EVENT_DETAIL',
  MISSION_DETAIL = 'MISSION_DETAIL',
  DETAIL_WISATA = 'DETAIL_WISATA',
  DETAIL_BERITA = 'DETAIL_BERITA',
  DETAIL_CULINARY = 'DETAIL_CULINARY',
  SCANNER = 'SCANNER',
  SCAN_SUCCESS = 'SCAN_SUCCESS',
  REVIEW_MODAL = 'REVIEW_MODAL',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  summary: string;
  readTime: string;
  isHeadline?: boolean;
}

export interface CulinaryItem {
  id: string;
  name: string;
  type: string;
  readTime: string;
  imageUrl: string;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  category: string;
  xp: number;
  missionAvailable?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  thinking?: boolean;
}

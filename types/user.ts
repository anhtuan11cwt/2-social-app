export interface User {
  bio?: string;
  email: string;
  id: string;
  image?: string;
  name: string;
  username: string;
}

export interface UserWithCounts extends User {
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}

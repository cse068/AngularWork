export interface User {
  id: string;
  name: string;
  language: string;
  bio: string;
  version: number;
  [key: string]: string | number; 
}

  
  export interface UserData {
    id: string;
    name: string;
    language: string;
    bio: string;
    version: number;
  }
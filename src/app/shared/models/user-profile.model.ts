export interface UserProfile {
    id: number;
    email: string;
    role: 'READER' | 'CREATOR' | null;
    firstName: string;
    lastName: string;
    biography: string;
}
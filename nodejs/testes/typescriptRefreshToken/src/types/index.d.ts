export interface TokenPayload {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'moderador' | 'admin' | 'superAdmin';
}
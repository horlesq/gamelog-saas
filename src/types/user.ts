export interface User {
    id: string;
    email: string;
    name?: string;
    isAdmin: boolean;
    plan: "FREE" | "PRO" | "ULTRA";
    createdAt: string;
    updatedAt: string;
}

export interface AuthUser {
    userId: string;
    email: string;
    isAdmin: boolean;
    plan: "FREE" | "PRO" | "ULTRA";
}

export interface UserWithGameLogCount extends User {
    _count: {
        gameLogs: number;
    };
}

export interface CreateUserData {
    email: string;
    password: string;
    name?: string;
    isAdmin: boolean;
}

export interface UpdateProfileFormData {
    currentPassword: string;
    email?: string;
    newPassword?: string;
}

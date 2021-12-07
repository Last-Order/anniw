export interface Indexable {
    id: string;
}

export interface MusicIndex {
    catalog: string;
    track: number;
}

export interface SiteInfo {
    siteName: string;
    description: string;
    protocolVersion: string;
    features: string[];
}

export interface AnnilToken {
    name: string;
    url: string;
    token: string;
    priority: number;
}

export interface UserInfo {
    userId: string;
    username: string;
    email: string;
    nickname: string;
    avatar: string;
}

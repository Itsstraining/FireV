import { Video } from "./video.model";

export interface User {
    _id: string
    email: string;
    name: string;
    avatar: string;
    subscribers: number;
    subscriberList: string[];
    videoList: Video[];
 }

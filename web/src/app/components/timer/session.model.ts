export interface ISession{
    startTime: Date | null;
    stopTime: Date | null;
    duration: number;
    description?: string;
    UUID?: string; 
    projectId: string | null;
}

export interface IProject {
    name: string;
    sessions: ISession[]; 
    UUID: string;
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerStorageService {
   private storageKey = 'effortTrackData';

  constructor() {}

  saveSession(startTime: Date | null, stopTime: Date | null, duration: number): void {
    const data = this.getAllSessions();
    const date = new Date(startTime as any).toDateString(); 
  
    let today = data.find((entry) => entry.date === date);
    if (!today) {
      today = { date, sessions: [], totalWork: 0 };  
      data.push(today);
    }
  
    today.sessions.push({ startTime, stopTime, duration });
    today.totalWork = this.calculateTotalWork(today.sessions);
  
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getAllSessions(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  calculateTotalWork(sessions: { startTime: string, stopTime: string, duration: number }[]): number {
    return sessions.reduce((total, session) => total + session.duration, 0);
  }
}

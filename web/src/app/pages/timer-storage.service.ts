import { Injectable } from '@angular/core';
import { ISession } from '../components/timer/session.model';
import { AppConstant } from '../app.constant';

@Injectable({
  providedIn: 'root',
})
export class TimerStorageService {
  constructor() {}

  saveSession(session: ISession): void {
    const data = this.getAllSessions();
    const date = new Date(session.startTime as any).toDateString(); 
  
    let today: any = data.filter((entry) => entry.date === date && entry.projectId === session.projectId);
    console.log('today', today);
    
    if (!today) {
      today = { projectId: '', date, sessions: [], totalWork: 0 };
      data.push(today);
    }
  
    today.sessions.push(session);
    today.totalWork = this.calculateTotalWork(today.sessions);
    today.projectId = session.projectId;
    localStorage.setItem(AppConstant.STORAGE_KEY, JSON.stringify(data));
  }

  getAllSessions(projectId?: string | null): any[] {
    const data = localStorage.getItem(AppConstant.STORAGE_KEY);
    const allSessions = data ? JSON.parse(data) : [];
    
    if (projectId) {
      return allSessions.filter((entry: any) => entry.projectId === projectId);
    }

    return allSessions;
  }

  getTotalWorkForProject(projectId: string): number {
    const projectLogs = this.getAllSessions(projectId);
    return projectLogs.reduce((total, log) => total + log.totalWork, 0);
  }

  calculateTotalWork(sessions: { startTime: string; stopTime: string; duration: number }[]): number {
    return sessions.reduce((total, session) => total + session.duration, 0);
  }
}

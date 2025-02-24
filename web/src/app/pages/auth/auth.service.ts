import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../../universal/app-constant';
import { IResponse } from '../../universal/shared.model';
import { BaseService } from '../../universal/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor() {
    super();
  }

  register(data: any) {
    return this.postData<IResponse<any>>({
      url: '/auth/register',
      body: data,
    });
  }

  update(data: any): Promise<IResponse<any>> {
    return this.postData({
      url: '/user/update',
      body: data,
    });
  }

  uploadFile(data: any): Promise<IResponse<any>> {
    return this.postData({
      url: '/file-upload/upload',
      body: data,
    });
  }

  delete(data: any): Promise<IResponse<any>> {
    return this.postData({
      url: '/user/delete',
      body: data,
    });
  }

  login(data: any): Promise<IResponse<any>> {
    return this.postData({
      url: '/auth/authenticate',
      body: data,
    });
  }

  getAllUsersCount(): Promise<IResponse<number>> {
    return this.getData({
      url: '/user/getAllUsersCount',
    });
  }

  getAllUsers(pageNumber?: number, pageSize?: number): Promise<IResponse<any>> {
    return this.getData({
      url: `/user/getAllUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    });
  }

  getUserById(id: string): Promise<IResponse<any>> {
    return this.getData({
      url: `/user/${id}`,
    });
  }

  getNewAccessToken(refreshToken: string): Promise<IResponse<number>> {
    return this.postData({
      url: '/auth/getNewAccessToken',
      body: { refreshToken },
    });
  }

  sendOtp(email: string): Promise<IResponse<number>> {
    return this.postData({
      url: '/otp/sendOtp',
      body: { email },
    });
  }

  verifyOtp(data: { otp: number; email: string }): Promise<IResponse<number>> {
    return this.postData({
      url: '/otp/verifyOtp',
      body: data,
    });
  }
}

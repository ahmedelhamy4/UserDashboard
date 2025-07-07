import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  email: string;
  sub: number;
  role: 'admin' | 'user';
  exp?: number;
  iat?: number;
}

export class JwtUtil {
  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (e) {
      return null;
    }
  }

  static getRole(token: string): 'admin' | 'user' | null {
    const payload = this.decodeToken(token);
    return payload?.role ?? null;
  }
}

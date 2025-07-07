export interface AuthState {
  user: { id: number; email: string; role: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

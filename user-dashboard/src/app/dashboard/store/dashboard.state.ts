import { User } from '../../auth/models/user.model';

export interface DashboardState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialDashboardState: DashboardState = {
  users: [],
  loading: false,
  error: null,
};

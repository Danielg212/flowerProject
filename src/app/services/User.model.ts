import {MonthInterval} from './MonthInterval.model';

export interface UserModel {
  uid?: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  intervalsHistory?: Array<MonthInterval>;
}

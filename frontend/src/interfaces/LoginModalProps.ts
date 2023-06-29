import { User } from '../models/user';

export interface LoginModalProps {
  onDismiss: () => void,
  onLoginSuccessful: (user: User) => void,
}

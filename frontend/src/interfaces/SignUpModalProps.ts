import { User } from '../models/user';

export interface SignUpModalProps {
  onDismiss: () => void,
  onSignUpSuccessful: (user: User) => void,
}
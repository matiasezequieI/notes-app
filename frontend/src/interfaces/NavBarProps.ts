import { User } from '../models/user';

interface NavBarProps {
  loggedInUser: User | null,
  onSignUpClicked: () => void,
  onLoginClicked: () => void,
  onLoginSuccessful: () => void,

}

export default NavBarProps;
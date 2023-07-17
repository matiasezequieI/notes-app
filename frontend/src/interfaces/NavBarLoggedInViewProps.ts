import { User } from '../models/user';

interface NavBarLoggedInViewProps {
  user: User,
  onLogoutSuccessful: () => void,
}

export default NavBarLoggedInViewProps;
import useAuth from './useAuth';
import jwtDecode from 'jwt-decode';

function useJWTDecode() {
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwtDecode(auth?.accessToken) : undefined;
  const user = decoded?.sub;
  const role = decoded?.role;
  return { user, role };
}

export default useJWTDecode;

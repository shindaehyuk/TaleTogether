import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  });
}

export default Logout;

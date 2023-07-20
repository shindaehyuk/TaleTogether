import { Routes, Route } from 'react-router-dom';
import Main from '../page/Main';
import Login from '../page/Login';
import Signup from '../page/Signup';
import Mypage from '../page/Mypage';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/mypage" Component={Mypage} />
      </Routes>
    </>
  );
}

export default Router;

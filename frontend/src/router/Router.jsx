import { Routes, Route } from 'react-router-dom';
import Main from '../page/Main';
import Login from '../components/admin/Login';
import Signup from '../components/admin/Signup';
import Mypage from '../page/Mypage';
import Community from '../page/Community';
import Dashboard from '../page/Dashboard';
import Admin from '../page/Admin';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/mypage" Component={Mypage} />
        <Route path="/community" Component={Community} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/admin" Component={Admin} />
      </Routes>
    </>
  );
}

export default Router;

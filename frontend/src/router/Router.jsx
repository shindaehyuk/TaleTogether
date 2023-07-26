import { Routes, Route } from 'react-router-dom';
import Main from '../page/Main';
import Mypage from '../page/Mypage';
import Community from '../page/Community';
import Dashboard from '../page/Dashboard';
import Admin from '../page/Admin';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/mypage" Component={Mypage} />
        <Route path="/community" Component={Community} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/admin" Component={Admin} />
        <Route path="/main" Component={Main} />
      </Routes>
    </>
  );
}

export default Router;

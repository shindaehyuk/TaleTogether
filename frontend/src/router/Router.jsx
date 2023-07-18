import { Routes, Route } from 'react-router-dom';
import Main from '../page/Main';
import Login from '../page/Login';
import Signup from '../page/Signup';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
      </Routes>
    </>
  );
}

export default Router;

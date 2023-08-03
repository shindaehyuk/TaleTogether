import { Routes, Route } from "react-router-dom";
import Main from "../page/Main";
import Mypage from "../components/mypage/Mypage";
import Community from "../components/community/Community";
import Admin from "../page/Admin";

import PrivateRoute from "../components/route/PrivateRoute";
import PublicRoute from "../components/route/PublicRoute";

function Router() {
  return (
    <>
      <Routes>
        <Route Component={PrivateRoute}>
          <Route path="/main" Component={Main} />
          <Route path="/mypage" Component={Mypage} />
          <Route path="/community" Component={Community} />
        </Route>
        <Route Component={PublicRoute}>
          <Route path="/" Component={Admin} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;

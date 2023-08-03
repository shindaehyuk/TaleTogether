import { Routes, Route } from "react-router-dom";
import Main from "../page/Main";
import Mypage from "../components/mypage/Mypage";
import Community from "../components/community/Community";
import Admin from "../page/Admin";
import Game from "../components/game/Game";
import Intro from "../components/main/Intro";

import PrivateRoute from "../components/route/PrivateRoute";
import PublicRoute from "../components/route/PublicRoute";

function Router() {
  return (
    <>
      <Routes>
        <Route Component={PrivateRoute}>
          <Route element={<Main />}>
            <Route path="mypage" element={<Mypage />} />
            <Route path="intro" element={<Intro />} />
            <Route path="game" element={<Game />} />
            <Route path="community" element={<Community />} />
          </Route>
        </Route>
        <Route Component={PublicRoute}>
          <Route path="/" Component={Admin} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;

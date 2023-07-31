import Button from "@mui/material/Button";
import "./Community.css";

function NavBar() {
  return (
    <div className="Nav">
      <Button className="button" variant="text">
        작성하기
      </Button>
      <hr />
    </div>
  );
}

// function Article(props) {
//   return  <div>
//     <h2>{props.title}</h2>
//     <p>{props.content}</p>
//   </div>
// }

function Community() {
// let content = null
// const mode = 'Default'
// if (mode === 'Default') {
//   content = <Article title=""></Article>
// }

  return (
    <div>
      <NavBar></NavBar>
    </div>
  );
}

export default Community;

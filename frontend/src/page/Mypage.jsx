import React from 'react';
import axios from 'axios';

function MyPage() {

  // 서버에서 유저가 만든 동화 데이터 가져오기
  const state = {
    posts: []
  }
  
  // 페이지가 생길때 axios로 데이터 전부 받아오기
  componentDidMount() {
    axios.get(`https:어쩌구저쩌구`)
    .then(res => {
      const posts = res.data;
      this.setState({ posts });
    });
  }

  // 삭제 버튼
  const onDelete = (id, e) => {
    axios.delete(`https:어쩌구저쩌구/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);

      const posts = this.state.posts.filter(item => item.id !== id);
      this.setState({ posts });
    })
  };


  return (
  <div>
    <h1>MyPage</h1>
    <tbody>
      {this.state.posts.map((post) => (
        <tr>
          <td>{post.title}</td>
          <td>
            <button onClick={(e) => this.onDelete(post.id, e)}>삭제</button>
          </td>
      </tr>
      ))}
    </tbody>
    
  </div>
  );
}

export default MyPage;

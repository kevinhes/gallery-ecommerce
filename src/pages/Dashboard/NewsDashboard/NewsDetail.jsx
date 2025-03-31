// hook
import { useEffect, useState } from "react";

// router 
import { useParams, useNavigate } from 'react-router-dom';

// custome library
import { getCookie } from "../../../helpers/auth";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

// library
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from 'sweetalert2';

export default function NewsDetail() {
  const { id } = useParams();
  const cookies = document.cookie.split(';');
  const hexToken = getCookie(cookies);
  const navigate = useNavigate();

  // state 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState('https://fakeimg.pl/250x100/')
  const [author, setAuthor] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsPostUrl = id ? `${baseUrl}v2/api/${api}/admin/article/${id}` : `${baseUrl}v2/api/${api}/admin/article`
    const apiMethod = id ? 'put' : 'post'

    try {
      const response = await axios[apiMethod](newsPostUrl, {
        "data": {
          title,
          description,
          image,
          "tag": [
            "tag1"
          ],
          "create_at": Date.now(),
          author,
          "isPublic": false,
          content
        }
      },
        {
          headers: { Authorization: hexToken },
        }
      )
      if (response.status) {
        navigate('/dashboard/news-dashboard')
      };
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const getSingleNews = async () => {
    try {
      const response = await axios.get(`${baseUrl}v2/api/${api}/admin/article/${id}`, { headers: { Authorization: hexToken }, })
      const { article } = response.data
      setTitle(article.title)
      setContent(article.content)
      setAuthor(article.author)
      setImage(article.image)
      setDescription(article.description)

    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: 'warning',
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }

  useEffect(() => {
    getSingleNews()
  }, [id])

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center mb-5">
        <h1> {id ? '編輯文章' : '新增文章'} </h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-start mb-5">
          <div className="w-68 p-5 border rounded-4">
            <label htmlFor="title" className="mb-3">標題</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="請輸入標題"
              className="form-control mb-4 fs-3"
              required
            />
            <ReactQuill value={content} onChange={setContent} />
          </div>
          <div className="w-30 p-5 border rounded-4">
            <div className="mb-4">
              <label htmlFor="description" className="mb-2">文章簡述</label>
              <textarea
                id="description"
                className="form-control"
                rows='10'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
              </textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="mb-2">顯示圖片</label>
              <input type="text" id="image" className="form-control mb-2" value={image} onChange={(e) => setImage(e.target.value)} />
              <img src={image} alt="" className="admin-news-image" />
            </div>

            <div className="">
              <label htmlFor="author" className="mb-2">作者</label>
              <input type="text" id="author" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>

          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">儲存</button>
        </div>
      </form>
    </div>
  );
};

// react router components
import { Link } from "react-router-dom"

// react hook
import { useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getNewsList } from "../../slice/adminNewsSlice";

// custome library
import { getCookie } from "../../helpers/auth";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const api = import.meta.env.VITE_API_PATH;

// library
import axios from "axios";

// components
// import Pagination from '../../components/adminproduct/Pagination';

export default function NewsDashboard() {
  // get redux
  const dispatch = useDispatch()
  const allNews = useSelector((state) => state.adminNews.articlesList)
  // const pagination = useSelector((state) => state.adminNews.pagination)

  // get single news
  const getSingleNews = async (id) => {
    const cookies = document.cookie.split(';');
    const hexToken = getCookie(cookies);

    try {
      const response = await axios.get(`${baseUrl}v2/api/${api}/admin/article/${id}`, {
        headers: { Authorization: hexToken },
      })
      return response.data.article
    } catch (error) {
      console.log(error);
    }
  }

  // edit news
  const editPublicStatus = async (news, status) => {
    const newsStatus = status ? true : false
    const { id, title, description, image, author } = news
    const { content } = await getSingleNews(id)

    const cookies = document.cookie.split(';');
    const hexToken = getCookie(cookies);
    try {
      await axios.put(`${baseUrl}v2/api/${api}/admin/article/${id}`,
        {
          "data": {
            title,
            description,
            image,
            "tag": [
              "tag1"
            ],
            "create_at": Date.now(),
            author,
            "isPublic": newsStatus,
            content
          }
        },
        {
          headers: { Authorization: hexToken },
        }
      )
      dispatch(getNewsList())
    } catch (error) {
      console.log(error);
    }
  }

  // delete news
  const deleteNews = async(id) => {
    const cookies = document.cookie.split(';');
    const hexToken = getCookie(cookies);
    try {
      await axios.delete(`${baseUrl}v2/api/${api}/admin/article/${id}`, { headers:{ Authorization: hexToken } })
      dispatch(getNewsList())
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    dispatch(getNewsList())
  }, [])

  return (
    <>
      <header className="d-flex justify-content-between align-items-center">
        <h1>文章管理</h1>
        <div>
          <Link
            to={'/dashboard/add-news'}
            className="btn btn-primary"
          >
            新增文章
          </Link>
        </div>
      </header>
      <section>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">文章名稱</th>
              <th scope="col">文章狀態</th>
              <th scope="col">動作</th>
              <th scope="col">發布</th>
            </tr>
          </thead>
          <tbody>
            {allNews.map((news, index) => (
              <tr
                key={news.id}
                className={news.isPublic ? '' : 'table-secondary'}
              >
                <td> {index + 1} </td>
                <td> {news.title} </td>
                <td> {news.isPublic ? '已發佈' : '未發布'} </td>
                <td>
                  <Link className="btn btn-outline-primary d-inline-block" to={`/dashboard/edit-news/${news.id}`}>編輯</Link>
                  <button type="button" className="btn btn-danger" onClick={()=> deleteNews(news.id)}>刪除</button>
                </td>
                <td>
                  {news.isPublic ?
                    <button type="button" className="" onClick={() => editPublicStatus(news, false)}>轉為草稿</button>
                    :
                    <button type="button" className="" onClick={() => editPublicStatus(news, true)}>發布</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <Pagination
                pagination={pagination}
                changeProductPage={changeProductPage}
              /> */}
      </section>
    </>
  )
}
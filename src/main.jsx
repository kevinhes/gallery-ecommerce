// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 這個是 react router 的元件，我們可以看到他是以 children 的方式把 APP 這個元件給放進來
// 記得使用 router 的三個步驟 1.準備元件 2.撰寫 route 3. 建立連結
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // <StrictMode>
  // </StrictMode>,
)

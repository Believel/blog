import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate
} from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}></Route>
            <Route path="about" element={<About/>}>              
            </Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
function Layout() {
  return (
    <div>
      <Link to="/">首页</Link>
      <Link to="/about">关于我</Link>
      <Outlet />
    </div>
  )
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}
function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  )
}
function NoMatch() {
  return (
    <div>
      <h1>NoMatch</h1>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
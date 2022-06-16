import ReactDOM from "react-dom";
// import {
//   BrowserRouter,
//   HashRouter as Router,
//   MemoryRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Outlet,
//   useParams,
//   useResolvedPath,
//   useNavigate
// } from 'react-router-dom'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
  useParams,
  useResolvedPath
} from './source'

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}></Route>
            {/* <Route path="about" element={<About/>}>              
            </Route> */}
            <Route path="about" element={<About/>}>
              <Route path=":id" element={<AbountDetail/>}/>            
            </Route>
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
function Layout() {
  return (
    <div>
      <Link to="/">首页</Link>
      <a style={{marginRight: '10px'}}></a>
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
  const path = useResolvedPath("123")
  console.log("path", path)
  return (
    <div>
      <h1>About</h1>
      <Link to="123">去详情</Link>
      <Outlet/>
    </div>
  )
}
function AbountDetail() {
  const params = useParams()
  const navigate = useNavigate()
  return (
    <div>
      <h4>详情: {params.id}</h4>
      <button onClick={() => {
        navigate("/")
      }}>到首页</button>
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

/**
 * 根据当前页面地址，返回匹配的路由
 * @param {*} routes 
 * @returns 
 */
export function useRoutes(routes) {
  const pathname = window.location.pathname;
  return routes.map((route) => {
    const match = pathname === route.path || pathname === "/" + route.path
    return match ? route.element : null
  })
}

export function useNavigate() {
  
}
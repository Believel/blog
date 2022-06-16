import { useContext, useMemo } from "react";
import { matchRoutes } from "react-router-dom"
import { parsePath } from "history";
import { NavigationContext, RouteContext } from "./Context"
/**
 * 根据当前页面地址，返回匹配的路由
 * @param {*} routes 
 * @returns 
 */
export function useRoutes(routes) {
  const location = useLocation()
  const pathname = location.pathname;
  const matches = matchRoutes(routes, { pathname })
  return _renderMatches(matches)
}

function _renderMatches(matches, parentMatches = []) {
  if (!matches) return null
  return matches.reduceRight((outlet, match, index) => {
    return (
      <RouteContext.Provider
        value={{
          outlet,
          matches: parentMatches.concat(matches.slice(0, index + 1))
        }}
      >
        {match.route.element}
      </RouteContext.Provider>
    )
  }, null)
}

export function useLocation() {
  const { location } = useContext(NavigationContext)
  return location
}
// 路由跳转函数
export function useNavigate() {
  const { navigator } = useContext(NavigationContext)
  return navigator.push
}

export function useOutlet() {
  const { outlet } = useContext(RouteContext);
  return outlet;
}

export function useParams() {
  const { matches } = useContext(RouteContext);

  const rootMatch = matches[matches.length - 1];
  return rootMatch ? rootMatch.params : {};
}


export function useResolvedPath(to) {
  const { matches } = useContext(RouteContext)
  const {pathname: locationPathname } = useLocation()
  const routePathnameJson = JSON.stringify(matches.map(match => match.pathnameBase))
  return useMemo(
    () => resolveTo(to, JSON.parse(routePathnameJson), locationPathname),
    [to, routePathnameJson, locationPathname]
  )

}

function resolveTo(toArg, routePathnames, locationPathname) {
  let to = typeof toArg === "string" ? parsePath(toArg) : toArg;
  let toPathname = toArg === "" || to.pathname === "" ? "/" : to.pathname;

  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;

    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");

      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }

      to.pathname = toSegments.join("/");
    }

    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }

  let path = resolvePath(to, from);

  if (
    toPathname &&
    toPathname !== "/" &&
    toPathname.endsWith("/") &&
    !path.pathname.endsWith("/")
  ) {
    path.pathname += "/";
  }

  return path;
}

export function resolvePath(to, fromPathname = "/") {
  let {
    pathname: toPathname,
    search = "",
    hash = "",
  } = typeof to === "string" ? parsePath(to) : to;

  let pathname = toPathname
    ? toPathname.startsWith("/")
      ? toPathname
      : resolvePathname(toPathname, fromPathname)
    : fromPathname;

  return {
    pathname,
  };
}

function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");

  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });

  return segments.length > 1 ? segments.join("/") : "/";
}
import React, { isValidElement } from "react"
import { useRoutes } from "./hooks"

function createRoutesFromChildren(children) {
  const routes = []
  React.Children.forEach(children, (child) => {
    if (!isValidElement(child)) return

    const route = {
      element: child.props.element,
      path: child.props.path,
      index: child.props.index
    }
    if (child.props.children) {
      route.children = createRoutesFromChildren(child.props.children)
    }
    routes.push(route)
  })
  return routes
}

export default function Routes({ children }) {
  const routes = createRoutesFromChildren(children)
 
  return useRoutes(routes)
}
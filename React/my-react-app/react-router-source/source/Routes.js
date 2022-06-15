import React from 'react'
import { useRoutes } from './hooks'

export default function Routes({children}) {
  const routes = []
  React.Children.forEach(children, (child) => {
    const route = { element: child.props.element, path: child.props.path }
    routes.push(route)
  })

  return useRoutes(routes)
}
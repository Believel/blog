import RenderWhenActive from './RenderWhenActive'
import { useActive } from './useActive'

const ComponentLoader = ({children}) => {
  const active = useActive()
  return <RenderWhenActive active={active}>{children}</RenderWhenActive>
}
export default ComponentLoader
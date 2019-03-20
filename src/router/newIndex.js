//index.js
import routes from './routerConfig'
import renderRoutes from './renderRouter'

const Routers = () => (
  renderRoutes({
      routes
  })
)
export default Routers

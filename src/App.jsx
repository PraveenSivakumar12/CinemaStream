
import router from "./Routes/Route"
import { RouterProvider } from "react-router-dom"
import { FavouriteProvider } from "./Context/FavouriteContext"
import { AuthProvider } from "./Context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <FavouriteProvider>
        <RouterProvider router={router} />
      </FavouriteProvider>
    </AuthProvider>
  )
}

export default App
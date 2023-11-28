import React from 'react'
import ReactDOM from 'react-dom/client'
// when not using a router, we can just import the App component here
// import App from './app/layout/App.tsx'
import './app/layout/styles.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    {/* when not using a router, we can just render the App component here
    <App /> */}

    {/* when using a router, we can render the router here using RouterProvider
    and letting it know we are using const router by typing in
    router={router} */}
    <RouterProvider router={router} />

  </React.StrictMode>,
)

import React from "react"
import ReactDOM from "react-dom/client"
// import App from './App'
import { OurCars } from "./OurCars"
import "./index.css"

import { ReduxProvider } from "./redux"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <OurCars />
    </ReduxProvider>
  </React.StrictMode>
)

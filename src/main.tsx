import React from "react"
import ReactDOM from "react-dom/client"
// import App from './App'
// import { OurCars } from "./OurCars"
// import { OurCars } from "./OurCars2"
// import { OurCars } from "./OurCars3"
import { OurCars } from "./OurCars4"

import "./index.css"

import { ReduxProvider } from "./redux"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider>
      <OurCars />
    </ReduxProvider>
  </React.StrictMode>
)

// libraries
import { Provider } from "react-redux"

// redux-persist
import { PersistGate } from "redux-persist/integration/react"

// redux
import { persistor, store } from "../index"

// JSX

export const ReduxProvider = ({ children }: {children: React.ReactElement}) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
)

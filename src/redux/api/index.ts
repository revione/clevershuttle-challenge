import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { REHYDRATE } from "redux-persist"

const BACKEND_URL = ""

export const api = createApi({
  reducerPath: "api",

  tagTypes: ["Cars"],

  endpoints: () => ({}),

  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,

    prepareHeaders: (headers, { getState }) => {
      return headers
    },
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE && action.payload)
      return action.payload[reducerPath]
  },
})

export const api_reset = api.util.resetApiState

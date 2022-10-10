import { api } from "@redux/api"

type TStatus = "available" | "in-maintenance" | "out-of-service"

type TCar = {
  Id: number
  Brand: string
  LicensePlate: string
  Manufacturer: string
  OperationCity: string
  Status: TStatus
  CreatedAt: Date
  LastUpdatedAt: Date
}

const resume = api.injectEndpoints({
  endpoints: (build) => ({

    //
    getCars: build.mutation<TCar, any>({
      query: () => ({ url: `/cars/`, method: "GET" }),
    }),

    //
    getCar: build.mutation<TCar, any>({
      query: (id) => ({ url: `/cars/${id}`, method: "GET" }),
    }),

    // 
    updateCar: build.mutation<TCar, any>({
      query: (body) => ({ url: "/cars/", method: "PUT", body }),
      invalidatesTags: ["Cars"],
    }),

    // 
    deleteCar: build.mutation<TCar, any>({
      query: (id) => ({ url: `/cars/${id}`, method: "DELETE" }),
      invalidatesTags: ["Cars"],
    }),


  }),
})

export const {
  
  endpoints: resumeEndpoints,
} = resume

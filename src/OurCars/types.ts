export type TStatus = "available" | "in-maintenance" | "out-of-service"

export type TCar = {
  id: number
  brand: string
  licensePlate: string
  manufacturer: string
  operationCity: string
  status: TStatus
  createdAt: Date
  lastUpdatedAt: Date
}

export type TUpdateAndDeleteCar = {
  updateCar: (car: TCar) => Promise<
    | {
        error: any
        data?: undefined
      }
    | {
        data: any
        error?: undefined
      }
    | undefined
  >
  deleteCar: (car_id: number) => Promise<
    | {
        error: any
        data?: undefined
      }
    | {
        data: any
        error?: undefined
      }
    | undefined
  >
}

export type TFindCar = (car_id: number) => Promise<
  | {
      error: any
      data?: undefined
    }
  | {
      data: any
      error?: undefined
    }
  | undefined
>

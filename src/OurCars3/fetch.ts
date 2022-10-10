type TStatus = "available" | "in-maintenance" | "out-of-service"

type TCar = {
  id: number
  brand: string
  licensePlate: string
  manufacturer: string
  operationCity: string
  status: TStatus
  createdAt: Date
  lastUpdatedAt: Date
}

const BACKEND_URL =
  "https://nckbku0m91.execute-api.eu-central-1.amazonaws.com/cars"

export const get_cars = async () =>
  await fetch(BACKEND_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json() as Promise<TCar[]>)

export const get_car = async (id: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const res_json = await response.json()

    if (response.status === 400 || response.status === 404)
      return {
        error: res_json,
      }

    return { data: res_json }
  } catch (error) {
    if (error instanceof Error)
      return {
        error: error?.message,
      }
  }
}

export const put_car = async (id: number, data: any) => {
  try {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const res_json = await response.json()

    if (response.status === 400 || response.status === 404)
      return {
        error: res_json,
      }

    return { data: res_json }
  } catch (error) {
    if (error instanceof Error)
      return {
        error: error?.message,
      }
  }
}

export const delete_car = async (id: number) => {
  try {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const res_json = await response.json()

    if (response.status === 400 || response.status === 404)
      return {
        error: res_json,
      }

    return { data: res_json }
  } catch (error) {
    if (error instanceof Error)
      return {
        error: error?.message,
      }
    console.log("error delete fetch : ", error)
  }
}

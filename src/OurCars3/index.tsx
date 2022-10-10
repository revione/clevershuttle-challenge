import { useEffect, useState } from "react"
import { get_cars, get_car, put_car, delete_car as remove_car } from "./fetch"

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

const Field = ({
  name,
  value,
  onChange,
}: {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <label>
    {name} :
    <input
      type="text"
      placeholder={name}
      name={name}
      value={value}
      onChange={onChange}
    />
  </label>
)

type Tupdate_and_delete = {
  update_car: (car: TCar) => Promise<
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
  delete_car: (car_id: number) => Promise<
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

type Tfind_car = (car_id: number) => Promise<
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

export const Car = ({
  car,
  update_car,
  delete_car,
}: { car: TCar } & Tupdate_and_delete) => {
  // return <pre>{JSON.stringify(car, null, 2)} </pre>

  const {
    id,
    brand,
    licensePlate,
    manufacturer,
    operationCity,
    status,
    createdAt,
    lastUpdatedAt,
  } = car

  const [is_editing, set_is_editing] = useState(false)
  const [error, set_error] = useState("")

  const handle_edit = () => {
    set_is_editing(true)
  }

  const handle_save = async () => {
    const response = await update_car(car_edition)

    if (response?.error) {
      set_error(response.error)

      setTimeout(() => {
        set_error("")
      }, 5000)
      return
    }

    if (response?.data) console.log("response.data : ", response.data)
    set_is_editing(false)
  }

  const handle_delete = async () => {
    const response = await delete_car(id)
    if (response?.error) {
      set_error(response.error)

      setTimeout(() => {
        set_error("")
      }, 5000)
      return
    }

    if (response?.data) console.log("response.data : ", response.data)
  }

  const [car_edition, set_car_edition] = useState(car)

  const handle_change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
    return set_car_edition((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  return (
    <div
      style={{
        margin: "5rem",
      }}
    >
      {error && (
        <div
          style={{
            color: "red",
          }}
        >
          {error}
        </div>
      )}
      {!is_editing && (
        <>
          <div>id : {id}</div>
          <div>Brand : {brand}</div>
          <div>LicensePlate : {licensePlate}</div>
          <div>Manufacturer : {manufacturer}</div>
          <div>OperationCity : {operationCity}</div>
          <div>Status : {String(status)}</div>
          <div>CreatedAt : {String(createdAt)}</div>
          <div>LastUpdatedAt : {String(lastUpdatedAt)}</div>
        </>
      )}

      {is_editing && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Field
            name="licensePlate"
            value={car_edition.licensePlate}
            onChange={handle_change_input}
          />

          <Field
            name="manufacturer"
            value={car_edition.manufacturer}
            onChange={handle_change_input}
          />

          <Field
            name="operationCity"
            value={car_edition.operationCity}
            onChange={handle_change_input}
          />

          <Field
            name="status"
            value={car_edition.status}
            onChange={handle_change_input}
          />
        </div>
      )}

      <div>
        {!is_editing && (
          <>
            <button onClick={handle_edit}>Edit</button>
            <button onClick={handle_delete}>Delete</button>
          </>
        )}

        {is_editing && <button onClick={handle_save}>Save</button>}
      </div>
    </div>
  )
}

export const SearchACar = ({
  find_car,
  update_car,
  delete_car,
  search_cleaner: { clean, cleaned },
}: {
  find_car: Tfind_car
  search_cleaner: {
    clean: boolean
    cleaned: () => void
  }
} & Tupdate_and_delete) => {
  const [car_id, set_car_id] = useState("")
  const [car_founded, set_car_founded] = useState<TCar>()
  const [error, set_error] = useState("")

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const response = await find_car(Number(car_id))

    if (response?.error) {
      set_car_founded(undefined)

      set_error(response.error)
      setTimeout(() => {
        set_error("")
      }, 5000)

      return
    }

    set_error("")

    set_car_founded(response?.data)
  }

  useEffect(() => {
    if (clean) {
      set_car_founded(undefined)
      cleaned()
    }
  }, [clean])

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: "5rem 5rem 2rem",
        }}
      >
        <input
          type="text"
          value={car_id}
          onChange={(e) => set_car_id(e.target.value)}
          placeholder="1"
        />
        <button type="submit">Search</button>
      </form>

      <div
        style={{
          margin: "2rem 5rem",
        }}
      >
        {error && error}
      </div>

      {car_founded && <Car {...{ car: car_founded, update_car, delete_car }} />}
    </div>
  )
}

const get_async_cars = async () => {
  try {
    const fetch_cars = await get_cars()
    return fetch_cars
  } catch (error) {
    console.log("error : ", error)
  }
}

const useCars = () => {
  const [cars, setCars] = useState<TCar[]>()
  const [last_car_searched, set_last_car_searched] = useState<number>()
  const [clean, set_clean] = useState(false)

  const cleaned = () => {
    set_clean(false)
  }

  //
  // get cars
  useEffect(() => {
    get_async_cars().then((inner_cars) => {
      setCars(inner_cars)
    })
  }, [])

  const find_car = async (car_id: number) => {
    try {
      const fetch_car = await get_car(car_id)
      set_last_car_searched(car_id)
      return fetch_car
    } catch (error) {
      console.log("error :", error)
    }
  }

  const update_car = async (car: TCar) => {
    try {
      const response = await put_car(car.id, car)

      if (!cars)
        return {
          error: "No cars",
        }

      if (response?.error) return response

      const new_cars = cars.map((inner_car) => {
        if (inner_car.id === car.id) return car
        return inner_car
      })

      setCars(new_cars)

      return response
    } catch (error) {
      console.log("Error editing car, ", error)
    }
  }

  const delete_car = async (car_id: number) => {
    try {
      const response = await remove_car(car_id)

      if (!cars)
        return {
          error: "No cars",
        }

      if (response?.error) return response

      if (car_id === last_car_searched) set_clean(true)

      const new_cars = cars.filter((car) => car.id !== car_id)

      setCars(new_cars)

      return response
    } catch (error) {
      console.log("Error edliting car, ", error)
    }
  }

  return {
    cars,
    find_car,
    update_car,
    delete_car,
    search_cleaner: {
      clean,
      cleaned,
    },
  }
}

export const OurCars = () => {
  const { cars, find_car, update_car, delete_car, search_cleaner } = useCars()

  return (
    <div>
      <SearchACar
        find_car={find_car}
        update_car={update_car}
        delete_car={delete_car}
        search_cleaner={search_cleaner}
      />

      <div>
        {cars?.map((car) => (
          <Car
            key={car.id}
            car={car}
            update_car={update_car}
            delete_car={delete_car}
          />
        ))}
      </div>
    </div>
  )
}

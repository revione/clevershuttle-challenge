import { useEffect, useState } from "react"
import { getData } from "./fetch"

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

const STATUS = ["available", "in-maintenance", "out-of-service"]

const make_a_date = () => new Date(new Date().toISOString())

const car_example = {
  Id: 0,
  Brand: "Brand",
  LicensePlate: "LicensePlate",
  Manufacturer: "Manufacturer",
  OperationCity: "OperationCity",
  Status: "available",
  CreatedAt: make_a_date(),
  LastUpdatedAt: make_a_date(),
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

const make_dummy_cars = () =>
  Array.from({ length: 10 }, (_, i) => ({
    ...car_example,
    Id: i,
    Status: STATUS[getRandomIntInclusive(0, 2)] as TStatus,
    CreatedAt: make_a_date(),
    LastUpdatedAt: make_a_date(),
  }))

const find_internal_car = (cars: TCar[], car_id: number) => {
  if (isNaN(Number(car_id)))
    return {
      error: "Invalid type for id",
    }

  const car_index = cars.findIndex(
    (inner_car) => inner_car.Id === Number(car_id)
  )

  if (car_index === -1)
    return {
      error: "204 Content Not Found",
    }

  return {
    data: cars[car_index],
  }
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
  update_car: (car: TCar) =>
    | {
        error: string
        message?: undefined
      }
    | {
        message: string
        error?: undefined
      }
  delete_car: (car_id: number) =>
    | {
        error: string
        message?: undefined
      }
    | {
        message: string
        error?: undefined
      }
}

type Tfind_car = (id: number) =>
  | {
      error: string
      data?: undefined
    }
  | {
      data: TCar
      error?: undefined
    }

export const Car = ({
  car,
  update_car,
  delete_car,
}: { car: TCar } & Tupdate_and_delete) => {
  // return <pre>{JSON.stringify(car, null, 2)} </pre>

  const {
    Id,
    Brand,
    LicensePlate,
    Manufacturer,
    OperationCity,
    Status,
    CreatedAt,
    LastUpdatedAt,
  } = car

  const [is_editing, set_is_editing] = useState(false)

  const handle_edit = () => {
    set_is_editing(true)
  }

  const handle_save = () => {
    set_is_editing(false)
    const response = update_car(car_edition)
    if (response.error) console.log(response.error)
    if (response.message) console.log(response.message)
  }

  const handle_delete = () => {
    const response = delete_car(Id)
    if (response.error) console.log(response.error)
    if (response.message) console.log(response.message)
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
      {!is_editing && (
        <>
          <div>Id : {Id}</div>
          <div>Brand : {Brand}</div>
          <div>LicensePlate : {LicensePlate}</div>
          <div>Manufacturer : {Manufacturer}</div>
          <div>OperationCity : {OperationCity}</div>
          <div>Status : {String(Status)}</div>
          <div>CreatedAt : {String(CreatedAt)}</div>
          <div>LastUpdatedAt : {String(LastUpdatedAt)}</div>
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
            name="LicensePlate"
            value={car_edition.LicensePlate}
            onChange={handle_change_input}
          />

          <Field
            name="Manufacturer"
            value={car_edition.Manufacturer}
            onChange={handle_change_input}
          />

          <Field
            name="OperationCity"
            value={car_edition.OperationCity}
            onChange={handle_change_input}
          />

          <Field
            name="Status"
            value={car_edition.Status}
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const response = find_car(Number(car_id))

    if (response.error) {
      set_car_founded(undefined)

      set_error(response.error)
      setTimeout(() => {
        set_error("")
      }, 5000)
    }

    set_error("")

    set_car_founded(response.data)
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
          margin: "5rem",
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

      <div>{error && error}</div>

      {car_founded && <Car {...{ car: car_founded, update_car, delete_car }} />}
    </div>
  )
}

const get_cars = async () => {
   const fetch_cars = await getData('cars')

    console.log('fetch_cars : ', fetch_cars)
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
  useEffect( () => {
    
    get_cars()

    const inner_cars = make_dummy_cars()
    setCars(inner_cars)
  }, [])

  const find_car = (car_id: number) => {
    if (!cars)
      return {
        error: "No cars",
      }

    const response = find_internal_car(cars, car_id)
    if (response.error) return response
    if (response.data) {
      set_last_car_searched(car_id)
      return response
    }

    return {
      error: "unknown",
    }
  }

  const update_car = (car: TCar) => {
    if (!cars)
      return {
        error: "No cars",
      }

    const new_cars = cars.map((inner_car) => {
      if (inner_car.Id === car.Id) return car
      return inner_car
    })

    setCars(new_cars)

    return {
      message: "Car edited.",
    }
  }

  const delete_car = (car_id: number) => {
    if (!cars)
      return {
        error: "No cars",
      }

    if (car_id === last_car_searched) set_clean(true)

    const new_cars = cars.filter((car) => car.Id !== car_id)

    setCars(new_cars)

    return {
      message: "Car delited.",
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
            key={car.Id}
            car={car}
            update_car={update_car}
            delete_car={delete_car}
          />
        ))}
      </div>
    </div>
  )
}

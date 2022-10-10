import { useEffect, useState } from "react"
import { getCars, getCar, putCar, deleteCar as removeCar } from "./fetch"

import { TCar, TUpdateAndDeleteCar, TFindCar } from "./types"

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
      style={{
        padding: "0.45rem",
      }}
    />
  </label>
)

export const Car = ({
  car,
  updateCar,
  deleteCar,
}: { car: TCar } & TUpdateAndDeleteCar) => {
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

  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    const response = await updateCar(car_edition)

    if (response?.error) {
      setError(response.error)

      setTimeout(() => {
        setError("")
      }, 5000)
      return
    }

    if (response?.data) console.log("response.data : ", response.data)
    setIsEditing(false)
  }

  const handle_delete = async () => {
    const response = await deleteCar(id)
    if (response?.error) {
      setError(response.error)

      setTimeout(() => {
        setError("")
      }, 5000)
      return
    }

    if (response?.data) console.log("response.data : ", response.data)
  }

  const [car_edition, set_car_edition] = useState(car)

  const handle_change_input = (e: React.ChangeEvent<HTMLInputElement>) =>
    set_car_edition((s) => ({ ...s, [e.target.name]: e.target.value }))

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
      {!isEditing && (
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

      {isEditing && (
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
        {!isEditing && (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handle_delete}>Delete</button>
          </>
        )}

        {isEditing && <button onClick={handleSave}>Save</button>}
      </div>
    </div>
  )
}

export const SearchACar = ({
  findCar,
  updateCar,
  deleteCar,
  searchCleaner: { clean, cleaned },
}: {
  findCar: TFindCar
  searchCleaner: {
    clean: boolean
    cleaned: () => void
  }
} & TUpdateAndDeleteCar) => {
  const [car_id, set_car_id] = useState("")
  const [car_founded, set_car_founded] = useState<TCar>()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const response = await findCar(Number(car_id))

    if (response?.error) {
      set_car_founded(undefined)

      setError(response.error)
      setTimeout(() => {
        setError("")
      }, 5000)

      return
    }

    setError("")

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
          style={{ padding: "0.75rem" }}
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

      {car_founded && <Car {...{ car: car_founded, updateCar, deleteCar }} />}
    </div>
  )
}

const getAsyncCars = async () => {
  try {
    const fetch_cars = await getCars()
    return fetch_cars
  } catch (error) {
    console.log("Error getAsyncCars  : ", error)
  }
}

const useCars = () => {
  const [cars, setCars] = useState<TCar[]>()
  const [lastCarSearched, setLastCarSearched] = useState<number>()
  const [clean, setClean] = useState(false)

  const cleaned = () => {
    setClean(false)
  }

  //
  // get cars
  useEffect(() => {
    getAsyncCars().then((inner_cars) => {
      setCars(inner_cars)
    })
  }, [])

  const findCar = async (car_id: number) => {
    try {
      const fetch_car = await getCar(car_id)
      setLastCarSearched(car_id)
      return fetch_car
    } catch (error) {
      console.log("error :", error)
    }
  }

  const updateCar = async (car: TCar) => {
    try {
      const response = await putCar(car.id, car)

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

  const deleteCar = async (car_id: number) => {
    try {
      const response = await removeCar(car_id)

      if (!cars)
        return {
          error: "No cars",
        }

      if (response?.error) return response

      if (car_id === lastCarSearched) setClean(true)

      const new_cars = cars.filter((car) => car.id !== car_id)

      setCars(new_cars)

      return response
    } catch (error) {
      console.log("Error edliting car, ", error)
    }
  }

  return {
    cars,
    findCar,
    updateCar,
    deleteCar,
    searchCleaner: {
      clean,
      cleaned,
    },
  }
}

export const OurCars = () => {
  const { cars, findCar, updateCar, deleteCar, searchCleaner } = useCars()

  return (
    <div>
      <SearchACar
        findCar={findCar}
        updateCar={updateCar}
        deleteCar={deleteCar}
        searchCleaner={searchCleaner}
      />

      <div>
        {cars?.map((car) => (
          <Car
            key={car.id}
            car={car}
            updateCar={updateCar}
            deleteCar={deleteCar}
          />
        ))}
      </div>
    </div>
  )
}

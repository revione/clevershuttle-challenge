import { useState } from "react"

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

let cars = Array.from({ length: 10 }, (_, i) => ({
  ...car_example,
  Id: i,
  Status: STATUS[getRandomIntInclusive(0, 2)] as TStatus,
  CreatedAt: make_a_date(),
  LastUpdatedAt: make_a_date(),
}))

const find_a_car = (car_id: number | string) => {
  if (isNaN(Number(car_id)))
    return {
      error: "Please suply a number",
    }

  const car_index = cars.findIndex(
    (inner_car) => inner_car.Id === Number(car_id)
  )

  if (car_index === -1)
    return {
      error: "Car not founded",
    }

  return {
    data: cars[car_index],
  }
}

const update_a_car = (car: TCar) => {
  if (isNaN(Number(car.Id)))
    return {
      error: "it is a string.",
    }

  const car_index = cars.findIndex(
    (inner_car) => inner_car.Id === Number(car.Id)
  )

  if (car_index === -1)
    return {
      error: "Car not founded",
    }

  cars = cars.map((inner_car) => {
    if (inner_car.Id === car.Id) return car
    return inner_car
  })

  return {
    message: "Car edited.",
  }
}

const delete_a_car = (car_id: number) => {
  if (isNaN(Number(car_id)))
    return {
      error: "Please suply a number",
    }

  const car_index = cars.findIndex(
    (inner_car) => inner_car.Id === Number(car_id)
  )

  if (car_index === -1)
    return {
      error: "Car not founded",
    }

  cars = cars.filter((car) => car.Id !== car_id)

  return {
    message: "Car delited.",
  }
}

export const SearchACar = () => {
  const [car_id, set_car_id] = useState("")
  const [car_founded, set_car_founded] = useState<TCar>()
  const [error, set_error] = useState("")

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const car_founded = find_a_car(Number(car_id))

    if (car_founded.error) {
      set_car_founded(undefined)

      set_error(car_founded.error)
      setTimeout(() => {
        set_error("")
      }, 5000)
    }

    set_error("")

    set_car_founded(car_founded.data)
  }

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

      {/* <pre>{car_founded && JSON.stringify(car_founded, null, 2)}</pre> */}

      {car_founded && <Car car={car_founded} />}
    </div>
  )
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

export const Car = ({ car }: { car: TCar }) => {
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
    const response = update_a_car(car_edition)
    if (response.error) console.log(response.error)
    if (response.message) console.log(response.message)
  }

  const handle_delete = () => {}

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
          {/* <input type='text'placeholder="etwas" value={car_edition.Id} onChange={handle_change_input} />  */}

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

          {/* <input type='text'placeholder="etwas" value={car_edition.CreatedAt} onChange={handle_change_input} /> 
          <input type='text'placeholder="etwas" value={car_edition.LastUpdatedAt} onChange={handle_change_input} />  */}
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

export const Cars = () => {

  let inner_cars = cars

  console.log(inner_cars)


  return (
    <div>
      {inner_cars.map((car) => (
        <Car key={car.Id} car={car} />
        // <div key={car.Id}>
        //   {/* <pre key={car.Id}>{JSON.stringify(car, null, 2)}</pre> */}
        // </div>
      ))}
    </div>
  )
}

export const OurCars = () => (
  <div>
    <SearchACar />
    <Cars />
  </div>
)

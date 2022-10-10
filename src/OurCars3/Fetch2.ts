const BACKEND_URL =
  "https://nckbku0m91.execute-api.eu-central-1.amazonaws.com/cars"

export const get_cars = async () =>
  await fetch(BACKEND_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "API-Key": "secret",
    },
  }).then((res) => res.json())

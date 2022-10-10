const headers = {
  Origin: "http://127.0.0.1:5173",
}


const myHeaders = new Headers();
myHeaders.append('Origin', 'http://127.0.0.1');

const myInit = {
  mode: <RequestMode>"no-cors",
  headers: myHeaders,
  cache: <RequestCache>"no-cache",
};


const shared_options = {
  mode: <RequestMode>"no-cors", // no-cors, *cors, same-origin
  cache: <RequestCache>"no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: <RequestCredentials>"omit", // include, *same-origin, omit
  headers,
  redirect: <RequestRedirect>"follow", // manual, *follow, error
  referrerPolicy: <ReferrerPolicy>"no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}

const BACKEND_URL = "https://nckbku0m91.execute-api.eu-central-1.amazonaws.com"

export async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(`${BACKEND_URL}/${url}`, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    ...myInit,
  })

  myHeaders.append('Accept-Encoding', 'deflate');

  return response.json() // parses JSON response into native JavaScript objects
}

// updateData("https://example.com/answer", { answer: 42 }).then((data) => {
//   console.log(data) // JSON data parsed by `data.json()` call
// })

export async function updateData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(`${BACKEND_URL}/${url}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    ...myInit,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })

  return response.json() // parses JSON response into native JavaScript objects
}

export async function deleteData(url = "") {
  // Default options are marked with *
  const response = await fetch(`${BACKEND_URL}/${url}`, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    ...myInit,
  })

  return response.json() // parses JSON response into native JavaScript objects
}

____________________

# Stack used

**Vite - React - Typescript** 

Run development
```
yarn dev
```

Make a build
```
yarn build
```

See the build preview
```
yarn preview
```


____________________


## steps followed to solve the challenge

-   read the documentation provided, after understanding what was required, think about the steps to follow.
-   first make a mock up of cars.
-   make the UI simple but with input animations to make it look good enough.
-   organize the fetch, consume the resources.
-   display the results in the UI
-   upload the project.


# Engineering - Frontend Challenge

Dear candidate, thank you for showing interest to join CleverShuttle Engineering team. 

To get a better impression of your coding skills we are sending you this code challenge. 

When you are ready to submit your solution, 
please follow the submission instructions below.

## General instructions:

The challenge is a simplified version of tasks this role would work on a day to day basis. 

The idea is for both parties to get a glimpse on what a regular work would look like.

**Note:** This is by no means a solution that we would use in our code base. 

The intention is for the sake of interviewing only and will be discarded after the interviewing process is complete.

What we value in a submission?

We would like to give some hints on what we value the most in your submission. 
We would appreciate __:__

* A working solution (done is better than perfect) No over engineering

* Clean code and architecture

* Well tested code

* Clean and small git commits

Use of build tool (please include instructions how to run the solution) 
Indication on how much time you spent on it.

**Note:** You are encouraged to submit what you have managed to prepare. 
It doesn’t have to be perfect!

## Challenge scenario:

We have a backend API to store and retrieve the data about the cars of our fleet. 

A “Car” model would have the following properties:

```
   Id             int
   Brand          varchar(50)
   LicensePlate   varchar(15)
   Manufacturer   varchar(50)
   OperationCity  varchar(100)
   Status         enum (values: available, in-maintenance, out-of-service)
   CreatedAt      datetime
   LastUpdatedAt  datetime
```

____________________________________________________________


The API responds to following requests:


GET /cars

GET /cars HTTP/1.1

Headers
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Origin: https://example.com
Host: nckbku0m91.execute-api.eu-central-1.amazonaws.com
User-Agent: HTTPie/3.1.0


Response
Headers
HTTP/1.1 200 OK
Apigw-Requestid: WSg1ihmdliAEJXA=
Connection: keep-alive
Content-Length: 277
Access-Control-Allow-Origin: *
Content-Type: application/json
Date: Wed, 03 Aug 2022 13:42:46 GMT

```
[
   {
      "brand": "Flexa",
      "createdAt": "2017-09-01T10:23:47.000Z",
      "id": 12345,
      "lastUpdatedAt": "2022-04-15T13:23:11.000Z",
      "licensePlate": "L-CS8877E",
      "status": "available"
   }, {
      "createdAt": "2022-08-03T13:30:14.238Z",
      "id": 23,
      "lastUpdatedAt": "2022-08-03T13:37:11.040Z",
      "status": "available"
   }
]
```

____________________________________________________________

GET /cars/foo (invalid id type)
GET /cars/foo HTTP/1.1

Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: nckbku0m91.execute-api.eu-central-1.amazonaws.com
Origin: https://example.com
User-Agent: HTTPie/3.1.0


HTTP/1.1 400 Bad Request
Apigw-Requestid: WSgv-h3yFiAEJBA=
Connection: keep-alive
Content-Length: 21
Access-Control-Allow-Origin: *
Content-Type: text/plain
Date: Wed, 03 Aug 2022 13:42:10 GMT

"Invalid type for id"

____________________________________________________________

GET /cars/0 (nonexistent resource)
GET /cars/0 HTTP/1.1

Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: nckbku0m91.execute-api.eu-central-1.amazonaws.com
Origin: https://example.com
User-Agent: HTTPie/3.1.0


HTTP/1.1 404 Not Found
Apigw-Requestid: WSgbRjqjFiAEJ3Q=
Connection: keep-alive
Content-Length: 0
Content-Type: application/json
Access-Control-Allow-Origin: *
Date: Wed, 03 Aug 2022 13:39:58 GMT


____________________________________________________________


DELETE /cars/0
Always returns 204, even if resource did not exist.


DELETE /cars/0 HTTP/1.1

Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 0
Host: nckbku0m91.execute-api.eu-central-1.amazonaws.com
Origin: https://example.com
User-Agent: HTTPie/3.1.0


HTTP/1.1 204 No Content
Apigw-Requestid: WSgcpgW6FiAEJsQ=
Connection: keep-alive
Content-Length: 0
Content-Type: application/json
Access-Control-Allow-Origin: *
Date: Wed, 03 Aug 2022 13:40:07 GMT

____________________________________________________________

PUT /cars/23 (new resource)

PUT /cars/23 HTTP/1.1


Accept: application/json, */*;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 66
Content-Type: application/json
Host: nckbku0m91.execute-api.eu-central-1.amazonaws.com
Origin: https://example.com
User-Agent: HTTPie/3.1.0

{
    "brand": "Test",
    "licensePlate": "B-CS1E",
    "status": "available"
}


HTTP/1.1 200 OK
Apigw-Requestid: WShDSjkvFiAEKyw=
Connection: keep-alive
Content-Length: 153
Content-Type: application/json
Access-Control-Allow-Origin: *
Date: Wed, 03 Aug 2022 13:44:14 GMT


{
    "brand": "Test",
    "createdAt": "2022-08-03T13:44:14.445Z",
    "id": 23,
    "lastUpdatedAt": "2022-08-03T13:44:14.445Z",
    "licensePlate": "B-CS1E",
    "status": "available"
}


____________________________________________________________

PUT /cars/23 (invalid value for status)

PUT /cars/23 HTTP/1.1

Accept: application/json, */*;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 60
Content-Type: application/json
Host: nckbku0m91.execute-api.eu-central-1.amazonaws.com
Origin: https://example.com
User-Agent: HTTPie/3.1.0

{
    "brand": "Test",
    "licensePlate": "B-CS1E",
    "status": "new"
}


HTTP/1.1 400 Bad Request
Apigw-Requestid: WSheygPaliAEJ0A=
Connection: keep-alive
Content-Length: 26
Content-Type: text/plain
Access-Control-Allow-Origin: *
Date: Wed, 03 Aug 2022 13:47:10 GMT


"Invalid value for status"


____________________________________________________________


PUT /cars/23 (existing resource)

Note: Works as an upsert operation. Properties that are not provided in the request data will be deleted from the stored resource. The createdAt property must be present for an update and cannot be changed, i.e. it must be the same as what is already stored. The lastUpdatedAt property in the request is discarded, and the lastUpdatedAt property of the resource is set to the current time.


PUT /cars/23 HTTP/1.1

Accept: application/json, */*;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 112
Content-Type: application/json
Host: nckbku0m91.execute-api.eu-central-1.amazonaws.com
Origin: https://example.com
User-Agent: HTTPie/3.1.0


{
    "brand": "Test",
    "createdAt": "2022-08-03T13:44:14.445Z",
    "licensePlate": "B-CS1E",
    "status": "out-of-service"
}


HTTP/1.1 200 OK
Apigw-Requestid: WSh0PgkBFiAEQ0Q=
Connection: keep-alive
Content-Length: 158
Content-Type: application/json
Access-Control-Allow-Origin: *
Date: Wed, 03 Aug 2022 13:49:27 GMT


{
    "brand": "Test",
    "createdAt": "2022-08-03T13:44:14.445Z",
    "id": 23,
    "lastUpdatedAt": "2022-08-03T13:49:27.782Z",
    "licensePlate": "B-CS1E",
    "status": "out-of-service"
}


____________________________________________________________


Your challenge is to 

create a React frontend using TypeScript for List, 
Create and Read methods.


About the look and feel of the UI, 
feel free to make the design beautiful, 
but do not spend too much effort on the beauty part. 

The focus is on clean look and feel with a good React code.


The URL of the backend is: 

https://api.challenge/cars


Submission


To submit your code challenge, please do the following:


Create a public GitHub repo in your account

Create a new empty project for this challenge in your favourite IDE

Push this empty project as initial state

Work on the solution

Create a PR for your changes (including project structure)

Inform the recruiter that the PR is ready and send the link where we can see it

We look forward to review your solution! 
Your CleverShuttle Engineering Team




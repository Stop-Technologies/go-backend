# Go Backend
This is a web server for the Go project, it provides a set of endpoints to manage the access control on any organization.

The app abstract two roles on the organization:
  * Admin has the ability to modify every user that is not an addmin an manage/add permissions and places, also can act as a moderator.
  * Moderator has the ability to verify if a user with No role has access to some place.

Every entity in the data model can be managed by the admin role. This is specified in the usage section with a postman collection.

### Install Docker Engine

[Use the official docker website](https://docs.docker.com/engine/install/)

### Use Docker Compose to run the multicontainer app

```bash
# On the root dir of the project:
docker-compose up
```

### Connect to a terminal on the app container to run the migrations

```bash
# On the root dir of the project:
docker-compose run app bash

# Run as superuser on linux
sudo docker exec -u 0 -it go-backend_app_1  bash
```

### Run the migrations

```bash
npm run migrate up
```

## Now the Go backend app is running on [localhost:3000](http://localhost:3000)


### Security anotations
* The system was provided with oauth2 with password and refresh token schema.
* The passwords are encrypted on the database using SHA2.
* The database queries are parameterized to avoid sql injection.

## Usage
### This [postman collection](https://www.getpostman.com/collections/3290d2206d5b86b6208d) can be imported to see example request on how to use the server.
### Requests description:
* Admin folder: this set of requests work only with an admin authorization token, and can be used to manage all the entities in the database. 
* auth folder: this set of requests define the auth endpoints to get a token(login), refresh a token and revoke a token(logout).
* util: the seed route can be used for testing adding fake entities to the database. This endpoint resides in the index router.
* Other requests: permissions/access/:id is used to verify if a given user has access to a specific place in a especific time.


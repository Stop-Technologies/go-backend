# Go Backend

### Install Docker Engine

[Use the official docker website](https://docs.docker.com/engine/install/)

### User Docker Compose to run the multicontainer app

```bash
# On the root dir of the project:
docker-compose up
```

### Connect to a terminal on the app container to run the migrations

```bash
# On the root dir of the project:
docker-compose run app bash
```

### Run the migrations

```bash
npm run migrate up
```

## Now the Go backend app is running on [localhost:3000](http://localhost:3000)

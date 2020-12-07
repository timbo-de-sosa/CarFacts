# CarFacts
This is a quick test repo to display microservice architectural design. It consists of:
- A public facing API
- A data service API that is not accessible outside of the docker container
- A postgres server that is not accessible outside of the docker container


## Running the API
To run the API, simply clone the repo and run `docker-compose up -d` to start everything in the background. This will start all three servers and populate the database. To see it in action, perform a GET requests to `http:localhost:8080/cars`. You can also query individual cars by id with the `http:localhost:8080/cars/${id}` format.

## Testing
Since there is no business logic happening, this repo only contains integration tests. Follow these steps to run the tests.
1. `docker-compose up -d`
2. `sh runTests.sh`

## Wishlist
If this were a real environment, the following changes would most likely take place:
* The two services would have their own repos and tests
* The code calling different services would be separated from the controllers into domain service files and tested
* Dependency injection to facilitate aforementioned testing
* POST and PATCH routes
* A Redis cache in the dataService that would be called before the database is hit and busted on POST and PATCH
* Support for multiple environments through .env files
* Business logic such as logging, analytics, and publishing
* Typed data
* I would receive a paycheck

## Development Note
Since this is docker image-based, it's helpful to clear images after code changes. The following command will stop the current containers, destroy the images, and rebuild them:

```
docker-compose down -v && docker images -a | grep "carfacts_*" | awk '{print $3}' | xargs docker rmi && docker-compose up
```
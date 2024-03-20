# Choppi api-server

## Features

## Characteristic
* User login
* JWT storage in NestJs
* Generate data for DB in Faker
* All environments are built with docker and docker-compose

## Production environment
* [Production environment](http://localhost:3000/auths/login)

## Production environment swagger
* [Production environment](http://localhost:3000/docs)

## Testing environment
* [Testing environment](http://localhost:3000/auths/login)

## Testing environment swagger
* [Production environment](http://localhost:3000/docs)

## Starting 🚀

*  These instructions will allow you to obtain a copy of the running project on your local machine for development and testing purposes.

* Look [Jelou]() to know the project.

## Usage

#### Directory Structure
```diff

+ ┌── jelou-test
+ |  ├── database-postgres
+ |  ├── projects
+ |  | └─ backend-jelou
+ |  ├── docker-compose.debug
+ |  ├── docker-compose.yml
+ |  ├── README.md
+ └──└── env-example

```

## Prerequisites for installation with docker-compose ⚙️

#### Docker Engine

##### Docker Installation On Linux
* [Docker For Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

##### Docker Installation On Windows
* [Docker For Windows](https://docs.docker.com/docker-for-windows/install/)

#### Docker Compose

##### Docker Compose Installation
* [Docker Compose](https://docs.docker.com/compose/install/)

#### Enabling Non-root Users to Run Docker Commands (Optional)
```diff
sudo groupadd docker
sudo gpasswd -a $USER docker
newgrp docker

+ In the case of a virtual machine, it may be necessary to restart the virtual machine for the changes to take effect.

```

## Initialize (In the main directory run this /workspace)

```diff

+ Rename the file found in the root directory ./ example-env to .env Uncomment the line #DATABASE_HOST=database in this file 

+ Go to directory the projects/backend-jelou directory and rename the file example-env to .env
    
+ Go to directory the /workspace and run the following commands from terminal
    docker-compose up -d
    docker-compose exec api-server yarn run typeorm:generate-migration
    docker-compose exec api-server yarn run typeorm:run-migrations
    docker-compose exec api-server yarn run seed
    
+ If during the compilation (docker-compose up -d) there is an error example: 
        ERROR: for server-yape-develop  UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60))
            Please execute the following commands from the terminal:
                export DOCKER_CLIENT_TIMEOUT=220
                export COMPOSE_HTTP_TIMEOUT=220
    
+ When completing the previous steps we are ready to go to the browser to start using our application go to browser to url http://localhost:3000/auths/login
    User: jagraz29
    Password: Passw*123
```

## Prerequisites for installation conventional ⚙️

```diff

+ Go to directory the projects directory and rename the file example-env to .env
    
+ Run the following commands from 
    
    1. Go to directory the /projects/backend-jelou
  
       1. Rename the file example-env to .env

       2. Run the following commands from terminal:
       
          1. Install the dependencies:
              yarn install
        
          2. Generate the certificates to sign the tokens, enter the `src/auth/certs` folder once inside, execute the following command:
              openssl genrsa -out jwt-private.key 2048 && openssl rsa -in jwt-private.key -pubout -out jwt-public.key
    
          3. Compile the application:
              yarn build
    
          4. Generate the migrations:
              yarn run typeorm:generate-migration
    
          5. Run the migrations:
              yarn run typeorm:run-migrations
    
          6. Run the seeders to create the test data:
              yarn run seed
          
          7. Run the application:
              yarn run start:dev
    
+ When completing the previous steps we are ready to go to the browser to start using our application go to browser to url http://localhost:3000/auths/login
    User: jagraz29
    Password: Passw*123
```

## Additional information 📖

#### Crear host
```diff

+ Edit your operating system's hosts file, adding the container's IP address example hostnames:
    172.18.0.4:3000 m.jelou.xyz

+ In the case of Linux operating system the hosts file is located in the etc directory (/etc/hosts).

```

#### Docker Images
```diff

+ View images
    docker images

+ Remove an image
    docker rmi (imageId o el imageName)

+ Remove all images
    docker rmi $(docker ps -a -q)

```

#### Docker Containers
```diff

+ View containers running
    docker ps

+ View containers stopped and running
    docker docker ps -a

+ Enter a container
    docker exec -ti (containerName o el ContainerId) /bin/sh

+ Stop a container
    docker stop (containerName o el ContainerId)

+ Remove a container
    docker rm (containerName o el ContainerId)

+ Start all containers
    docker start $(docker ps -a -q)

+ Stop all containers
    docker stop $(docker ps -a -q)

+ Turn off all containers
    docker-compose down

+ Remove all containers
    docker rm $(docker ps -a -q)

```

## Built With 🛠️
```diff
+    NestJs
+    Faker
+    TypeOrm
+    Moment
+    PostgreSQL
+    Docker
+    Docker Compose
+    Swagger
```

#### Answers to multiple choice questions
```diff
+ 1 => Given an array of integers, keep a total score based on the following:
    Add 1 point for every even number in the array.
    add 3 point for every odd number in the array, except for the number "5".
    add 5 points every time the number "5" appears in the array.
    Note that 0 is considered even.
    Examples: input: [1,2,3,4,5]
    Output: 3
    
    Response) 
        const numbers = [1,2,3,4,5]
        // const numbers = [17,19,21]
        // const numbers = [5,5,5]
        
        let acm= 0;
        numbers.map(
            (value) => {
                if (value % 2 === 0) {
                    acm = acm + 1;
                } else if (value % 2 !== 0 && value !== 5) {
                    acm = acm  + 3
                } else {
                    acm = acm + 5;
                }
            });
        
        console.log(acm);
    
+ 2 => What verb should you choose for retrieving trade orders with the API server?
    a) GET
    
    
+ 3 => Which of the following API paths should you use?
    b) /contacts/{contact_id}
    
+ 4 => Which of the following API paths should you use?
    b) /contacts/{contact_id}
    
+ 5 => Which HTTP error code(s) should you use to keep the system secure and still report that an error occurred?
    a) 404 if the user doesn't exist, and 403 if the password is wrong.
    
+ 6 => True or false: You should put a fake UUID into the example code (instead of just the text "UUID") as a placeholder.
    b) FALSE

+ 7 => How much work should your method, handleErrors(response), handle?
    b) Check for the presence of an error. If it exists, throw an exception with the error. 

+ 8 => Which way should you implement this error handling?
    b) Make a trait to handle errors so it'll collect errors in any class that uses it. 

+ 9 => Which of the following should you use to name your method?
    d) parseDataForProductsAndSetArray()

+ 10 => What strategy should you use to store and access these credentials?
    d) Put them in a .env file, load data from it into a configuration system, then request the credentials from a database service provider. 
```


## Developed Container ✒️
```diff
+    Developed by: Jose Agraz 
+    Email: joseagraz29@gamil.com
```

# table-web

This is a standalone web client for Table app.

This app is dockerized for both development and production environment.

## Development

### Set up

You need [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) version 2 or higher installed on your system.

Copy the example config file and edit to change configurations.

```
table-web$ cp configs.examples.env configs.env
```

After setting up the config file, build Docker image for development and release with the command below.

```
table-web$ docker-compose build
```

### Run development server

Use [Webpack's dev server](https://webpack.js.org/configuration/dev-server/) to see your version of code served live on the local web server. Use docker-compose to update all dependencies and start up dev server.

```
table-web$ docker-compose up
```

### Build static web app

Build the static web based client app you can directly deploy on production server.

```
table-web$ docker-compose run web yarn build
```

This command will compile your code and output client package on `table-web/build`.

## Deployment

### Set up

To run production server as a service, run following command to install `table-web.service`.

```
table-web$ sh ./scripts/install-service.sh
```

And then, set to use production config file.

```
table-web$ cp configs.production.env configs.env
```

You also need to provide required SSL certificates in `table-api/cert` directory.

### Release a specific version

To release a specific version of the client based on Git tag, follow the steps below.

#### Build for release

Pull the version `{version}` from the Git server and build the client with the following command.

```
table-web$ docker-compose run web yarn run release {version}
```

#### Deploy the client

After successfully build the desired version of the source code to a client,
run following command to put the built app in `table-web/deploy`, and then restart the server to apply.

```
table-web$ sh ./scripts/deploy.sh
```

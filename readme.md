
# table-web

This is a standalone web client for Table app.

## Development

### Set up

You need [node.js](https://nodejs.org/en/) version 5.10 or higher and [Yarn](https://yarnpkg.com/en/docs/install) installed on your system.

Install required dependencies with the command below.

```
table-web$ yarn install
```

After installing all dependencies, copy example config files and edit them to change configurations.

```
table-web$ cp configs/examples/* configs
```

### Run development server

Use [Webpack's dev server](https://webpack.js.org/configuration/dev-server/) to see your version of code served live on the local web server.

```
table-web$ yarn start
```

## Deployment

### Set up




### Build

Build the static web based client app you can directly deploy on production server.

```
table-web$ yarn build
```

This command will compile your code and output client package on `table-web/build`.

### Release

Release a specific version of client based on Git tag.

```
table-web$ yarn run release {version}
```

This will pull the version `{version}` from the Git server and build the client.

After successfully build the desired version of the source code to a client, run following command to put the built app in `table-web/deploy`, and then restart the server to apply.

```
table-web$ yarn run deploy
```

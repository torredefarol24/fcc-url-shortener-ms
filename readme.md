### FreeCodeCamp URLShortener Microservice

- To Test This

#### Create DB Connection File
```sh
$ cd fcc-url-shortener-ms
$ touch mongoConnection.js
```

#### Provide Mongo Connection URL
```sh
# Edit fcc-url-shortener-ms/mongoConnection.js
var connUrl = <YOUR_MONGO_URL>
module.exports = connUrl
```

#### Install Dependencies & Start App
```sh
$ cd fcc-url-shortener-ms
$ yarn install
$ yarn start
```
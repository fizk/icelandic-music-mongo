# Icelandic Music
MongoDB style...


An isomorphic React/GraphQL style application.

### Install
clone this repo

Your IDE might complain, saying that it doesn't find dependencies. I that case, just install `$npm i` and have a `node_modules` directory for the IDE's benefit.

### Run for development
```sh
$ docker-compose build master
$ docker-compose up master
```

Then you could tail the container's output via:
```sh
$ docker-compose logs -ft --tail="all" master web
```

the open [http://localhost](http://localhost)



![icelandicmusicschema](https://user-images.githubusercontent.com/386336/52309706-1a828b00-29f5-11e9-8108-9e1221b6f0e5.png)

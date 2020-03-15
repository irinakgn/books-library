# Books Library

This project is used to catologue books. It allows one to easily add books, which are then cross referenced with Goodreads api. This project was written using nodejs,mongodb, and ejs templates.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

First run the following command to install all of the project dependecies. 

```
yarn 
```

### Installing

A step by step series of examples that tell you how to get a development env running


Thes first step is to go to the following file `./config/default.json` and config your `mongodb` connection string and `port`, that will be used by nodejs to lounge your application :

```
{
  "dbConfig": {
     "host": "mongodb://localhost:27017",
     "collectionName": "libraryApp"
   }
   "port": 9000
}

```

followed by seeding command
```
yarn seed:db 
```
and the commans below to star the project
```
yarn start
```
to start the project.

## Built With

* [NodeJs](https://nodejs.org/en/) - The web framework used
* [MongoDB](https://www.mongodb.com/) - Document Storage
* [ejs](https://ejs.co/) - Templating engine


## Authors

* **Irina Kagan** (https://github.com/irinakgn)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc


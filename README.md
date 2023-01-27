# CarCar

Team:

* Alexis - Sales
* Alexa - Service

## Design
The CarCar application is organized with three microservices working simultaneously. The inventory microservice stores and tracks all of the information pertaining to car manufacturers, vehicle models, and the automobiles that are connected to the car dealership. The service microservice is manages all of the technichians working on cars as well as all the appointments clients are scheduling. The three microservices communicate with each other via polling that periodically refreshes and sends updated information.

## Service microservice
The service microservice handles creating a technician, scheduling/viewing service appointments, and tracking the service history for each vehicle. I created two models to accomplish this: Technician and Service. Furthermore I tracked whether a customer was "vip" by setting up a polling service that ties the VIN information from the inventory microservice with the VIN infomation being collected in my microservice. I created the AutomobileVO model in order to retrieve the VIN information from the inventory microservice.

## Sales microservice

With the sales microservice I created a Sale, Customer, and Employee Model. Using those you are able to create a sale record and list of all sales and the ability to create a customer. With the Employee part you are able to create a sales person(employee) and display a list of the history of sales that each sales person has made. With my poller I was able to get the VIN number for each automobile to be able to tie that to the sale record and each sales person's sales history. I created an AutomobileVO to be able to pull the VIN numbers from the inventory microservice.

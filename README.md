# Wheel Deal

Team:

* Alexis - Sales
* Alexa - Service

## Overview
This application is perfect for dealerships seeking to centralize and streamline their information. With the Sales microservice, you can add sales representatives and customers, allowing you to easily track the vehicles each rep has sold and the vehicles each customer has purchased. The Services microservice allows you to add technicians and schedule appointments for vehicle service. You can view, complete, or cancel appointments, and the microservice also flags VIP customers based on their vehicle identification number (VIN). The Inventory microservice enables you to add manufacturers, create vehicle models, and view a comprehensive list of the dealership's inventory.

## Initialization
Run the following commands in your terminal after you have cloned the project from the main branch:


`docker volume create beta-data` (Builds a new volume that the containers can consume and store data in)


`docker compose build` (Builds images as per the docker-compose.yml file)


`docker compose up` (Starts or restarts all services defined in the docker-compose.yml)


Open browser to http://localhost:3000 to view the home page.

## Design
The Wheel Deal application is a comprehensive and highly organized platform that leverages the power of microservices to optimize its performance. The platform is comprised of three interrelated microservices that work together to deliver a seamless and efficient user experience.

The inventory microservice is the backbone of the platform, serving as a centralized repository for all information related to car manufacturers, vehicle models, and the automobiles in the dealership's inventory. This microservice stores and tracks all of the relevant details, allowing dealership staff to access up-to-date information in real-time.

The service microservice manages the scheduling and execution of all service appointments, from booking to completion. It tracks the technicians working on cars and the appointments clients have scheduled, ensuring that the dealership's service operations run smoothly and efficiently.

The sales microservice manages all sales-related activities, including customer interactions, negotiations, and final transactions. It streamlines the sales process by providing a centralized platform for sales employees to manage customer interactions and track sales progress.

The three microservices communicate with each other via a robust polling system that periodically refreshes and updates the information. This ensures that all data is accurate and up-to-date, providing a seamless and efficient experience for both dealership staff and customers alike.

## Service microservice
The service microservice handles creating a technician, scheduling/viewing service appointments, and tracking the service history for each vehicle. I created two models to accomplish this: Technician and Service. Furthermore I tracked whether a customer was "vip" by setting up a polling service that ties the VIN information from the inventory microservice with the VIN infomation being collected in my microservice. I created the AutomobileVO model in order to retrieve the VIN information from the inventory microservice.

## Sales microservice

With the sales microservice I created a Sale, Customer, and Employee Model. Using those you are able to create a sale record and list of all sales and the ability to create a customer. With the Employee part you are able to create a sales person(employee) and display a list of the history of sales that each sales person has made. With my poller I was able to get the VIN number for each automobile to be able to tie that to the sale record and each sales person's sales history. I created an AutomobileVO to be able to pull the VIN numbers from the inventory microservice.

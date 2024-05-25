# Airbus Aerothon 6.0
### Team name- AeroXcel

Hackathon date - 25/05/2024  

## Given Problem Statement

Enhancing Flight Navigation Mechanism for Optimal Route Planning and Risk Mitigation


## 💻Tech Stack
<br>

![HTML](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)
![JS](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![ReactJs](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![NodeJS](https://img.shields.io/badge/nodejs-3670A0?style=for-the-badge&logo=nodejs&logoColor=ffdd54)
![MongoDB](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

<br>

## Solution Approach


## Installation
Clone this repository: git clone <repository_url>
Navigate to the project directory: cd backend
Install the required packages: node install
Usage
To run the nodejs app, use the following command:

- node start
The API endpoints for fetching and pushing data are:

- GET /airport/ ->Return list of all airports with codenames & coordinates.
- GET /weather/:airport_id   ->Return weather conditions for the particular airport.
- GET /flight_route/    ->Return list of all flight routes with haverian distance and details such as coordinate of airports connected.
- GET /flight_route/get_shortest_route/:source_airport_id/to/:destination_airport_id -> Return shortest path routes from source airport to destination airport.
- The data is assumed to be forecasted data and real-time data entered by the user.

## Database Schema
The database schema for this project is designed to be in the 2nd Normal Form (2NF). It consists of three tables:

- Flights Collection
- Weather Collection
- Airports Collection
- Alerts Collection
- Shortest Path Collection
- Harvesian Distance Collection

## Limitations and Future Work
- This project is still in its early stages and has some limitations. For example, the database could be further optimized to reduce redundancy and increase efficiency.

- In the future, we plan to add support for JWT authentication and authorization. We also plan to integrate the front-end ReactJS application with the API to create a complete solution for the real-time updates for the project.

## Contributors
- Anish
- Vinay
- Rohit
- Ishani

## License
This project is licensed under the MIT License - see the LICENSE file for details.

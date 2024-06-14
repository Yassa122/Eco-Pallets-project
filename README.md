# Plastic Pallets E-commerce Website

Welcome to the Plastic Pallets E-commerce Website project! This project is designed to provide a comprehensive platform for managing and purchasing plastic pallets, leveraging a microservice architecture. It's perfect for developers interested in modern web development with microservices, Kafka, and Next.js.

## Tech Stack

The project uses the following technologies:

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Microservices**: NestJS
- **Messaging**: Kafka
- **Authentication**: JWT
- **Deployment**: Vercel

## Screenshots

Here are some screenshots showcasing different parts of the project:

1. ![Home Page](https://imgur.com/PWsvq0d.png)
2. ![](https://imgur.com/zKbL1Tb.png)
3. ![](https://imgur.com/DyQPPag.png)
4. ![](https://imgur.com/fRkddCl.png)
5. ![](https://imgur.com/kITBkXP.png)

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Git vscode extension**
- **Node.js** (no need to install it, it's already there from previous projects)
- **npm** (no need to install it, it's already there from previous projects)

### Installation

Follow these steps to get your development environment running:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Yassa122/Plastic-Pallets-Software-Project-2.git
    ```

2. **Copy the URL of the repo**:
    - Open VSCode
    - Open a new window
    - Windows: `Ctrl + Shift + P` (on Mac: `Cmd + Shift + P`)
    - Type `git clone`
    - Choose `Clone from GitHub` and paste the repo link
    - Choose a file directory to save the repo location on your PC

3. **Ensure Kafka is running**:
    - Go to the Kafka installation folder and open the `bin` file
    - Click on the path and type `cmd`
    - Run the following command to start `zookeeper.properties`:

      ```bash
      .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
      ```

    - Open a new `cmd` window and run the following command to start `server.properties`:

      ```bash
      .\bin\windows\kafka-server-start.bat .\config\server.properties
      ```

4. **Open the project in VSCode and open a new terminal**:
    
    ```bash
    cd backend
    cd account.services
    npm run start:dev
    ```
     ```bash
    cd backend
    cd product-service
    npm run start:dev
    ```
     ```bash
    cd backend
    cd cart-service
    npm run start:dev
    ```
      ```bash
    cd backend
    cd Home
    npm run start:dev
    ```
   ```bash
    cd backend
    cd email-service
    npm run start:dev
    ```

5. **Open another terminal for the frontend**:
    
    ```bash
    cd plastic-pallets
    npm install
    npm run dev
    ```

## Contributors

| Contributor       | Contribution                                                                 |
|-------------------|------------------------------------------------------------------------------|
| [Fady](https://github.com/FadyIbrahim123)              | Cart Microservice and payment integration using stripe (backend & frontend ) |
| [George](https://github.com/georgeY2002)            | Home Microservice and featured products integration (backend & frontend)     |
| [Renwa](https://github.com/renwaa)             | Authentication service, user management, wishlist, reviews (backend & frontend)    |
| [Dina](https://github.com/dinaa3)              | Product service, integration with kafka along with the cart microservice (backend & frontend) |
| [Amir](https://github.com/amirwessam)              | Emailing service (backend), authentication pages (frontend), and user verification    |
| [Yassa122](https://github.com/Yassa122)          | Team Leader, responsible for authentication flow and Kafka integration across the project                      |


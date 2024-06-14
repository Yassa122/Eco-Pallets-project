# Plastic Pallets E-commerce Website

## Description

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

1. ![Home Page](https://imgur.com/CILC4sT)
2. ![Product Listing](url-to-product-listing-screenshot)
3. ![Product Details](url-to-product-details-screenshot)
4. ![Cart Page](url-to-cart-page-screenshot)
5. ![Checkout Page](url-to-checkout-page-screenshot)
6. ![Order Confirmation](url-to-order-confirmation-screenshot)

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
    npm install
    npm run dev
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
| Yassa122          | Project setup, microservices integration, Kafka setup                        |
| Contributor 2     | Frontend development, UI/UX design, responsive layout                        |
| Contributor 3     | Backend development, API creation, database management                       |
| Contributor 4     | Authentication service, user management, security enhancements               |
| Contributor 5     | Product service, inventory management, integration with payment gateway      |
| Contributor 6     | Order service, cart functionality, real-time order tracking                  |

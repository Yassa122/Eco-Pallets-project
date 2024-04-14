# How to start

A brief description of what this project does and who it's for.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:
- Git vscode extension
- Node.js (no need to install it it's already there from previous projects)
- npm (no need to install it it's already there from previous projects)

### Installation

Follow these steps to get your development environment running:

1. **Clone the repository**:

```bash
git clone https://github.com/Yassa122/Plastic-Pallets-Software-Project-2.git
```
1. **copy the url of the repo**:
****
2. 1. **open vscode**
   2. **open a new window**
   3. **windows **: cntrl + shift + p
      (** on mac**: cmd + shift + p)
   4. **type git clone**
   5. **choose clone from github and paste thr repo link**
   6. **choose a file directory to save the repo location on your pc**
****
3.1. **Make sure that Kafka is running**
   
   2. **Go to the kafka installation folder and open the bin file**
   
   3. **click on the path and type cmd**
   
   4. **this command will run the zookeeper.properties**

   5. ```bash
        .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
       ```
   6. **repeat previous steps and open a new cmd**

   7. **this command will run server.properties** 

   8. ```bash
       .\bin\windows\kafka-server-start.bat .\config\server.properties
       ```
4. 1. **open the project from vscode and open a new terminal**
   
   3. ```bash
        cd backend
      ```
   4. ```bash
        npm install
      ```
   5. ```bash
       npm run dev
       ```
****
5. 1. **open the project from vscode and open a new terminal**
   
   2. ```bash
        cd plastic-pallets
      ```
   3. ```bash
        npm install
      ```
   4. ```bash
       npm run dev
       ```

      ****
   

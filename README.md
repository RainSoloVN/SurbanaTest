# Migration Project

## Overview
This project is a NestJS application that manages locations of buildings. It utilizes TypeORM for database interactions and CQRS for command and query separation. The application supports migrations to manage database schema changes.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   DATABASE_HOST=your_database_host
   DATABASE_PORT=your_database_port
   DATABASE_USERNAME=your_database_username
   DATABASE_PASSWORD=your_database_password
   DATABASE_NAME=your_database_name
   PORT=3000
   ```

## Running Migrations

To initialize the database and run migrations, use the following commands:

1. Build the project:
   ```bash
   npm run build
   ```

2. Run migrations:
   ```bash
   npm run migration:run
   ```

## Usage

To start the application, run:

   ```bash
   npm run start:dev
   ```

The application will be available at `http://localhost:3000`.

## API Endpoints

### Building Endpoints

- **Create Building**
  - **POST** `/building`
  - Request Body:
    ```json
    {
      "name": "Building Name"
    }
    ```

- **Get All Buildings**
  - **GET** `/building`

- **Get Building by ID**
  - **GET** `/building/detail/:id`

- **Update Building**
  - **PATCH** `/building/:id`
  - Request Body:
    ```json
    {
      "name": "Updated Building Name"
    }
    ```

- **Delete Building**
  - **DELETE** `/building/:id`

### Location Endpoints

- **Create Location**
  - **POST** `/location`
  - Request Body:
    ```json
    {
      "code": "Location Code",
      "name": "Location Name",
      "buildingId": 1,
      "parentId": 1
    }
    ```

- **Get All Locations**
  - **GET** `/location`

- **Get Location by ID**
  - **GET** `/location/detail/:id`

- **Get All Roots**
  - **GET** `/location/root`

- **Get All Tree**
  - **GET** `/location/tree?depth=2`

- **Update Location**
  - **PATCH** `/location/:id`
  - Request Body:
    ```json
    {
      "code": "Updated Code",
      "name": "Updated Name",
      "buildingId": 1,
      "parentId": 1
    }
    ```

- **Delete Location**
  - **DELETE** `/location/:id`

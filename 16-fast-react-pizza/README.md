# Pizza Ordering Application

## Overview

Welcome to our ReactJS project built using Vite, a fast frontend build tool. Our goal is to create a straightforward web application for pizza ordering and delivery. Through meticulous planning and leveraging a range of technologies, we aim to deliver an intuitive and efficient solution for pizza enthusiasts.

## Getting Started

### 1. Thinking in React

The initial step involves conceptualizing the application's structure using React's component-based architecture:

1. **Breaking Down Components**: Identify the various components necessary for the desired functionalities.
2. **Building a Static Version**: Develop a static version of the application without incorporating state management.
3. **State Management and Data Flow**: Plan the state management strategy and data flow within the application, considering scalability and complexity.

While this approach suits smaller applications with limited features, adapting it to real-world scenarios requires a more comprehensive process.

### 2. Planning Process

To effectively plan and execute the project, we'll follow these steps:

1. **Gadering application requirements and features**
2. **Devide the application to multiple pages**

- Think about overall and page-level UI
- Break desired UI into compoents
- Desing and build a static version(no state)

3. **Devide application into feature categories**

- Think about state management + data folow

4. **Decide on what libraries to use (technology decisions)**

## Project Breakdown

### Step 1: Gathering Requirements and Features

- Very simple application, where users can order one or more pizzas from a menu
- Requires no user accounts and no login: user just input their names befores using app
- The pizza menu can change, so it should be loaded from an API (DONE)
- User can add multiple pizzas to a cart before ordering
- Ordering requires just the user's name, phone number, and address
- If posible, GPS location should also be provided, to make delivery easier
- User's can mark their order as "priority" for an additional 20% of the cart price
- Payment are made on delivery, so no payment processing is necesary in the app
- Each order will get a unique ID that should be displayed, so the user can later look up their order based on the ID
- Users should be able to mark their order as "priorty" order even after it has been after it has been placed

### Step 2 & 3: Feature Categories and Pages

#### Feature Categories

1. **User**: Management of user-related functionalities.
2. **Menu**: Loading and managing the pizza menu from a remote API.
3. **Cart**: Handling the user's selected items before ordering.
4. **Order**: Managing the ordering process and associated functionalities.

#### Pages

1. **Home**: "/"
2. **Menu**: "/menu"
3. **Cart**: "/cart"
4. **Placing a New Order**: "/order/new"
5. **Looking Up an Order**: "/order/:orderID"

### Step 3 & 4: State and Technology Decisions

#### State Management

- **User**: Global UI state.
- **Menu**: Global remote state fetched from an API.
- **Cart**: Global UI state.
- **Order**: Global remote state submitted to an API.

#### Technology Decisions

1. **Routing**: Utilizing React Router for managing page navigation.
2. **Styling**: Employing tailwindcss for efficient and trendy styling.
3. **Remote State Management**: Exploring React Router for fetching data, particularly version 6.4+.
4. **Global UI State Management**: Considering Redux for state management.

## Setting Up and Running the Project Locally

Follow these steps to set up and run the project locally:

1. Clone the repository.
2. Navigate to the project directory: `cd pizza-ordering-app`.
3. Install dependencies: `npm install` or `yarn install`.
4. Start the development server: `npm run dev` or `yarn dev`.
5. Open the application in your browser at `http://localhost:3000`.

## Building for Production

To build the project for production, run the following command:

```bash
npm run build
```

or

```bash
yarn build
```

The production-ready files will be available in the `dist` directory.

## Contributing

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# The Wild Oasis

## Overview

Welcome to The Wild Oasis hotel management project, built using React and various other tools and technologies. Our aim is to provide a comprehensive system for managing hotel bookings, cabins, guest information, and application settings.
<img width="1680" alt="Screenshot 2024-04-18 at 16 16 00" src="https://github.com/AnhtuanUit/React-Course-Learning-Parts/assets/13465843/55515e8d-d8c9-42a9-9b3a-7f016ba957d8">
## Getting Started
1. **Thinking in React**
   - Break down the project structure using React's component-based architecture.
   - Build a static version of the application without incorporating state management.
   - Plan the state management strategy and data flow within the application.
2. **Planning Process**
   - Gather application requirements and features.
   - Divide the application into multiple pages.
   - Consider overall and page-level UI design.
   - Break desired UI into components.
   - Design and build a static version without state.
   - Divide the application into feature categories.
   - Think about state management and data flow.
   - Decide on what libraries or technologies to use.

## Project Breakdown

### Step 1: Gathering Requirements and Features

1. **Authentication**
   - Users are hotel employees who must log in to perform tasks.
   - New users can only sign up within the application to ensure authenticity.
   - Users can upload avatars and change their name and password.
2. **Cabin**
   - Display a table view of all cabins with relevant details like photo, name, capacity, price, and current discount.
   - Users can update, delete, or create new cabins, including uploading photos.
3. **Booking**
   - Show a table view of all bookings with arrival and departure dates, status, paid amount, cabin, and guest data.
   - Booking status includes "unconfirmed," "checked in," or "checked out," filterable in the table.
   - Additional booking data includes number of guests, nights, guest observations, and breakfast information.
4. **Check in/check out**
   - Users can delete, check in, or check out a booking.
   - Payment acceptance and confirmation occur on check-in.
   - Guests can add breakfast on check-in if not already booked.
5. **Guest**
   - Store guest data such as full name, email, national ID, nationality, and country flag.
6. **Dashboard**
   - Initial screen displaying:
     - Guests checking in and out on the current day with task functionalities.
     - Statistics on recent bookings, sales, check-ins, and occupancy rate.
     - Charts showing daily hotel sales and stay durations statistics.

### Step 2 & 3: Feature Categories and Pages

#### Feature Categories

1. Authentication
2. Cabin
3. Guest
4. Dashboard
5. App Setting
6. Bookings
7. Check in/Check out

#### Pages

1. Dashboard - `/dashboard`
2. Bookings - `/bookings`
3. Cabins - `/cabins`
4. Booking check in/check out - `/checkin/:bookingID`
5. App settings - `/settings`
6. User sign up - `/users`
7. Login - `/login`
8. Account Settings - `/account`

### Step 3 & 4: State and Technology Decisions

#### Technology Decisions

1. Routing: React Router
2. Styling: Styled Components
3. Remote State Management: React Query
4. Global UI State Management: Context API
5. Form Management: React Hook Form
6. Other Tools: React Icons, React Hot Toast, Recharts, date-fns, Supabase

## Setting Up and Running the Project Locally

1. Clone the repository.
2. Navigate to the project directory: `cd the-wild-oasis`.
3. Install dependencies: `npm install` or `yarn install`.
4. Start the development server: `npm run dev` or `yarn dev`.
5. Open the application in your browser at [http://localhost:3000](http://localhost:3000/).

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

We welcome contributions from the community. Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

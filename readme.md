# Luxe Screens

Luxe Screens is a premium private theatre booking web application where users can explore luxury theatre experiences, select a theatre, choose a date and time slot, customize their experience with cakes, decorations and gifts, apply coupons, make payments and manage their bookings.

## Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Logout
- Forgot password
- Password reset using OTP

### Theatre Booking

Users can create a private theatre booking through a multi-step booking process.

Booking flow includes:

1. Date & Time
2. Theatre Selection
3. Contact Details
4. Occasion
5. Cake Selection
6. Decoration Selection
7. Gift Selection
8. Payment
9. Booking Confirmation

### Theatre Selection

Users can choose from available theatres such as:

- Luxe Gold
- Luxe Premium

Each theatre has its own pricing, capacity, screen and sound configuration.

### Add-ons

Users can customize their booking with additional services:

- Cakes
- Decorations
- Gifts

Each add-on can have multiple options and prices.

### Coupon System

Users can apply valid coupon codes during booking.

Coupons can provide discounts on the booking total.

Example:

| Coupon Code | Discount |
| ----------- | -------- |
| LUXE10      | 10%      |
| LUXE500     | 500      |

### Payment

The application supports the simulated booking payment flow.

After successful payment:

- Booking payment status is updated
- Booking confirmation is generated
- User can view the booking in My Bookings

### My Bookings

Authenticated users can:

- View their bookings
- Check booking details
- View payment status
- View booking information

### AI Experience Planner

The AI Planner helps users plan a theatre experience based on inputs such as:

- Occasion
- Budget
- Number of guests

### Responsive Design

The application is designed to work across:

- Desktop
- Tablet
- Mobile

---

## Tech Stack

### Frontend

- React
- React Router
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Additional Technologies

- Nodemailer
- AI integration
- REST APIs

### Deployment

- Frontend: Vercel
- Backend: Render

---

## Project Structure

```text
Luxe-Screens/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── config/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── seed/
│   ├── server.js
│   └── package.json
│
└── README.md
```

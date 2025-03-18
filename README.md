# LearnLoft - Certification & Course Marketplace

A modern platform for selling professional certifications and courses in web development, IBM, Microsoft, and other technologies.

## Features

- Browse and purchase professional certifications
- Course catalog with detailed information
- Secure payment processing
- User authentication and profiles
- Shopping cart functionality
- Responsive design for all devices

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: JWT
- Payment Processing: Stripe

## Project Structure

```
learnloft/
├── client/                 # Frontend React application
├── server/                 # Backend Node.js/Express application
├── README.md              # Project documentation
└── package.json           # Root package.json
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create `.env` file in the server directory
   - Add necessary environment variables

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd client
   npm start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 
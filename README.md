# Blockchain-Based Supply Chain Transparency for Agricultural Produce

This project creates a transparent and secure agricultural supply chain using blockchain technology.

The system enables farmers, distributors, retailers, consumers, and government authorities to track agricultural produce from farm to market.

Using blockchain, QR-based product tracking, and real-time digital records, the platform ensures:
- Transparency in supply chain
- Fair pricing for farmers
- Authentic product tracking for consumers
- Fraud prevention in agricultural trade

## Team Members
1. Member 1 – Frontend Development
2. Member 2 – Backend Development
3. Member 3 – Blockchain Development
4. Member 4 – AI/ML Integration
5. Member 5 – Database & Integration

## Technology Stack
**Frontend:** React.js  
**Backend:** Node.js / Express  
**Blockchain:** Ethereum / Hyperledger  
**Database:** MongoDB / PostgreSQL

## Project Structure

```
Agriculture-Blockchain-SupplyChain/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── AddProduct.js
│   │   ├── App.js
│   │   ├── FarmerDashboard.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/                # Node.js backend server
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration

5. Start the development server:
```bash
npm run dev
```

The backend will run on [http://localhost:5000](http://localhost:5000)

## Features

- User Authentication (Login/Register)
- Farmer Dashboard
- Product Management
- Supply Chain Tracking
- Blockchain Integration
- QR Code Generation

## Development

- Frontend: React with React Router
- Styling: Custom CSS
- State Management: React Hooks
- Backend API: Express.js
- Future: Blockchain smart contracts integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License


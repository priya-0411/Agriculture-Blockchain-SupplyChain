# Agriculture Blockchain Supply Chain - Backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration.

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

- `GET /` - API health check

## Project Structure

```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
└── README.md         # This file
```

## Future Development

- Add route handlers
- Implement database models
- Add blockchain integration
- Implement authentication middleware
- Add validation and error handling

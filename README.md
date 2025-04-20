You can access the website at - https://exquisite-youtiao-aec6ee.netlify.app
# CarScope 🚗

A modern React application for exploring car specifications, images, and safety ratings. Search for any vehicle by make, model, and year to get detailed information instantly.

## Features

- 🔍 Search cars by make, model, and year
- 📊 View detailed specifications (engine, horsepower, fuel type, etc.)
- 🖼️ Automatic car image loading
- 🛡️ Safety ratings and crash test data
- 💡 Brand-specific fun facts
- 🕒 Local search history
- 🌓 Dark/Light mode support
- 📱 Fully responsive design

## Live Demo

Visit [CarScope](https://exquisite-youtiao-aec6ee.netlify.app) to try it out!

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd carscope
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## API Integration

CarScope integrates with multiple car-related APIs:

- NHTSA Vehicle API - For vehicle specifications and safety data
- Car Imagery API - For vehicle images
- API Ninjas - For detailed car specifications

## Project Structure

```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── utils/             # Helper functions and API calls
└── App.tsx            # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NHTSA](https://www.nhtsa.gov/nhtsa-datasets-and-apis) for vehicle data
- [Car Imagery API](https://www.carimagery.com/) for vehicle images
- [API Ninjas](https://api-ninjas.com/) for detailed specifications

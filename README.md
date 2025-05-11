# Francify E-commerce Website

Francify is a modern, feature-rich e-commerce platform built with React and Tailwind CSS. This project provides a complete shopping experience with product browsing, cart management, user authentication, and checkout functionality.

## Features

- **Modern UI Design**: Clean and responsive interface built with Tailwind CSS
- **Product Management**: Browse products by category, filter and sort options
- **User Authentication**: Login, registration, and profile management
- **Shopping Cart**: Add, remove, and update quantities of products
- **Wishlist**: Save products for later
- **Checkout Process**: Complete order flow with shipping and payment options
- **Order Management**: View order history and details
- **Responsive Design**: Optimized for all device sizes

## Tech Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library
- **Context API**: For state management
- **Local Storage**: For persisting cart and user data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ChikamsoChidebe/francify.git
   cd francify
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
francify/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # Reusable components
│   ├── context/        # Context providers
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Deployment

To build the project for production:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory, which can be deployed to any static hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Unsplash](https://unsplash.com/) for product images
# Unlock to Thrive

Unlock to Thrive is a web application designed to connect Rwandan students with mentors who have succeeded in their respective careers. The platform provides students with insights into various career paths, opportunities for skill development, and resources to prepare for the job market.

## Features

- Connect students with mentors in their desired career paths.
- Explore various career opportunities with detailed insights.
- Practice and develop market-relevant skills (e.g., languages, ICT, etc.).

## Technologies Used

This project is the frontend part of the application and is built using the following technologies:

- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For styling the application.
- **JavaScript (ES6+)**: For logic and interactivity.
- **PostCSS**: For processing CSS.
- **Netlify**: For deployment.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Navigate to the project directory: 
 * cd unlock-to-thrive

3. Install dependencies:
  * npm install

  # Running the Development Server
Start the development server with the following command:
   * npm run dev
   This will start the application and open it in your default browser. If it doesn't, you can manually navigate to http://localhost:5173.

   # Building for Production
   To create a production-ready build, run:
   * npm run build
   The build files will be generated in the dist directory.

# Deployment
This project is configured for deployment on Netlify. You can deploy the dist folder to your Netlify account.

# Project Structure

src/
├── assets/          # Images and other static assets
├── components/      # Reusable React components
├── layouts/         # Layout components
├── pages/           # Page components
├── utils/           # Utility functions
├── App.jsx          # Main application component
├── main.jsx         # Entry point of the application
├── App.css          # Global styles
└── index.css        # Tailwind CSS configuration

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.
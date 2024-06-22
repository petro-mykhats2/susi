# Sushi Roll E-Commerce Site

Welcome to my Sushi Roll E-Commerce site, an online store where you can order delicious sushi rolls!

## About the Project

I developed this project entirely by myself, implementing both the front-end and back-end components. The site is designed to provide a seamless and enjoyable user experience for customers who want to browse and order sushi rolls online.

## Features

- **Product Slider**: Easily navigate through products using a slider feature.
- **Sortable Categories**: All product categories are sorted and can be customized on the page via the Netlify admin panel.
- **Favorite Products**: Add products to favorites instantly.
- **Shopping Cart**: Manage product quantities and see price updates in real-time, powered by Redux state management.
- **Product Details**: View product details including ingredients (stock) and adjust quantities before adding to cart.
- **Admin Panel**: Manage products, ingredients, categories, and their display on the site from the Netlify admin panel.

## Technologies Used

### Front-End

- **React.js**: Used for building the user interface and creating interactive components.
- **Gatsby.js**: Leveraged for static site generation, improving performance and SEO.
- **node-sass**: Implemented to style the components and add custom styling to the site.

### State Management

- **redux**: A predictable state container for JavaScript apps.
- **react-redux**: Official React bindings for Redux, enabling the use of Redux with React to manage application state.

### Back-End

- **MongoDB**: Employed as the database to store user information, orders, and product details.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.
- **Node.js**: Used as the runtime environment for building the server-side of the application.

### Key Packages

- **@reduxjs/toolkit**: Simplifies state management in React applications with Redux.
- **axios**: Used for making HTTP requests to fetch and send data between the client and server.
- **gatsby-plugin-image**: Optimizes images for faster loading times and better performance.
- **gatsby-plugin-sharp**: Processes images in various formats for better quality and performance.
- **react-helmet**: Manages the document head to handle meta tags for better SEO.
- **redux-persist**: Persists the Redux store data across page reloads to improve user experience.

#### Additional Integration

- **node-telegram-bot-api**: Enables integration with Telegram bot to receive orders and notifications.

## Deployment

The site is currently deployed on Netlify. You can access the working branch "staging" at the following link:

[Visit Sushi Roll E-Commerce Site](https://sushi-julia.netlify.app/)

## How to Run the Project and Access Admin Panel

To run the project locally and access the Netlify admin panel, follow these steps:

1. In your terminal, enter `yarn proxy`.
2. In a new terminal window, enter `yarn start`.
3. After successful startup, navigate to [http://localhost:8000/admin/](http://localhost:8000/admin/) to access the admin panel.

## Contact

For any inquiries or feedback, please feel free to reach out to me.

- **LinkedIn**: [My LinkedIn Profile](https://www.linkedin.com/in/petro-mykhats-8bb802196/)

Thank you for visiting and I hope you enjoy exploring the site!

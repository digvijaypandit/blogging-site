# React + AppWrite Blog Platform

A modern blog platform built with **React**, **Vite**, and **AppWrite**. This project features a rich text editor, authentication, and content management, providing a seamless experience for creating and managing blog posts.

## Demo

Check out the live demo [here](https://blog-deployment-ten.vercel.app/).

## Project Overview

This project demonstrates how to build a full-featured blog application using React for the frontend and AppWrite as the backend service provider. It includes user authentication, post creation with a rich text editor, and responsive UI with Tailwind CSS.

## Features

- User authentication (sign up, login, logout)
- Create, edit, and delete blog posts
- Rich Text Editor (TinyMCE) integration
- Responsive design with Tailwind CSS
- AppWrite backend for database, authentication, and storage
- Form handling with React Hook Form

## Technologies Used

- **React**: UI library for building interactive interfaces
- **Vite**: Fast frontend build tool
- **AppWrite**: Open-source backend server for authentication, database, and storage
- **TinyMCE**: Rich text editor for post content
- **React Hook Form**: Form state management
- **Tailwind CSS**: Utility-first CSS framework

## Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure AppWrite**
   - Set up an AppWrite instance (self-hosted or [AppWrite Cloud](https://cloud.appwrite.io/)).
   - Create a project, database, and storage bucket.
   - Update your AppWrite endpoint and project ID in the config file (`src/conf/conf.js`).

4. **Start the development server**
   ```sh
   npm run dev
   ```

5. **Access the app**
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure

- `/src/components` – React components (including RTE)
- `/src/conf` – Configuration files (AppWrite keys, endpoints)
- `/src/pages` – Page components (Home, Login, Dashboard, etc.)

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

---

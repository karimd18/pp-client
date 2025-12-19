// Local, backend-free data source for the Projects section

export type ProjectCategory = "web" | "mobile" | "AI";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    live?: string | null;
    github?: string | null;
  };
  categories: ProjectCategory[];
  createdAt?: string;
  updatedAt?: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Visa Assistant",
    description:
      "To build an AI agent that determines, for a given passport nationality, the type of visa required and the maximum duration of stay allowed to visit a certain country. This must be achieved using a natural language conversational flow.",
    image: "/assets/projects/visa-assistant.webp",
    tags: ["React", "Python", "Flask", "OpenAI"],
    links: {
      live: null,
      github: "https://github.com/karimd18/Visa-Assistant",
    },
    categories: ["AI"],
    createdAt: "2025-06-08 17:05:06",
    updatedAt: "2025-06-08 21:29:06",
  },
  {
    id: 2,
    title: "Fitness Tracking App",
    description:
      "An exploration into the realm of strength training analytics, leveraging wristband accelerometer and gyroscope data. This project harnesses machine learning models to classify exercises, count repetitions, and detect improper form, aiming to create a digital personal trainer experience.",
    image: "/assets/projects/fitness-tracker.jpg",
    tags: ["Scikit-Learn", "Pandas", "Numpy", "Seaborn"],
    links: {
      live: null,
      github: "https://github.com/karimd18/Fitness-tracker",
    },
    categories: ["AI"],
    createdAt: "2025-06-08 17:06:02",
    updatedAt: "2025-06-10 16:17:47",
  },
  {
    id: 3,
    title: "E-Commerce Retail Store",
    description:
      "A Laravel-powered e-commerce store featuring user authentication, a dynamic product catalog with a session-backed shopping cart, and secure checkout with invoice generation. An admin dashboard lets managers manage products, categories, and orders, all built with Blade templates, Eloquent ORM, and Vite.",
    image: "/assets/projects/ecommerce.jpg",
    tags: ["Php", "Laravel", "Dompdf", "MySQL"],
    links: {
      github: "https://github.com/karimd18/E-Commerce-Retail-Store",
      live: null,
    },
    categories: ["web"],
    createdAt: "2025-06-08 17:06:49",
    updatedAt: "2025-06-08 17:06:49",
  },
  {
    id: 4,
    title: "Task Management System",
    description:
      "An ASP.NET Core Web API and MVC-based Task Management System that enables users to create, assign, track, and manage tasks within teams. The system leverages Entity Framework Core for data persistence, AutoMapper for object mapping between data models and DTOs, and SQL Server (or SQLite) as the database. A clean, RESTful API serves data to the MVC.",
    image: "/assets/projects/task-management.png",
    tags: ["ASP.NET", "C#", "SQL Server", "jQuery"],
    links: {
      github: "https://github.com/karimd18/Task-Management-System",
      live: null,
    },
    categories: ["web"],
    createdAt: "2025-06-08 17:08:17",
    updatedAt: "2025-06-08 17:08:17",
  },
  {
    id: 5,
    title: "Real Estate Management App",
    description:
      "A cross-platform Real Estate application, featuring a React-based web frontend and a React Native mobile app that let users search, browse, and view property listings on both desktop and mobile.",
    image: "/assets/projects/real-estate.jpg",
    tags: ["React Native", "Tailwind", "React", "Javascript"],
    links: {
      live: null,
      github: "https://github.com/karimd18/Real-Estate",
    },
    categories: ["web", "mobile"],
    createdAt: "2025-06-08 21:30:30",
    updatedAt: "2025-06-08 21:30:44",
  },
  {
    id: 6,
    title: "Nutrivision",
    description:
      "Final Year Project: a cross-platform coaching platform that connects clients and coaches with secure OTP/JWT auth, chat via Firestore, and session bookings with confirmations and proposals. It generates TDEE-based weekly meal plans using AI, analyzes workout videos to give form feedback, and sends push notifications through FCM. Built with React Native (Expo) and Spring Boot 3, backed by PostgreSQL and Firebase, with GPT adapters for Q&A, meals, and form analysis. Repos organized in a GitHub Organization and tracked with GitHub Projects.",
    image: "/assets/projects/nutrivision.webp",
    tags: [
      "React Native",
      "Spring Boot",
      "PostgreSQL",
      "Firebase",
      "OpenAI",
      "JWT",
    ],
    links: {
      github: null,
      live: null,
    },
    categories: ["mobile", "AI"],
    createdAt: "2025-10-11 00:00:00",
    updatedAt: "2025-10-11 00:00:00",
  },
];

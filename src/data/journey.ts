export type JourneyType = "experience" | "achievement" | "certificate";

export interface JourneyItem {
  id: number;
  type: JourneyType;
  date: string;
  title: string;
  organization: string;
  description: string;
  skills?: string[];
  link?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const journeyData: JourneyItem[] = [
  {
    id: 1,
    type: "experience",
    date: "Jul 2024 - Jan 2025",
    title: "Backend - Prompt Engineer",
    organization: "GenFusion AI",
    description:
      "I architected and built end-to-end AI-driven automation solutions—designing and implementing Retrieval-Augmented Generation (RAG) systems to supercharge workflow automation, developing prompt-based serverless workflow generation frameworks that leveraged optimized JQ expressions, and integrating various APIs and AI tools to streamline execution. Using Quarkus and Flyway, I created scalable, AI-powered workflow engines, and I engineered secure, multi-tenant RESTful APIs with Quarkus and Vault DB (KV Secret Engine) for robust secret management. Additionally, I implemented full CRUD support for HashiCorp Vault storage, seamlessly integrating Quarkus Security and CDI to enforce structured access control.",
    skills: [
      "Quarkus",
      "Java",
      "KV Secret Engine",
      "RAG",
      "JQ Expressions",
      "HashiCorp",
      "VaultDB",
      "Prompt Engineering",
      "Swagger",
      "Docker",
      "JSON",
      "REST APIs",
      "JWT Authentication",
      "OAuth2",
      "Basic Authentication",
      "3rd Party Integrations",
    ],
    createdAt: "2025-06-09 11:03:17",
    updatedAt: "2025-06-09 11:03:17",
  },
  {
    id: 2,
    type: "experience",
    date: "Jan 2024 - Aug 2024",
    title: "IT Operations Control",
    organization: "Bank Audi",
    description:
      "At Bank Audi, I served as an Information Technology Analyst, where I led security incident investigations to identify root causes and mitigate risks, implemented and managed tools like SIEM, CrowdStrike EDR, and BeyondTrust, and developed data security, backup, archiving, and retrieval protocols. I supported virtualization infrastructure through VMware vSphere and vCenter administration, monitored the network across 40 branches for security breaches, and prepared detailed incident reports. Additionally, I conducted simulated cyber-attack tests to uncover vulnerabilities, designed and implemented three endpoint IT security systems, and utilized Automation Anywhere to automate tasks. I also integrated RPA solutions with the Oracle Flexcube Core Banking Application to streamline data collection, cleaning, and analysis.",
    skills: [
      "Database Systems",
      "Oracle Applications",
      "ETL",
      "Patch Management",
      "Ubuntu",
      "Data Pipelines",
      "Technical Support",
      "VMware vSphere",
      "Oracle Flexcube",
      "Microsoft Servers",
      "Microsoft Azure",
      "Infrastructure",
      "Data Analysis",
      "Business Development",
      "Agile",
      "Technical Analysis",
      "IT Security",
      "Microsoft SQL Server",
      "Data Collection",
      "VMware vCenter",
      "Payment Card Processing",
      "Banking",
      "Windows Server",
      "Citrix",
    ],
    createdAt: "2025-06-09 11:32:01",
    updatedAt: "2025-06-09 11:33:02",
  },
  {
    id: 3,
    type: "achievement",
    date: "Mar 2023",
    title:
      "Hackathon régional sur la thématique de l’Intelligence Artificielle",
    organization: "Agence Universitaire de la Francophonie",
    description:
      "Our team secured first place at the regional level and second place in the MENA competition. Our project addressed the societal impact of artificial intelligence by developing empathetic tools to support mental well-being. I am proud to have represented our region and competed among the top talents in MENA.",
    skills: [],
    link: "https://www.linkedin.com/posts/karim-doueik-6a9b30252_ai-mentalhealth-hackathon-activity-7322012019073708032-ShaI?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD51muEBPWIJWT9yvki5C6tZDqphLx8JKR0",
    createdAt: "2025-06-09 11:33:39",
    updatedAt: "2025-06-09 21:11:41",
  },
  {
    id: 4,
    type: "achievement",
    date: "Jul 2023",
    title: "Hackathon Tech For Accessibility",
    organization: "Talal and Madiha Zein AUB Innovation Park",
    description:
      "Vision Safe, a computer vision project featuring smart glasses with integrated AI to improve safety and accessibility. From initial prototyping through to the final pitch, this experience demonstrated the transformative potential of wearable technology. I am grateful to my teammates, mentors, and event organizers for their support. Whether focused on mental health or assistive solutions, I remain committed to developing AI that benefits humanity.",
    skills: [],
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7090382896015761408?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD51muEBPWIJWT9yvki5C6tZDqphLx8JKR0",
    createdAt: "2025-06-09 11:34:28",
    updatedAt: "2025-06-09 11:34:28",
  },
  {
    id: 5,
    type: "certificate",
    date: "Jan 2023 - Mar 2023",
    title: "Machine Learning",
    organization: "DeepLearning.AI - Stanford",
    description:
      "Built ML models with NumPy & scikit-learn; trained supervised models for prediction & binary classification (linear, logistic regression); built & trained neural networks with TensorFlow for multi-class classification; used decision trees & ensemble methods; applied best practices for ML development & unsupervised techniques (clustering, anomaly detection); built recommender systems via collaborative filtering & content-based deep learning; created deep reinforcement learning models. Skills gained include Scikit-Learn, Data Ethics, Supervised Learning, Machine Learning Methods, CART, NumPy, Artificial Intelligence, Unsupervised Learning, Decision Tree Learning, Reinforcement Learning, and Deep Learning.",
    skills: [],
    link: "https://coursera.org/share/cfc6b2f4a3e3bce6dd211f8ea9ad6ca0",
    createdAt: "2025-06-09 11:37:21",
    updatedAt: "2025-06-09 11:37:21",
  },
];

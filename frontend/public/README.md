# Nathan Yuan - Portfolio Website

A modern, full-stack portfolio website showcasing my work as an AI Full-Stack Software Engineer. This project demonstrates end-to-end development capabilities, from frontend user experience to backend AI integrations and cloud deployment. By utilizing industry AI coding agent tools such has GPT-4.1, GPT-4.0, Grok Code Fast 1, and Claude Sonnet 4 - development was greatly accelerated. 

## What This Project Is About

**For Everyone:** A professional portfolio website where you can learn about my background, view my projects, and interact with an AI assistant that knows about my experience.

**For Recruiters:** A comprehensive showcase of my technical skills, problem-solving approach, and ability to deliver production-ready applications with modern AI integrations.

**For Developers:** A proof of concept of a my web application skills with integrating AI features.

## 🚀 Fully Deployed App

Visit [nathanyuan.com](https://nathanyuan.com) to see the live application.

## System Architecture Overview

### Tech Stack

**Frontend:**
- **React 18** with TypeScript - Modern, type-safe component architecture
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first styling with custom design system
- **React Router** - Client-side routing for SPA experience
- **React Markdown** - Rich text rendering for dynamic content

**Backend & AI:**
- **Python FastAPI** - High-performance async web framework
- **Google Gemini AI** - Advanced language model for conversational AI
- **Hugging Face Spaces** - Serverless deployment for AI workloads
- **RAG Pipeline** - Retrieval-Augmented Generation for context-aware responses

**Database & Infrastructure:**
- **Supabase** - PostgreSQL with real-time capabilities and auth
- **Vercel** - Global CDN deployment with edge functions
- **Rate Limiting** - SlowAPI for protecting AI endpoints

### Why This Stack?

**Frontend Choices:**
- **React + TypeScript**: Industry standard for type safety and maintainability. Chose over Vue.js for ecosystem size and job market relevance.
- **Vite over Create React App**: 10-100x faster development builds, newer and better for modern development workflows.
- **Tailwind CSS**: Rapid prototyping with consistent design system. Trade-off: larger CSS bundle vs. development speed.

**Backend & AI Decisions:**
- **Python FastAPI**: Excellent async performance for restful api calls and auto-generated OpenAPI docs. Python ecosystem is richer for AI/ML than Node.js.
- **Gemini over other models**: Google's model offers competitive performance with great free tier token limits.
- **Hugging Face Spaces**: Free tier for prototyping, easy scaling and deployment. Trade-off: Cold starts vs. cost of dedicated hosting.
- **RAG Pipeline**: Ensures responses are grounded in my actual experience, reducing hallucinations common in general-purpose AI.
- **LLM API vs Local model**: Interacting with an LLM API is more common in the industry and easier to maintain. The size of a model, even a smaller Llama model (7-13GB) would not fit in a free tier Hugging Face space (limited to ~10GB storage). API calls also provide automatic model updates, better reliability, and consistent performance without local hardware constraints.

**Infrastructure Trade-offs:**
- **Supabase**: Developer experience and built-in auth vs. full control and enterprise features. Also has easy integration with Vercel which was chosen for front end deployment.
- **Vercel vs. Github Pages**: Better edge function performance and overall more developer features.
- **Rate limiting**: Essential for AI costs but adds complexity. Chose SlowAPI for simplicity over Redis-based solutions. Also works well with FastAPI implementations.

## Key Features

- **Interactive AI Assistant**: Ask questions about my background, experience, and projects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Automatic system preference detection with manual toggle
- **Multi-language Support**: English, Spanish, Chinese (Simplified), Korean, Japanese
- **Bug Reporting**: Integrated feedback system for continuous improvement

- **Modular Architecture**: Clean separation of concerns with reusable components
- **API-First Design**: RESTful endpoints with comprehensive error handling
- **Performance Optimized**: Code splitting, lazy loading, and efficient bundling
- **SEO Friendly**: Server-side rendering capabilities and meta tag optimization

## My Development Setup

### Prerequisites
- Node.js 18+
- Python 3.8+
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nathanyuan.com
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   # In a separate terminal
   cd ../NathanY_RAG_Assistant_Chatbot
   pip install -r requirements.txt
   python -m uvicorn src.endpoints:app --reload
   ```

4. **Environment Variables**
   Create `.env` files in both directories with required API keys and database credentials.

### My Deployment Pipeline

**Frontend (Vercel):**
- Link repo to a Vercel react project
- Push to github repository housing front end code
- Check build and deploy on Vercel

**Backend (Hugging Face Spaces):**
- Push to Hugging Face repository
- Automatic deployment with Docker

**Database (Supabase via Vercel Marketplace):**
- Create schemas for data tables
- Row Level Security policies for data protection

## 🔧 Technical Challenges & Solutions

### AI Integration Challenges
**Problem:** Balancing response quality with cost and performance.
**Solution:** Implemented RAG pipeline to ground responses in verified content, reducing token usage by 40% and ensuring the model stays on topic.

### Rate Limiting Implementation
**Problem:** Protecting AI API costs while maintaining user experience.
**Solution:** Multi-tier rate limiting (10/minute for chat, 1/minute for health checks etc.) with user-friendly error messages if rate limit is reached.

### Real-time Chat History and Logs
**Problem:** Maintaining conversation context across tabs and saving chat data for iteration.
**Solution:** Session-based storage with PostgreSQL persistence and conflict resolution. Allows me to look at all user chat logs and fine tune the large language model to improve conversation experience with user.

### Internationalization
**Problem:** Supporting multiple languages and reducing hard coded strings.
**Solution:** React-i18next with JSON-based translations and lazy loading.

## Performance Metrics

- 

## Contributing

This is a personal portfolio project, but I'm always open to feedback and suggestions. Feel free to:

- Open issues for bugs or feature requests
- Submit pull requests for improvements
- Reach out via the contact form on the website

## License

This project is private and intended for portfolio purposes only.

## About the Developer

I'm Nathan Yuan, an AI Full-Stack Software Engineer with experience in:
- Enterprise AI solutions and machine learning integrations
- Full-stack web development with modern frameworks
- Cloud architecture and scalable system design
- Cross-functional collaboration and technical leadership

**Contact:** contact@nathanyuan.com
**LinkedIn:** [linkedin.com/in/nathanyuan00](https://linkedin.com/in/nathanyuan00)

---

*Built with ❤️ & 🧠 using modern web technologies and accelerated by AI*

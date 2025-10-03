import '../assets/styles/ExperiencePage.css';

const ExperiencePage: React.FC = () => {
  return (
    <div className="experience-page">
      <div className="experience-content">
        <h1 className="experience-title">Professional Experience</h1>
        
        <section className="experience-section">
          <div className="experience-card">
            <h2 className="experience-section-title">Technical Experience</h2>
            <ul>
              <li className="experience-list-item">
                <strong>AI & ML Fullstack Software Engineer II</strong><br />
                <span>C3.AI via Paradyme Inc. • June 2024 - Present</span>
                <em>Enterprise solutions engineering and software development in the federal space (DoD)<br />
                C3.AI Decision Advantage | C3.AI Contested Logistics</em>
                <ul>
                  <li>Partnered with project managers to prepare app features for demo flows and contributed to client meetings to discuss feature requirements</li>
                  <li>Agentic AI Agent Hackathon: Designed and developed an Agentic AI agent to streamline GitHub PR creation using C3 platform tools</li>
                  <li>Beta tested C3.AI Machine Learning Forecasting Project capstone course, provided key feedback, and earned completion certificate</li>
                  <li>Utilized time-series forecasting to predict wind turbine power output for 7 days, achieving 35% improvement over baseline model</li>
                  <li>Created end-to-end LightGBM pipeline on C3.AI platform, scored 100% capstone grade</li>
                  <li>Maintained end-to-end ownership of key features including proof of concepts, tech specs, development, and documentation:
                    <ul>
                      <li>Ingress/Egress RESTful API with OAuth2 authentication for secure data exchange</li>
                      <li>Import/Export Microsoft documents using Pandas for data manipulation and parsing</li>
                      <li>Real-time messaging system with chat history and user search functionality</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="experience-list-item">
                <strong>Technical Specialist</strong><br />
                <span>Apple • May 2019 - May 2020</span>
                <ul>
                  <li>Triaged hardware/software issues with iOS devices in client-facing role, performed diagnostics and produced technical documentation</li>
                  <li>Excelled in cross-functional team collaboration across different departments to deliver exceptional customer experiences</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section className="experience-section">
          <div className="experience-card">
            <h2 className="experience-section-title">Leadership & Management</h2>
            <ul>
              <li className="experience-list-item">
                <strong>Software Engineer Team Lead</strong><br />
                <span>Paradyme Inc. • January 2025 - Present</span>
                <ul>
                  <li>Led and supported growth of engineering team, bridging communication between engineers and executive leadership</li>
                  <li>Onboarded and guided 20+ new team members, streamlining onboarding systems and decreasing onboarding period by 60%</li>
                  <li>Screened potential candidates for engineering roles and conducted technical interviews, resulting in stronger new hires</li>
                  <li>Led sprint retrospectives and standup meetings as scrum master, along with demoing features to stakeholders</li>
                </ul>
              </li>
              <li className="experience-list-item">
                <strong>Public Relations Board Member / Social Media Coordinator</strong><br />
                <span>Chinese Student Association & Korean American Student Association • Sep 2022 - Jun 2023</span>
                <ul>
                  <li>Delivered club updates at weekly general meetings to 50-100 members and led icebreaker activities</li>
                  <li>Expanded networks and partnerships two-fold by managing social media accounts and initiating strategic outreach</li>
                  <li>Raised hundreds of dollars in club funds through partnerships with local businesses like Poke House</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section className="experience-section">
          <div className="experience-card">
            <h2 className="experience-section-title">Education & Certifications</h2>
            <ul>
              <li className="experience-list-item">
                <strong>Bachelor's Degree in Computer Science</strong><br />
                <span>University of California Santa Cruz</span>
              </li>
              <li className="experience-list-item">
                <strong>Nvidia Deep Learning Institute</strong><br />
                <span>Generative AI Explained Certification</span>
              </li>
              <li className="experience-list-item">
                <strong>Apple Certified iOS Technician (ACiT)</strong><br />
                <span>Hardware and Software Troubleshooting Certification</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="experience-section">
          <div className="experience-card">
            <h2 className="experience-section-title">Technical Skills</h2>
            <ul>
              <li className="experience-list-item">
                <strong>Programming Languages & Frameworks:</strong> Python, JavaScript, React.js, TypeScript, HTML, CSS, JSON, SQL
              </li>
              <li className="experience-list-item">
                <strong>Development Tools & Platforms:</strong> APIs, GitHub Version Control, Terminal Environments, Jira, Clusters & Artifact Deployment, Python runtimes, Google Workstations
              </li>
              <li className="experience-list-item">
                <strong>AI & Machine Learning:</strong> Artificial Intelligence, Machine Learning, Natural Language Processing, Large Language Models, Prompt Engineering, Hyperparameter Tuning, Pandas, Feature Engineering
              </li>
              <li className="experience-list-item">
                <strong>Professional Skills:</strong> Collaborative Leadership, Communication, Adaptability, Problem Solving, Time Management, Cross-functional Teamwork, Mentorship, Stakeholder Engagement, Technical Writing, Decision Making
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExperiencePage;

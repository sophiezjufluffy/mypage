<template>
  <div id="app" class="page-wrapper">
    <!-- HEADER -->
    <header id="header">
      <div class="header-inner">
        <div class="logo">
          <h1><router-link to="/" class="logo-link">Loufei Feng</router-link></h1>
          <p class="tagline">Data Scientist & AI Research</p>
        </div>
        <nav class="nav-menu">
          <a href="#about" class="nav-link" @click.prevent="scrollToSection('about')">About</a>
          <a href="#projects" class="nav-link" @click.prevent="scrollToSection('projects')">Projects</a>
          <a href="#awards" class="nav-link" @click.prevent="scrollToSection('awards')">Awards</a>
          <a href="#skills" class="nav-link" @click.prevent="scrollToSection('skills')">Skills</a>
        </nav>
        <button class="mobile-menu-btn" @click="toggleMobileMenu" v-if="isMobile">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav class="mobile-menu" v-if="showMobileMenu && isMobile">
        <a href="#about" @click="closeMobileMenu">About</a>
        <a href="#projects" @click="closeMobileMenu">Projects</a>
        <a href="#awards" @click="closeMobileMenu">Awards</a>
        <a href="#skills" @click="closeMobileMenu">Skills</a>
      </nav>
    </header>

    <!-- HERO SECTION -->
    <section id="about" class="hero">
      <div class="hero-content">
        <div class="avatar-section">
          <img src="/avatar.jpg" alt="Loufei Feng" class="avatar" />
          <div class="social-links">
            <a href="mailto:3230104453@zju.edu.cn" class="social-link" title="Email">
              <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
                <path d="m22 7-10 7L2 7" />
              </svg>
            </a>
            <a href="https://github.com/sophiezjufluffy" target="_blank" class="social-link" title="GitHub">
              <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 3h3v3" />
                <path d="M21 3L10 14" />
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
              </svg>
            </a>
            <a href="tel:+8613588196187" class="social-link" title="Phone">
              <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92a2 2 0 0 1-1.18 1.84c-1.27.51-2.57.78-3.88.78a2 2 0 0 1-1.85-1.28l-.83-2.25a2 2 0 0 0-1.72-1.31h-2.3a2 2 0 0 0-1.72 1.31l-.83 2.25A2 2 0 0 1 6.06 20c-1.31 0-2.61-.27-3.88-.78A2 2 0 0 1 .99 16.92a20.24 20.24 0 0 1 0-9.84A2 2 0 0 1 2.06 5.3c1.27-.51 2.57-.78 3.88-.78a2 2 0 0 1 1.85 1.28l.83 2.25a2 2 0 0 0 1.72 1.31h2.3a2 2 0 0 0 1.72-1.31l.83-2.25A2 2 0 0 1 17.94 4c1.31 0 2.61.27 3.88.78a2 2 0 0 1 1.18 1.84 20.24 20.24 0 0 1 0 9.84Z" />
                <path d="m15 11-3 3-3-3" />
              </svg>
            </a>
          </div>
        </div>
        <div class="hero-text">
          <h2 class="hero-title">
            <span class="highlight">Hello</span>, I'm Loufei Feng
          </h2>
          <p class="hero-subtitle">
            Undergraduate at <strong>Zhejiang University</strong> | 
            B.S. in Business Big Data Analysis | 
            Double Degree in Information Management & Information Systems
          </p>
          <p class="hero-description">
            Passionate about designing <em>intelligent information systems</em> that solve real-world problems. 
            Currently exploring <strong>Retrieval-Augmented Generation (RAG)</strong>, 
            <strong>LLMs</strong>, and <strong>AI-driven education</strong>.
          </p>
          <div class="cta-buttons">
            <a href="#projects" class="btn btn-primary">View My Work</a>
            <a href="/public/CV.pdf" class="btn btn-secondary" download>Download CV</a>
          </div>
        </div>
      </div>
    </section>

    <!-- RESEARCH FOCUS SECTION -->
    <section class="research-focus">
      <div class="container">
        <h2>Research Focus</h2>
        <p class="focus-statement">
          I investigate how <em>information systems</em> can be designed to better serve human needs, 
          and how humans can leverage them more effectively in <em>business contexts</em> and <em>daily life</em>. 
          Particularly interested in:
        </p>
        <div class="focus-items">
          <div class="focus-item">
            <svg class="focus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 7h8M8 17h8M12 11h4" />
            </svg>
            <h3>AI-Enhanced Applications</h3>
            <p>Designing practical AI applications using prompt engineering and RAG patterns</p>
          </div>
          <div class="focus-item">
            <svg class="focus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h3>Information Retrieval</h3>
            <p>Building semantic search and knowledge discovery systems</p>
          </div>
          <div class="focus-item">
            <svg class="focus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20V19.5A2.5 2.5 0 0 1 17.5 22H4V4.5Z" />
            </svg>
            <h3>AI in Education</h3>
            <p>Creating intelligent tutoring systems that enhance learning efficiency</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section id="projects" class="projects">
      <div class="container">
        <h2>Featured Projects</h2>
        
        <div class="project-grid">
          <!-- Project 1: RAG -->
          <article class="project-card">
            <div class="project-header">
              <img src="/images/style/ZJU.png" alt="RAG Academic Literature Retrieval Engine" class="project-image" />
              <div class="project-meta">
                <span class="project-date">Jan 2026 – Present</span>
                <span class="project-type">Core Developer</span>
              </div>
            </div>
            <div class="project-body">
              <h3>RAG-based Academic Literature Retrieval Engine</h3>
              <p class="project-org">
                <strong>Zhejiang University AIMLab Innovation Project</strong>
              </p>
              <p class="project-description">
                Developed an advanced retrieval system utilizing Retrieval-Augmented Generation (RAG) 
                to facilitate efficient academic discovery across tens of thousands of research papers. 
                Implemented semantic search and vector database integration to achieve high-precision 
                context retrieval for complex academic queries.
              </p>
              <div class="tech-stack">
                <span class="tech-badge">Python</span>
                <span class="tech-badge">LLM</span>
                <span class="tech-badge">Vector DB</span>
                <span class="tech-badge">RAG</span>
                <span class="tech-badge">Semantic Search</span>
              </div>
              <div class="project-achievements">
                <p><strong>Key Achievement:</strong> Integrated LLMs to automate literature synthesis and generate intelligent explanations, streamlining research workflow for scholars.</p>
              </div>
            </div>
          </article>

          <!-- Project 2: AI Teaching Assistant -->
          <article class="project-card">
            <div class="project-header">
              <img src="/images/style/PTA.jpg" alt="AI Teaching Assistant Extension" class="project-image" />
              <div class="project-meta">
                <span class="project-date">Jan 2025 – Dec 2025</span>
                <span class="project-type">Co-Developer</span>
              </div>
            </div>
            <div class="project-body">
              <h3>AI Teaching Assistant Extension for PTA Platform</h3>
              <p class="project-org">
                <strong>University-level SRTP Project, Zhejiang University</strong>
              </p>
              <p class="project-description">
                Designed and deployed a commercialized AI+Education browser extension, providing real-time 
                debugging feedback and personalized learning suggestions for students on the PTA programming 
                platform. Managed the full product lifecycle from UI/UX design to open-source release on GitHub.
              </p>
              <div class="tech-stack">
                <span class="tech-badge">JavaScript</span>
                <span class="tech-badge">LLM</span>
                <span class="tech-badge">Web Dev</span>
                <span class="tech-badge">Product Design</span>
                <span class="tech-badge">Commercialization</span>
              </div>
              <div class="project-achievements">
                <p><strong>Key Achievement:</strong> Optimized prompt engineering strategies resulting in 30% increase in student learning efficiency during pilot testing.</p>
              </div>
            </div>
          </article>

          <!-- Project 3: Database System -->
          <article class="project-card">
            <div class="project-header">
              <img src="/images/style/WPS.png" alt="Fruit Store Database System" class="project-image" />
              <div class="project-meta">
                <span class="project-date">Mar 2024 – Jun 2024</span>
                <span class="project-type">Lead Developer</span>
              </div>
            </div>
            <div class="project-body">
              <h3>Fruit Store Information Management System</h3>
              <p class="project-org">
                <strong>Database Systems Course Project, Zhejiang University</strong>
              </p>
              <p class="project-description">
                Architected a comprehensive database solution on SQL Server to handle inventory tracking, 
                sales transactions, and personnel management for retail scenarios. Conducted systematic database 
                design including Requirement Analysis, E-R Diagramming, and Logical Schema Optimization.
              </p>
              <div class="tech-stack">
                <span class="tech-badge">SQL Server</span>
                <span class="tech-badge">ER Modeling</span>
                <span class="tech-badge">Database Design</span>
                <span class="tech-badge">Data Dictionary</span>
              </div>
              <div class="project-achievements">
                <p><strong>Key Achievement:</strong> Developed complete data dictionary and system flowcharts to standardize backend operations and future maintenance.</p>
              </div>
            </div>
          </article>

          <!-- Project 4: Second-hand Book Platform -->
          <article class="project-card">
            <div class="project-header">
              <img src="/images/style/TaoShu.png" alt="TaoShu Campus Second-hand Book Trading Platform" class="project-image" />
              <div class="project-image-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20V19.5A2.5 2.5 0 0 1 17.5 22H4V4.5Z" />
                </svg>
              </div>
              <div class="project-meta">
                <span class="project-date">In Progress</span>
                <span class="project-type">Project Lead</span>
              </div>
            </div>
            <div class="project-body">
              <h3>"TaoShu" Campus Second-hand Book Trading Platform</h3>
              <p class="project-org">
                <strong>Zhejiang University Campus Innovation Project</strong>
              </p>
              <p class="project-description">
                Orchestrating the development of a campus-specific second-hand book marketplace to optimize 
                book circulation and matching algorithms within the university ecosystem. Focus on creating 
                an efficient, user-friendly platform for sustainable resource sharing.
              </p>
              <div class="tech-stack">
                <span class="tech-badge">Vue.js</span>
                <span class="tech-badge">JavaScript</span>
                <span class="tech-badge">CSS3</span>
                <span class="tech-badge">Node.js</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- AWARDS & HONORS SECTION -->
    <section id="awards" class="awards">
      <div class="container">
        <h2>Awards & Honors</h2>
        
        <div class="awards-grid">
          <div class="awards-column">
            <h3 class="awards-category">Academic & Research Excellence</h3>
            <div class="award-item">
              <svg class="award-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 2 7l10 5 10-5-10-5zm0 6.9-2.9-1.5L5 8.9l3.6 3.5L7.6 19 12 16.3 16.4 19l-1-6.6L19 8.9l-4.1-.5L12 8.9z" />
              </svg>
              <div class="award-details">
                <p class="award-title">Gold Medal</p>
                <p class="award-desc">China International College Students' Innovation Competition (Zhejiang)</p>
                <p class="award-year">2025</p>
              </div>
            </div>
            <div class="award-item">
              <svg class="award-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 2 7l10 5 10-5-10-5zm0 6.9-2.9-1.5L5 8.9l3.6 3.5L7.6 19 12 16.3 16.4 19l-1-6.6L19 8.9l-4.1-.5L12 8.9z" />
              </svg>
              <div class="award-details">
                <p class="award-title">Third Prize</p>
                <p class="award-desc">17th Chinese Mathematics Competitions (CMC)</p>
                <p class="award-year">2025</p>
              </div>
            </div>
            <div class="award-item">
              <svg class="award-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 2 7l10 5 10-5-10-5zm0 6.9-2.9-1.5L5 8.9l3.6 3.5L7.6 19 12 16.3 16.4 19l-1-6.6L19 8.9l-4.1-.5L12 8.9z" />
              </svg>
              <div class="award-details">
                <p class="award-title">Second Prize</p>
                <p class="award-desc">RoboRoarZ Robotics Competition</p>
                <p class="award-year">Singapore 2024</p>
              </div>
            </div>
            <div class="award-item">
              <svg class="award-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 2 7l10 5 10-5-10-5zm0 6.9-2.9-1.5L5 8.9l3.6 3.5L7.6 19 12 16.3 16.4 19l-1-6.6L19 8.9l-4.1-.5L12 8.9z" />
              </svg>
              <div class="award-details">
                <p class="award-title">Second Prize</p>
                <p class="award-desc">ZJU Intelligent Robot Design Competition</p>
                <p class="award-year">2024</p>
              </div>
            </div>
          </div>

          <div class="awards-column">
            <h3 class="awards-category">Scholarships & Honors</h3>
            <div class="award-item">
              <svg class="award-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 2 7l10 5 10-5-10-5zm0 6.9-2.9-1.5L5 8.9l3.6 3.5L7.6 19 12 16.3 16.4 19l-1-6.6L19 8.9l-4.1-.5L12 8.9z" />
              </svg>
              <div class="award-details">
                <p class="award-title">Outstanding Student Honor</p>
                <p class="award-desc">Academic Excellence Scholarship, Zhejiang University</p>
                <p class="award-year">2024</p>
              </div>
            </div>

            <h3 class="awards-category" style="margin-top: 30px;">Extracurricular & Athletics</h3>
            <div class="award-item">
              <svg class="award-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 2 7l10 5 10-5-10-5zm0 6.9-2.9-1.5L5 8.9l3.6 3.5L7.6 19 12 16.3 16.4 19l-1-6.6L19 8.9l-4.1-.5L12 8.9z" />
              </svg>
              <div class="award-details">
                <p class="award-title">Champion</p>
                <p class="award-desc">Dragon and Lion Dance, ZJU "Three-Good Cup"</p>
                <p class="award-year">2024</p>
              </div>
            </div>
            <div class="award-item">
              <svg class="award-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 2 7l10 5 10-5-10-5zm0 6.9-2.9-1.5L5 8.9l3.6 3.5L7.6 19 12 16.3 16.4 19l-1-6.6L19 8.9l-4.1-.5L12 8.9z" />
              </svg>
              <div class="award-details">
                <p class="award-title">6th Place</p>
                <p class="award-desc">Women's Discus, ZJU Track and Field Games</p>
                <p class="award-year">2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SKILLS SECTION -->
    <section id="skills" class="skills">
      <div class="container">
        <h2>Technical Skills</h2>
        
        <div class="skills-grid">
          <div class="skill-category">
            <h3>Programming Languages</h3>
            <div class="skill-list">
              <span class="skill-tag">C</span>
              <span class="skill-tag">Python</span>
              <span class="skill-tag">SQL</span>
              <span class="skill-tag">JavaScript (ES6+)</span>
              <span class="skill-tag">LaTeX</span>
              <span class="skill-tag">R</span>
            </div>
          </div>

          <div class="skill-category">
            <h3>AI & ML Technologies</h3>
            <div class="skill-list">
              <span class="skill-tag">Prompt Engineering</span>
              <span class="skill-tag">RAG (LangChain)</span>
              <span class="skill-tag">LLM Integration</span>
              <span class="skill-tag">Vector Databases</span>
              <span class="skill-tag">Semantic Search</span>
            </div>
          </div>

          <div class="skill-category">
            <h3>Web Development & Tools</h3>
            <div class="skill-list">
              <span class="skill-tag">Vue.js</span>
              <span class="skill-tag">React</span>
              <span class="skill-tag">HTML5 / CSS3</span>
              <span class="skill-tag">Node.js</span>
              <span class="skill-tag">Git</span>
              <span class="skill-tag">Web Development</span>
            </div>
          </div>

          <div class="skill-category">
            <h3>Data & Databases</h3>
            <div class="skill-list">
              <span class="skill-tag">SQL Server</span>
              <span class="skill-tag">Data Mining</span>
              <span class="skill-tag">Data Visualization</span>
              <span class="skill-tag">Unstructured Data Analysis</span>
              <span class="skill-tag">Database Design</span>
            </div>
          </div>

          <div class="skill-category">
            <h3>Languages</h3>
            <div class="skill-list">
              <span class="skill-tag highlight">Mandarin (Native)</span>
              <span class="skill-tag">English (CET-6: 619/710, Top 5%)</span>
              <span class="skill-tag">IELTS (In Progress)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EDUCATION SECTION -->
    <section class="education">
      <div class="container">
        <h2>Education</h2>
        <div class="education-item">
          <div class="education-header">
            <h3>Zhejiang University (ZJU)</h3>
            <p class="location">Hangzhou, China</p>
          </div>
          <div class="education-details">
            <p><strong>B.S. in Business Big Data Analysis</strong></p>
            <p class="degree-subtitle">
              Double Degree in Information Management and Information System | 
              Statistics
            </p>
            <p class="duration">September 2023 – June 2027 (Expected)</p>
            <p class="gpa"><strong>GPA: 3.73/4.0</strong></p>
            <p class="coursework">
              <strong>Core Coursework:</strong> Mathematical Analysis, Linear Algebra, 
              Probability & Stochastic Processes, Data Structures, Computer Networks, 
              Database Systems, Data Mining, Unstructured Data Analysis, Data Visualization
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2026 Loufei Feng. All rights reserved.</p>
        <p class="footer-contact">
          Email: <a href="mailto:3230104453@zju.edu.cn">3230104453@zju.edu.cn</a> | 
          Phone: <a href="tel:+8613588196187">+86-135-8819-6187</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const showMobileMenu = ref(false)
    const isMobile = ref(false)

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    const scrollToSection = (id) => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      closeMobileMenu()
    }

    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })

    return {
      showMobileMenu,
      isMobile,
      toggleMobileMenu,
      closeMobileMenu,
      scrollToSection
    }
  }
}
</script>

<style scoped>
/* ==================== CSS VARIABLES ==================== */
:root {
  --primary-color: #1a3a52;
  --primary-light: #2d5a7b;
  --accent-color: #d4a574;
  --text-dark: #1a1a1a;
  --text-gray: #555;
  --text-light: #888;
  --bg-white: #ffffff;
  --bg-light: #f5f5f5;
  --bg-neutral: #fafafa;
  --border-color: #ddd;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.15);
  --transition: all 0.3s ease;
}

/* ==================== RESET & BASE ==================== */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--text-dark);
  background-color: var(--bg-white);
}

.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ==================== HEADER ==================== */
#header {
  background-color: rgba(255, 255, 255, 1);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
  backdrop-filter: none;
  opacity: 1;
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 20px;
}

.logo {
  flex-shrink: 0;
}

.logo h1 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo-link {
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);
}

.logo-link:hover {
  color: var(--accent-color);
}

.tagline {
  margin: 4px 0 0 0;
  font-size: 0.85rem;
  color: var(--text-light);
  font-weight: 400;
  letter-spacing: 0.5px;
}

.nav-menu {
  display: flex;
  gap: 32px;
  align-items: center;
}

.nav-link {
  color: var(--text-gray);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: var(--transition);
  position: relative;
}

.nav-link:after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: var(--transition);
}

.nav-link:hover,
.nav-link:focus {
  color: var(--primary-color);
}

.nav-link:hover:after {
  width: 100%;
}

.social-icon {
  width: 20px;
  height: 20px;
}

.focus-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
}

.award-icon {
  width: 32px;
  height: 32px;
  color: var(--accent-color);
  margin-right: 14px;
  flex-shrink: 0;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.mobile-menu-btn span {
  width: 24px;
  height: 2px;
  background: var(--text-dark);
  margin: 5px 0;
  transition: var(--transition);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  background: var(--bg-light);
}

.mobile-menu a {
  padding: 12px 0;
  color: var(--text-gray);
  text-decoration: none;
  border-bottom: 1px solid var(--border-color);
}

/* ==================== HERO SECTION ==================== */
.hero {
  background: linear-gradient(135deg, rgba(26, 58, 82, 0.02) 0%, rgba(212, 165, 116, 0.02) 100%);
  padding: 80px 20px;
  border-bottom: 1px solid var(--border-color);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
  align-items: center;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: var(--shadow-md);
  border: 2px solid var(--accent-color);
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-light);
  border-radius: 50%;
  font-size: 1.5rem;
  text-decoration: none;
  transition: var(--transition);
  border: 1px solid var(--border-color);
}

.social-link:hover {
  background: var(--primary-color);
  color: var(--bg-white);
  border-color: var(--primary-color);
  transform: translateY(-4px);
}

.hero-text h2 {
  font-size: 2.8rem;
  line-height: 1.2;
  margin: 0 0 16px 0;
  font-weight: 700;
}

.highlight {
  color: var(--accent-color);
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--text-gray);
  margin: 0 0 12px 0;
  font-weight: 500;
}

.hero-description {
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 32px;
}

.hero-description em {
  font-style: normal;
  color: var(--primary-color);
  font-weight: 600;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 28px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--transition);
  border: 2px solid transparent;
  cursor: pointer;
}

.btn-primary {
  background: var(--primary-color);
  color: var(--bg-white);
}

.btn-primary:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: var(--bg-white);
}

/* ==================== RESEARCH FOCUS SECTION ==================== */
.research-focus {
  padding: 80px 20px;
  background: var(--bg-light);
}

.research-focus h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 24px;
  color: var(--primary-color);
}

.focus-statement {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 48px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-gray);
}

.focus-statement em {
  font-style: normal;
  color: var(--primary-color);
  font-weight: 600;
}

.focus-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
}

.focus-item {
  background: var(--bg-white);
  padding: 32px;
  border-radius: 8px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.focus-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.focus-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 16px;
}

.focus-item h3 {
  margin: 0 0 12px 0;
  font-size: 1.2rem;
  color: var(--primary-color);
}

.focus-item p {
  color: var(--text-light);
  margin: 0;
}

/* ==================== PROJECTS SECTION ==================== */
.projects {
  padding: 80px 20px;
  background: var(--bg-white);
}

.projects h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 48px;
  color: var(--primary-color);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background: var(--bg-white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-color);
}

.project-header {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: var(--bg-light);
}

.project-image,
.project-image-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.project-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-image-placeholder svg {
  width: 48px;
  height: 48px;
  color: var(--primary-color);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-meta {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.project-date,
.project-type {
  background: var(--primary-color);
  color: var(--bg-white);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.project-body {
  padding: 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-body h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: var(--text-dark);
}

.project-org {
  margin: 0 0 16px 0;
  color: var(--text-light);
  font-size: 0.9rem;
}

.project-description {
  color: var(--text-gray);
  line-height: 1.7;
  margin: 0 0 16px 0;
  flex: 1;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tech-badge {
  background: var(--bg-light);
  color: var(--primary-color);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--primary-color);
}

.project-achievements {
  background: rgba(212, 165, 116, 0.05);
  padding: 12px;
  border-left: 3px solid var(--accent-color);
  border-radius: 4px;
}

.project-achievements p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-gray);
}

/* ==================== AWARDS SECTION ==================== */
.awards {
  padding: 80px 20px;
  background: linear-gradient(135deg, rgba(26, 58, 82, 0.02) 0%, rgba(212, 165, 116, 0.02) 100%);
}

.awards h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 48px;
  color: var(--primary-color);
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.awards-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.awards-category {
  font-size: 1.15rem;
  color: var(--primary-color);
  margin: 0 0 12px 0;
  font-weight: 600;
}

.award-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: var(--bg-white);
  border-radius: 8px;
  transition: var(--transition);
}

.award-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.award-icon {
  width: 32px;
  height: 32px;
  color: var(--accent-color);
  margin-right: 14px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.award-details {
  flex: 1;
}

.award-title {
  margin: 0 0 4px 0;
  font-weight: 600;
  color: var(--text-dark);
}

.award-desc {
  margin: 0 0 4px 0;
  color: var(--text-gray);
  font-size: 0.9rem;
}

.award-year {
  margin: 0;
  color: var(--text-light);
  font-size: 0.85rem;
  font-style: italic;
}

/* ==================== SKILLS SECTION ==================== */
.skills {
  padding: 80px 20px;
  background: var(--bg-white);
}

.skills h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 48px;
  color: var(--primary-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
}

.skill-category {
  background: var(--bg-light);
  padding: 24px;
  border-radius: 8px;
  transition: var(--transition);
}

.skill-category:hover {
  box-shadow: var(--shadow-md);
}

.skill-category h3 {
  margin: 0 0 16px 0;
  font-size: 1.1rem;
  color: var(--primary-color);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: var(--bg-white);
  color: var(--primary-color);
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid var(--primary-color);
  transition: var(--transition);
}

.skill-tag:hover {
  background: var(--primary-color);
  color: var(--bg-white);
}

.skill-tag.highlight {
  background: var(--accent-color);
  color: var(--bg-white);
  border-color: var(--accent-color);
}

/* ==================== EDUCATION SECTION ==================== */
.education {
  padding: 80px 20px;
  background: linear-gradient(135deg, rgba(26, 58, 82, 0.02) 0%, rgba(212, 165, 116, 0.02) 100%);
}

.education h2 {
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 48px;
  color: var(--primary-color);
}

.education-item {
  background: var(--bg-white);
  padding: 40px;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  max-width: 800px;
  margin: 0 auto;
  border-left: 4px solid var(--accent-color);
}

.education-header {
  margin-bottom: 24px;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 16px;
}

.education-header h3 {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
  color: var(--primary-color);
}

.location {
  margin: 0;
  color: var(--text-light);
  font-size: 0.95rem;
}

.education-details p {
  margin: 12px 0;
  line-height: 1.7;
}

.degree-subtitle {
  color: var(--text-gray);
  font-style: italic;
}

.duration {
  color: var(--text-light);
  font-size: 0.95rem;
}

.gpa {
  color: var(--primary-color);
  font-size: 1.05rem;
  margin-top: 16px;
}

.coursework {
  color: var(--text-gray);
  font-size: 0.95rem;
}

/* ==================== FOOTER ==================== */
.footer {
  background: var(--primary-color);
  color: var(--bg-white);
  padding: 48px 20px;
  margin-top: auto;
  text-align: center;
}

.footer p {
  margin: 12px 0;
}

.footer-contact a {
  color: var(--accent-color);
  text-decoration: none;
  transition: var(--transition);
}

.footer-contact a:hover {
  text-decoration: underline;
}

/* ==================== RESPONSIVE DESIGN ==================== */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .mobile-menu {
    display: flex;
  }

  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero-text h2 {
    font-size: 2rem;
  }

  .avatar {
    width: 150px;
    height: 150px;
  }

  .hero-subtitle,
  .hero-description {
    font-size: 0.95rem;
  }

  .projects h2,
  .awards h2,
  .skills h2,
  .education h2,
  .research-focus h2 {
    font-size: 1.8rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .awards-grid {
    grid-template-columns: 1fr;
  }

  .focus-items {
    grid-template-columns: 1fr;
  }

  .education-item {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .header-inner {
    padding: 12px 16px;
  }

  .logo h1 {
    font-size: 1.2rem;
  }

  .hero {
    padding: 40px 16px;
  }

  .hero-text h2 {
    font-size: 1.6rem;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
  }

  .projects,
  .awards,
  .skills,
  .education,
  .research-focus {
    padding: 40px 16px;
  }

  .project-grid,
  .skills-grid {
    gap: 20px;
  }

  .footer {
    padding: 32px 16px;
  }
}
</style>

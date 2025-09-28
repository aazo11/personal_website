export default function Home() {
  return (
    <main>
      <p className="terminal-prompt">whoami</p>
 
      <div className="section">
        <p>Amir A. Zohrenejad. I invest in devtools and infrastructure software at Heavybit. I was previously the co-founder and CTO of Dataherald.</p>
        <p>This page collects my writings, software projects, investments and interesting tech papers and other areas of interest</p>
      </div>

      <div className="section">
        <p className="terminal-prompt">ls -la /recent</p>
        <ul>
          <li><a href="/blog">Latest blog posts</a></li>
          <li><a href="/projects">Open source projects</a></li>
          <li><a href="/investments">Portfolio companies</a></li>
        </ul>
      </div>

      <div className="section">
        <p className="terminal-prompt">ping aazo11</p>
        <ul>
          <li>amir[at]heavybit.com</li>
          <li><a href="https://www.linkedin.com/in/amir-zohrenejad/" target="_blank">LinkedIn</a></li>
          <li><a href="https://github.com/aazo11" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://twitter.com/aazo11" target="_blank" rel="noopener noreferrer">Twitter</a></li>
        </ul>
      </div>
    </main>
  )
}

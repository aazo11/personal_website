export default function ProjectsPage() {
  const projects = [
    {
      name: "Project Alpha",
      description: "Open source developer tool for X",
      url: "https://github.com/aazo11/project-alpha"
    },
    {
      name: "Project Beta", 
      description: "Infrastructure automation platform",
      url: "https://github.com/aazo11/project-beta"
    },
  ]

  return (
    <main>
      <p className="terminal-prompt">git log --oneline -10</p>
      
      <div className="section">
        <p>Making things no one wants</p>
      </div>

      <div className="section">
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.name}
              </a>
              <p className="post-date">{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

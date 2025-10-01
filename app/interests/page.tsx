import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interests | aazo11',
  description: 'What I am reading, where I am going',
  openGraph: {
    title: 'Interests | aazo11',
    description: 'What I am reading, where I am going',
    url: 'https://aazo11.dev/interests',
    siteName: 'aazo11.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Interests | aazo11',
    description: 'What I am reading, where I am going',
  }
}

export default function InterestsPage() {
  return (
    <main>
      <p className="terminal-prompt">sudo make me interesting</p>

      <div className="section">
        <h2>📖 Recent Readings</h2>
        <h3>Books</h3>
        <ul>
          <li>
            <a href="https://www.goodreads.com/book/show/4982.The_Sirens_of_Titan" target="_blank" rel="noopener noreferrer">The Sirens of Titan</a>
            <p className="post-date">Kurt Vonnegut</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/63032.The_Savage_Detectives" target="_blank" rel="noopener noreferrer">The Savage Detectives</a>
            <p className="post-date">Roberto Bolaño</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/50489427-when-we-cease-to-understand-the-world" target="_blank" rel="noopener noreferrer">When We Cease to Understand The World</a>
            <p className="post-date">Benjamin Labatut</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/61535399-the-maniac" target="_blank" rel="noopener noreferrer">The Maniac</a>
            <p className="post-date">Benjamin Labatut</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/6332964-ablutions" target="_blank" rel="noopener noreferrer">Ablutions</a>
            <p className="post-date">Patrick deWitt</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/24885533-the-paper-menagerie-and-other-stories" target="_blank" rel="noopener noreferrer">The Paper Menagerie</a>
            <p className="post-date">Ken Liu</p>
          </li>
        </ul>
        
        <h3>Papers</h3>
        <ul>
          <li>
            <a href="https://arxiv.org/pdf/2409.08273" target="_blank" rel="noopener noreferrer">Hand-Object Interaction Pretraining from Videos</a>
            <p className="post-date">Singh, Loquercio et al.</p>
          </li>
          <li>
            <a href="https://arxiv.org/pdf/2509.00997" target="_blank" rel="noopener noreferrer">Supporting Our AI Overlords: Redesigning Data Systems to be Agent-First</a>
            <p className="post-date">Liu, Ponnapali et al.</p>
          </li>
          <li>
            <a href="https://ai.meta.com/research/publications/are-scaling-up-agent-environments-and-evaluations/" target="_blank" rel="noopener noreferrer">ARE: scaling up agent environments and evaluations</a>
            <p className="post-date">Andrews, Benhalloum et al.</p>
          </li>
          <li>
            <a href="https://arxiv.org/pdf/2407.09522" target="_blank" rel="noopener noreferrer">UQE: A Query Engine for Unstructured Databases</a>
            <p className="post-date">Dai, Wang et al</p>
          </li>
          
        </ul>
      </div>

      <div className="section">
        <h2>🎪 Upcoming events</h2>
        <ul>
          <li>DevGuild</li>
          <li><a href='https://www.smalldatasf.com/'>Small Data SF</a></li>
          <li><a href='https://neurips.cc/'>NeurIPS 2025 San Diego</a></li>
        </ul>
      </div>
    </main>
  );
}

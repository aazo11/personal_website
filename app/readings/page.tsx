import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Readings | aazo11',
  description: 'What I am reading',
  openGraph: {
    title: 'Readings | aazo11',
    description: 'What I am reading',
    url: 'https://aazo11.dev/readings',
    siteName: 'aazo11.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Readings | aazo11',
    description: 'What I am reading',
  }
}

export default function ReadingsPage() {
  return (
    <main>
      <p className="terminal-prompt">cat ~/recent_readings.txt</p>

      <div className="section">
        <h2>📖 Recent Readings</h2>
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
        
        <h3>Books</h3>
        <ul>
          <li>
            <a href="https://www.goodreads.com/book/show/16690.The_Moon_Is_a_Harsh_Mistress" target="_blank" rel="noopener noreferrer">The Moon Is a Harsh Mistress</a>
            <p className="post-date">Robert A. Heinlein</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/197239530-medusa-of-the-roses" target="_blank" rel="noopener noreferrer">Medusa of the Roses</a>
            <p className="post-date">Navid Sinaki</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/10249013-bismarck" target="_blank" rel="noopener noreferrer">Bismarck: A Life</a>
            <p className="post-date">Jonathan Steinberg</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/54870256-there-is-no-antimemetics-division" target="_blank" rel="noopener noreferrer">There Is No Antimemetics Division</a>
            <p className="post-date">qntm</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/31196.The_Razor_s_Edge" target="_blank" rel="noopener noreferrer">The Razor's Edge</a>
            <p className="post-date">W. Somerset Maugham</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/4982.The_Sirens_of_Titan" target="_blank" rel="noopener noreferrer">The Sirens of Titan</a>
            <p className="post-date">Kurt Vonnegut</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/63033.The_Savage_Detectives" target="_blank" rel="noopener noreferrer">The Savage Detectives</a>
            <p className="post-date">Roberto Bolaño</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/62069739-when-we-cease-to-understand-the-world" target="_blank" rel="noopener noreferrer">When We Cease to Understand The World</a>
            <p className="post-date">Benjamin Labatut</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/75665931-the-maniac" target="_blank" rel="noopener noreferrer">The Maniac</a>
            <p className="post-date">Benjamin Labatut</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/5291478-ablutions" target="_blank" rel="noopener noreferrer">Ablutions</a>
            <p className="post-date">Patrick deWitt</p>
          </li>
          <li>
            <a href="https://www.goodreads.com/book/show/24885533-the-paper-menagerie-and-other-stories" target="_blank" rel="noopener noreferrer">The Paper Menagerie</a>
            <p className="post-date">Ken Liu</p>
          </li>
        </ul>
      </div>
    </main>
  );
}

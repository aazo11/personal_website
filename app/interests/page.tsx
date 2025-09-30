import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interests | aazo11',
  description: 'Books, marathons, mountains, and other things that make me interesting',
  openGraph: {
    title: 'Interests | aazo11',
    description: 'Books, marathons, mountains, and other things that make me interesting',
    url: 'https://aazo11.dev/interests',
    siteName: 'aazo11.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Interests | aazo11',
    description: 'Books, marathons, mountains, and other things that make me interesting',
  }
}

export default function InterestsPage() {
  const interests = [
    {
      category: "Books",
      items: [
        "Books that rewired my brain"
      ]
    },
    {
      category: "Physical Challenges", 
      items: [
        "Running marathons (slowly)",
        "Climbing mountains (even more slowly)"
      ]
    }
  ];

  return (
    <main>
      <p className="terminal-prompt">sudo make me interesting</p>

      <div className="section">
        <ul>
          <li>Books that rewired my brain</li>
          <li>Running marathons (slowly)</li>
          <li>Climbing mountains (even more slowly)</li>
        </ul>
      </div>
    </main>
  );
}
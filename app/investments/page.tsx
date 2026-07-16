import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investments | aazo11',
  description: 'Portfolio companies and funds - investing in devtools and infrastructure startups',
  openGraph: {
    title: 'Investments | aazo11',
    description: 'Portfolio companies and funds - investing in devtools and infrastructure startups',
    url: 'https://aazo11.dev/investments',
    siteName: 'aazo11.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Investments | aazo11',
    description: 'Portfolio companies and funds - investing in devtools and infrastructure startups',
  }
}

export default function InvestmentsPage() {
	enum Involvement {
  		Angel = "ANGEL",      // 0
  		Board = "BOARD",    // 1
  		LP = "LP",    // 2
	}

  const investments = [
{
		name:"Heavybit",
		url:"https://heavybit.com",
		involvement: Involvement.LP
	},
	{
		name:"Orange Collective",
		url:"https://www.orangecollective.vc",
		involvement: Involvement.LP
	},
{
      name: "assistant-ui",
      url: "https://www.assistant-ui.com",
      involvement:Involvement.Angel
    },
    {
      name: "HumanLayer",
      url: "https://www.humanlayer.dev",	  
      involvement:Involvement.Angel
    },
{
      name: "Cartage",
      url: "https://www.cartage.ai",      	  
      involvement:Involvement.Angel

    },
    {
      name: "Recover",
      url: "https://www.ycombinator.com/companies/recover",	  
      involvement:Involvement.Angel

    },
    {
      name: "Credible",
      url: "https://credibledata.com",
      involvement:Involvement.Angel

    },
    {
      name: "Piris Labs",
      url: "https://pirislabs.com",
      involvement:Involvement.Angel
    },
    {
      name: "Baseten",
      url: "https://www.baseten.co",
      involvement:Involvement.Angel
    },
    {
      name: "Generationship",
      url: "https://generationship.vc",
      involvement:Involvement.LP
    }
  ];

  const lpInvestments = investments
    .filter(inv => inv.involvement === Involvement.LP)
    .sort((a, b) => a.name.localeCompare(b.name));
  const companyInvestments = investments
    .filter(inv => inv.involvement === Involvement.Board || inv.involvement === Involvement.Angel)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main>
      <h1 className="terminal-prompt">SELECT * from portfolio LIMIT 10</h1>

      <p>I am an LP in the following funds</p>
      <div className="section">
        <ul>
          {lpInvestments.map((company, index) => (
            <li key={index}>
              <a href={company.url} target="_blank" rel="noopener noreferrer">
                {company.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p>I am an investor in these companies</p>
      <div className="section">
        <ul>
          {companyInvestments.map((company, index) => (
            <li key={index}>
              <a href={company.url} target="_blank" rel="noopener noreferrer">
                {company.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

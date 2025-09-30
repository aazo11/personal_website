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
      name: "Halluminate",
      url: "https://halluminate.ai",
      involvement:Involvement.Board
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
      name: "Tailscale",
      url: "https://tailscale.com",      	  
      involvement:Involvement.Angel
    },
    {
      name: "Brackett AI",
      url: "https://brackett.ai",
      involvement:Involvement.Board

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

    }
  ];

  const lpInvestments = investments
    .filter(inv => inv.involvement === Involvement.LP)
    .sort((a, b) => a.name.localeCompare(b.name));
  const boardInvestments = investments
    .filter(inv => inv.involvement === Involvement.Board)
    .sort((a, b) => a.name.localeCompare(b.name));
  const angelInvestments = investments
    .filter(inv => inv.involvement === Involvement.Angel)
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

      <p>I am working closely with the founders of these companies</p>
      <div className="section">
        <ul>
          {boardInvestments.map((company, index) => (
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
          {angelInvestments.map((company, index) => (
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

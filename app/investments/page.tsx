export default function InvestmentsPage() {
  const investments = [
    {
      name: "Autumn",
      url: "https://useautumn.com",
    },
    {
      name: "Halluminate",
      url: "https://halluminate.ai",
    },
    {
      name: "assistant-ui",
      url: "https://www.assistant-ui.com",
    },
    {
      name: "HumanLayer",
      url: "https://www.humanlayer.dev",
    },
    {
      name: "Tailscale",
      url: "https://tailscale.com",
    },
    {
      name: "Brackett AI",
      url: "https://brackett.ai",
    },
    {
      name: "Cartage",
      url: "https://www.cartage.ai",
    },
    {
      name: "Recover",
      url: "https://www.ycombinator.com/companies/recover",
    },
    {
      name: "Omnara",
      url: "https://omnara.com",
    },
    {
      name: "Credible",
      url: "https://credibledata.com",
    }
  ];

  return (
    <main>
      <h1 className="terminal-prompt">SELECT * from portfolio LIMIT 10</h1>

      <p>I am working with the founders of these companies closely</p>

      <div className="section">
        <ul>
          {investments.map((company, index) => (
            <li key={index}>
              <a href={company.url} target="_blank" rel="noopener noreferrer">
                {company.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p>I am an LP in the following funds</p>

      
    </main>
  );
}

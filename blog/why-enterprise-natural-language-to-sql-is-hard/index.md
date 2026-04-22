---
title: "Why Enterprise Natural Language to SQL is Hard"
date: "2023-08-07"
---

*Originally published on [Dataherald Blog](https://medium.com/dataherald/why-enterprise-natural-language-to-sql-is-hard-8849414f41c)*

"The future of BI is conversational." This has been the prediction of industry analysts for a number of years. Yet despite the amazing progress in conversational LLM-based applications in the past year such as ChatGPT + Bard and new powerful models like GPT-4, conversational BI is still not deployed in most companies. Business users are still looking for insights in BI dashboards and data analysts are still sifting through Slack and Jira tickets, opening up a SQL engine connected to their data warehouse and hand-writing SQL queries to answer ad-hoc business questions. Why is conversational BI still not here?

While structured data only makes up ~20% of the world's data, the majority of enterprise data is still in structured data stores and accessible mainly through SQL queries. Therefore at a high level in order to enable conversational BI, a solution needs to be devised that can translate natural language business questions to valid SQL queries that are then executed against the enterprise data warehouse. Engineers have tried to build "Natural Language to SQL" (NL2SQL) engines since the 70s (using rules-based techniques) which would very quickly get too complex to be useful. But with the advancement of transformers which have enabled tools like GitHub CoPilot and OpenAI Code Interpreter it would seem this should be a trivial problem to solve. It is not.

## Two Approaches to Building NL2SQL

There are (at least) two ways a company can build an LLM-based NL2SQL engine to enable conversational BI:

### 1. Fine-tuning your own LLM
This approach would require taking an existing LLM and then training it further using NL<>SQL pairs relating to the company's structured data. A couple of challenges with this approach are that:
- Coming up with the training dataset is hard and expensive
- The most powerful LLM model around (GPT-4) cannot be fine-tuned (as of this writing)

### 2. Leveraging In-context learning
The latest LLM models (like GPT-4–32K) can write SQL quite well out of the box and have enough context window for quite a bit of few shot training and for an agent to try to recover from errors by performing follow-ups using chain-of-thought techniques. The idea here is to build an LLM agent on top of GPT-4 that can implement NL2SQL with few shot learning.

## The Six Challenges

So what are the challenges of deploying solution #2? Here are six we have encountered:

### 1. Table and Column descriptions
Even the best data teams often do not have clear documentation about tables, columns and metadata. With the rise of ELT where data is simply dumped in the warehouse from various sources and transformed on query the situation becomes even worse. Therefore the table and column names might be the only info available to the engine at configuration time.

### 2. Missing Context and Metadata
There are often business definitions which live in data analyst's heads and are not in the underlying data. We encountered a real-world home rental marketplace, for which what constitutes an "active listing" is a combination of WHERE clauses which are different based on the value of another column which specifies the `building_type`. In rare cases these are stored as Views on the table, but more often that not they are just stored in a query in the BI tool/dashboard.

### 3. Incomplete info in question, lack of "common sense"
"What was the average rent in Los Angeles in May 2023?" A reasonable human receiving this question would simply assume the question is about Los Angeles, CA or would confirm with the asker in a follow up. However an LLM usually translates this to:

```sql
SELECT price 
FROM rent_prices 
WHERE city = "Los Angeles" 
  AND month = "05" 
  AND year = "2023"
```

which pulls up data for Los Angeles, CA and Los Angeles, TX without even getting columns to differentiate between the two.

### 4. Speed
In order for the engine to be "conversational," response times must be fast (sub 30s). This is often very hard to achieve, especially if the agent tried to recover from errors or evaluate generated responses with subsequent LLM calls.

### 5. Complex Queries
While GPT-4 writes simple SQL queries very well, it can often stumble on complex queries that require aggregations and joins. This is exacerbated in cases where the column name contains an action that can be done in SQL (for example `Average` or `SUM`) and in join operations on data warehouses where FOREIGN KEYS are not clearly enforced like they are in production DBs.

### 6. Privacy and Data Leaking
Many organizations do not want their database data or schema being sent to companies like OpenAI since it can leak into their training corpus.

### 7. Validation
There is no known way to identify cases where the system returns a syntactically valid but incorrect SQL. For example if the user asks for an 'average' value, and the system runs an `AVG` instead of picking a column called `average_price`.

## Is Enterprise Conversational BI Possible?

So is enterprise conversational BI impossible in 2023? Will there be a few more years of academic papers and company AI hackathon projects before a solution can be deployed in production? We don't think so.

While the challenges are definitely real, we believe with the right tool an enterprise data team can deploy solutions to enable business users to self-serve ad-hoc data questions from the company data warehouse. In the coming weeks we will be releasing a number of open source and hosted tools to address this.

If you are interested in contributing to or deploying NL2SQL for your enterprise, please reach out.
---
title: "The Problem of Text-to-SQL"
date: "2024-08-26"
---

*Originally published on [Relta Blog](https://medium.com/relta/the-problem-of-text-to-sql-9fa9df8d15ab)*

When software developers realized GPT3.5 could write syntactically correct SQL, the race was on to build text-to-SQL into everything. Every YCombinator batch since W22 includes a few "chat with your data" startups, data platforms have added natural language interfaces and SaaS vendors have rolled out AI assistants that answer questions from relational data. While the accuracy of these models keeps increasing in academic benchmarks (new benchmarks have to be built!) the features built on text-to-SQL are mediocre at best and annoying at worst. It is at a point where some are questioning if users even want these features at all, even though there are few if any solutions that actually work.

Before continuing let's point out that text-to-SQL features fall into two broad product categories:

1. **SQL co-pilots** — that deliver a first draft SQL to a data scientist who can modify it
2. **Natural language querying** — where there is no human in the loop, the user does not see the intermediate SQL nor the underlying schema

The focus of this blog is on case #2, where the user is not a data scientist and are not familiar with the schema they are querying.

## Two Competing Visions

There are two visions when it comes to the latter case of natural language querying:

### Self serving from the data warehouse
You are a midsize company or large enterprise. You have invested lots of capital to become "data-driven." This includes setting up a data warehouse, pipelines from various sources and lots of BI dashboards. Still very few people in the organization are using the data, and the data team is complaining about being inundated with requests from business teams. If only the analytical business teams could self serve from the data warehouse directly, better decisions would be made and profits would surely increase.

### Natural language interfaces in SaaS application
You are the CTO of a SaaS company (CRM, HR + payroll, analytics, …). It is 2024 and you have to become an AI company. Users like ChatGPT so they also must love to interact with your software through an AI assistant. Engineering resources are diverted to building an LLM based AI assistant that can retrieve data from the production database instead of pointing and clicking to through dashboard and reports.

## Why Aren't These Visions Reality?

Both visions seem plausible. So two years since ChatGPT and millions of dollars spent why are neither of these visions even close to becoming a reality? 

Existing text-to-SQL approaches broadly do the following:

1. Connect the tool to your existing relational database to a subset of your schemas, tables, columns, or views
2. Add "context" by providing verified samples for few shot prompting or fine-tuning. Add more context by chunking and adding metadata from unstructured sources like business documentation.
3. Build an LLM agent to build a prompt with the most relevant semantic context, execute it against the DB, and iterate to recover from errors

In short they try to make the LLM understand a dataset and schema that was designed by a software developer to optimize performance on reads and writes by sprinkling some magical pixie dust (context). 

As a result the solutions are:

- **Non-deterministic** — similar prompts can create different answers, as shown in the example below.
- **Hard to train** — there is no direct correlation between time invested in adding context and the resulting accuracy. It is a trial and error approach.
- **Inaccurate** — as a result of the above, real-world scenarios have accuracy of 60%

## A Real-World Example

The following is a real world example of a simple question from a single table that generates non-deterministic results even with extensive configuration and context added. The table is marketing leads recorded for a healthcare business, and the question is **"What are the top 3 most common reasons for losing a patient?"**

```sql
CREATE TABLE leads ( 
  facility INT64, 
  sales_id INT64, 
  patient_id INT64, 
  source STRING, 
  cost INT64, 
  campaign_effectiveness STRING, 
  zip_code INT64, 
  lost_reasons STRING, 
  lead_id INT64, 
  status STRING, 
  email STRING, 
  initial_contact_date DATE, 
  last_contact_date DATE);
```

The above table has been scanned with the low cardinality columns identified: the status column is low-cardinality as it can only have values of `converted`, `lost` or `In progress`. Furthermore an admin has provided verified "golden SQL" which are used in few shot prompts and additional description on columns.

However the best in class text-to-SQL agents still produce the following two answers:

```sql
-- Question: What are the top 3 most common reasons for losing a patient?

-- First potential answer produced around ~80% of the time
-- filters for distinct patient_id but not on status 
SELECT lost_reasons, COUNT(distinct patient_id) AS number_of_patients_lost 
FROM `leads` 
WHERE lost_reasons IS NOT NULL 
GROUP BY lost_reasons 
ORDER BY number_of_patients_lost DESC 
LIMIT 3

-- Second potential answer produced around ~20% of the time
-- Assumes a patient_id can be lost multiple time and filters on status = 'Lost' 
SELECT lost_reasons, COUNT(patient_id) AS number_of_patients_lost
FROM `leads`
WHERE lost_reasons IS NOT NULL AND status = 'Lost'
GROUP BY lost_reasons
ORDER BY number_of_patients_lost DESC
LIMIT 3
```

The two SQL above produce different answers from the data. This is not surprising since even to a SQL proficient human without additional information both answers could be correct. In fact one could even assume both should generate the same answer if the data is clean: if each patient_id can only be a lead once and for any lost lead the status and lost_reasons are recorded correctly. But in the real world, structured data is messy and cases like this are the norm.

## The Real Solution

In order for natural language querying to work, the dataset has to be modeled around the questions users will ask from the data. For our example above, `lost_lead` needs to be a deterministic metric. However, coming up with the deterministic set of metrics to cover all KPIs from raw data schemas is an incredibly hard and manual task. I will write more about how this can be simplified in a future post.

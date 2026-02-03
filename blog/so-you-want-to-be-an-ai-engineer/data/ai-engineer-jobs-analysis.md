th# AI Engineer Job Market Analysis

*Analysis of 31 job postings from 21 companies, collected January 2026*

---

## Executive Summary

The AI Engineer role has emerged as a distinct job category, separate from traditional ML Engineer positions. Key findings:

- **Python is universal** (77% of postings), with TypeScript as the clear #2 for AI work
- **LangChain/LangGraph dominates** the orchestration framework landscape (32% of postings)
- **RAG is table stakes** - mentioned in 26% of postings explicitly, implied in many more
- **Agents are the focus** - "agentic" appears in 35%+ of job descriptions
- **Evals are underemphasized** - only 13% explicitly mention evaluation frameworks
- **Hybrid is the norm** (71%), full remote is rare (10%)
- **Salaries range $130K-$325K**, with median around $200K

---

## 1. Education Requirements

| Requirement | Count | % of Postings |
|-------------|-------|---------------|
| Bachelor's degree specified | 12 | 39% |
| Master's preferred/mentioned | 3 | 10% |
| No degree specified | 19 | 61% |

**Degree Fields Requested (when specified):**
- Computer Science (most common)
- Engineering
- Mathematics / Statistics
- AI/ML
- Data Science

**Key Insight:** Most postings (61%) don't specify a degree requirement, focusing instead on demonstrated skills and experience. When degrees are mentioned, CS is dominant but quantitative fields are acceptable.

---

## 2. Programming Languages

| Language | Required | Preferred | Total Mentions |
|----------|----------|-----------|----------------|
| **Python** | 24 | 1 | **25 (81%)** |
| **TypeScript** | 10 | 0 | **10 (32%)** |
| JavaScript | 4 | 0 | 4 (13%) |
| Java | 4 | 0 | 4 (13%) |
| Go | 4 | 1 | 5 (16%) |
| Scala | 2 | 0 | 2 (6%) |
| C++ | 1 | 1 | 2 (6%) |
| Node.js | 1 | 0 | 1 (3%) |

**Key Insight:** Python is nearly universal. TypeScript has emerged as the clear #2, reflecting the importance of full-stack AI applications and tools like Vercel AI SDK. Go is gaining traction for infrastructure-heavy roles.

---

## 3. AI/ML Frameworks

### LLM Orchestration Frameworks

| Framework | Required | Preferred | Total |
|-----------|----------|-----------|-------|
| **LangChain** | 8 | 1 | **9 (29%)** |
| **LangGraph** | 6 | 1 | **7 (23%)** |
| **LlamaIndex** | 1 | 2 | 3 (10%) |
| AutoGen | 1 | 0 | 1 (3%) |
| CrewAI | 0 | 1 | 1 (3%) |
| Semantic Kernel | 1 | 0 | 1 (3%) |

### Deep Learning Frameworks

| Framework | Required | Preferred | Total |
|-----------|----------|-----------|-------|
| PyTorch | 2 | 0 | 2 (6%) |
| TensorFlow | 1 | 0 | 1 (3%) |
| Hugging Face Transformers | 1 | 0 | 1 (3%) |
| scikit-learn | 1 | 0 | 1 (3%) |

### Serving & Inference

| Tool | Required | Preferred | Total |
|------|----------|-----------|-------|
| vLLM | 1 | 0 | 1 (3%) |
| Hugging Face TGI | 1 | 0 | 1 (3%) |

### Agent-Specific Tools

| Tool | Required | Preferred | Total |
|------|----------|-----------|-------|
| MCP (Model Context Protocol) | 3 | 0 | 3 (10%) |
| Agents SDK | 0 | 2 | 2 (6%) |
| Guardrails | 1 | 0 | 1 (3%) |
| A2A | 1 | 0 | 1 (3%) |

**Key Insight:** LangChain + LangGraph together appear in 32% of postings - the de facto standard. Traditional ML frameworks (PyTorch, TensorFlow) are rarely mentioned, signaling a shift from model training to model orchestration.

---

## 4. LLM-Specific Skills

| Skill | Explicit Mentions | % of Postings |
|-------|-------------------|---------------|
| **Agents / Agentic workflows** | 11 | **35%** |
| **RAG (Retrieval Augmented Generation)** | 8 | **26%** |
| LLMs (general) | 15 | 48% |
| Prompt engineering / design | 5 | 16% |
| **Evals / Evaluation frameworks** | 4 | **13%** |
| Fine-tuning | 3 | 10% |
| Tool use / Function calling | 3 | 10% |

**Companies explicitly mentioning Evals:**
1. Scale AI - "Enterprise Evaluations" (dedicated team)
2. Snorkel AI - "create evaluation workflows"
3. LangChain - "evaluation pipelines", "evaluation frameworks"
4. Accenture - "model evaluation"

**Key Insight:** Agents are the hot skill (35%), but **evals are surprisingly underrepresented** (13%) given their importance in production LLM systems. This may represent a gap between what companies need and what they're hiring for.

---

## 5. Databases & Data Infrastructure

### Vector Databases

| Database | Mentions |
|----------|----------|
| Vector DBs (general) | 4 (13%) |
| FAISS | 1 |
| Chroma | 1 |
| Weaviate | 1 |

### Traditional Databases

| Database | Mentions |
|----------|----------|
| PostgreSQL | 1 |

### Data Processing

| Tool | Mentions |
|------|----------|
| pandas | 2 |
| Spark | 1 |

**Key Insight:** Vector database knowledge is increasingly expected but specific tools vary. General "vector database" experience is more commonly requested than expertise in a specific solution.

---

## 6. Cloud Platforms

| Platform | Required | Preferred | Total |
|----------|----------|-----------|-------|
| **AWS** | 10 | 2 | **12 (39%)** |
| **GCP** | 8 | 1 | **9 (29%)** |
| **Azure** | 8 | 0 | **8 (26%)** |
| Multi-cloud mentioned | 6 | - | 6 (19%) |

**Specific Services Mentioned:**
- AWS SageMaker
- Azure AI
- Google Vertex AI
- AWS (general)

**Key Insight:** Multi-cloud is common - 19% of postings mention all three major clouds. AWS leads slightly, but cloud-agnostic skills are valued.

---

## 7. Infrastructure & DevOps Skills

| Skill | Mentions | % of Postings |
|-------|----------|---------------|
| **Docker** | 4 | 13% |
| **CI/CD** | 5 | 16% |
| Kubernetes | 1 | 3% |
| Terraform | 1 | 3% |
| CloudFormation | 1 | 3% |
| Infrastructure as Code | 1 | 3% |

**Key Insight:** Basic containerization (Docker) and CI/CD are expected. Full DevOps/platform engineering skills are less commonly required - most AI Engineers work on top of existing infrastructure.

---

## 8. Experience Requirements

### Years of Experience

| Years | Count | % of Postings |
|-------|-------|---------------|
| Not specified | 17 | 55% |
| 3 years | 4 | 13% |
| 4 years | 3 | 10% |
| 5 years | 5 | 16% |
| 6 years | 1 | 3% |
| 8 years | 1 | 3% |
| 10 years | 2 | 6% |

**Average (when specified):** 5.1 years

### Seniority Distribution

| Level | Count | % of Postings |
|-------|-------|---------------|
| Entry/New Grad | 1 | 3% |
| Mid-level | 11 | 35% |
| Senior | 12 | 39% |
| Staff | 2 | 6% |
| Not specified | 5 | 16% |

**Key Insight:** This is predominantly a mid-to-senior role (74% combined). Entry-level AI Engineer positions are rare - most companies expect prior experience with LLMs in production.

---

## 9. Compensation Analysis

### Salary Ranges (USD, Annual)

| Metric | Amount |
|--------|--------|
| **Minimum observed** | $99,000 |
| **Maximum observed** | $325,000 |
| **Median minimum** | $172,000 |
| **Median maximum** | $250,000 |
| **Typical range** | $160,000 - $270,000 |

### Salary by Seniority

| Level | Range | Typical |
|-------|-------|---------|
| Entry | $130K-$150K | ~$140K |
| Mid | $150K-$250K | ~$195K |
| Senior | $160K-$300K | ~$225K |
| Staff | $225K-$285K | ~$255K |

### Salary by Company Type

| Type | Range | Avg Max |
|------|-------|---------|
| AI-native | $130K-$300K | $237K |
| Big Tech | $99K-$276K | $236K |
| DevTools | $160K-$288K | $233K |
| Startups | $150K-$325K | $259K |
| Applied AI | $133K-$264K | $240K |

### Equity

| Equity Mentioned | Count | % |
|------------------|-------|---|
| Yes | 24 | 77% |
| No | 7 | 23% |

**Key Insight:** Startups offer the highest maximum salaries ($325K at Moment), while big tech has more structured ranges. 77% of positions mention equity, making total compensation significantly higher than base.

---

## 10. Soft Skills & Other Requirements

### Customer-Facing Requirements

| Requirement | Count | % |
|-------------|-------|---|
| Customer-facing explicitly required | 6 | 19% |
| Customer-facing preferred | 3 | 10% |

**Roles emphasizing customer work:**
- Scale AI (Forward Deployed)
- AssemblyAI
- Snorkel AI
- LangChain (Professional Services)
- Harvey

### Startup Experience

| Requirement | Count | % |
|-------------|-------|---|
| Startup experience preferred | 5 | 16% |
| "Former founders welcome" | 2 | 6% |

### Other Notable Requirements

- **Security clearance:** 1 posting (Booz Allen - Public Trust)
- **Domain expertise:** Legal (Harvey, Morrison & Foerster), Finance (Moment, JPMorgan, Capital One), Supply Chain (Salesforce)

---

## 11. Location & Remote Policy

### Work Arrangement

| Policy | Count | % |
|--------|-------|---|
| **Hybrid** | 22 | **71%** |
| Onsite | 4 | 13% |
| Remote | 3 | 10% |
| Not specified | 2 | 6% |

### Top Locations

| City | Postings |
|------|----------|
| San Francisco | 19 |
| New York | 16 |
| Seattle | 3 |
| Remote (US) | 4 |

**Key Insight:** Hybrid is the dominant model (71%). Fully remote AI Engineer roles are rare (10%), likely due to the collaborative nature of the work and security concerns around AI development.

---

## Key Takeaways

### What to Learn if You Want to Be an AI Engineer

1. **Must have:** Python, LangChain/LangGraph basics, RAG concepts
2. **Should have:** TypeScript, cloud fundamentals (AWS/GCP), Docker
3. **Differentiators:** Evaluation frameworks, production agent deployment, MCP
4. **Undervalued skill:** Systematic evaluation and testing of LLM systems

### Market Observations

1. **The role is new** - job titles are inconsistent ("AI Engineer" vs "Applied AI Engineer" vs "ML Engineer")
2. **Production focus** - training models is rare; orchestrating and deploying them is the job
3. **Full-stack expectations** - many roles expect frontend/backend skills alongside AI
4. **Agents are the future** - 35% of roles explicitly focus on agentic systems
5. **Evals are the gap** - only 13% mention evals, but this is likely to grow

### Salary Negotiation Insights

- Entry: Target $140K+ with equity
- Mid: Target $190K-$220K with equity
- Senior: Target $220K-$270K with equity
- Startups may offer higher base but evaluate equity carefully
- Big tech offers more stability but potentially lower upside

---

*Analysis generated from 31 verified job postings across AI-native companies, big tech, developer tools, startups, and applied AI companies.*

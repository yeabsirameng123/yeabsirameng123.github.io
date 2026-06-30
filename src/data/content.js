// ────────────────────────────────────────────────────────────────────────────
// Everything you'd want to edit lives here. Change the words, ship again.
// ────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Yeabsira Dana',
  role: 'ML Engineer & Researcher',
  location: 'Washington, DC',
  email: 'yeabsiramengistu@gmail.com',
  phone: '+1 202-906-9509',
  linkedin: 'https://www.linkedin.com/in/yeabsira-mengistu/',
  paper: 'https://doi.org/10.1002/ima.70056',
  intro:
    "I build machine learning systems, and the software that puts them to use. Right now I'm helping train and evaluate frontier language models at Handshake AI.",
}

export const stats = [
  { n: '1', label: 'Published paper' },
  { n: '3', label: 'Degrees · AI & CS' },
  { n: '3', label: 'Countries studied' },
]

export const about = [
  "My research has gone into outlining brain tumors in 3D MRI scans, building EEG interfaces for people who can't move or speak, and pulling the real shape of a process out of messy event logs. One of those turned into a published paper.",
  "The other half of my work is shipping software — backends, APIs, and the pipelines that keep them alive — mostly in Python, Django, React, and AWS. Lately a lot of it has been LLM work: Hugging Face, LangChain, Haystack, that whole stack.",
]

export const projects = [
  {
    title: 'LLM evaluation dashboard',
    year: '2026',
    body:
      'A portfolio-grade evaluator for prompt tests, scoring rubrics, failure categories, RAG evidence coverage, and hallucination detection. Built to show how I think about model quality, not just model outputs.',
    stack: 'React · RAG eval · Prompt testing · Risk scoring',
    link: '#llm-eval',
    linkLabel: 'Open the dashboard',
  },
  {
    title: 'SegViz semantic segmentation',
    year: '2026',
    body:
      'A live computer-vision app where someone uploads a photo and SegFormer labels every pixel. It returns a color overlay, a fade control, and scene-coverage analytics, with cached re-blending so the UI stays fast on free CPU hardware.',
    stack: 'Python · PyTorch · SegFormer · Hugging Face · Gradio',
    link: '#segviz-demo',
    linkLabel: 'Try live demo',
  },
  {
    title: 'Ask My Docs RAG',
    year: '2026',
    body:
      'A Python + Gradio retrieval app that ingests documents, chunks them, embeds them with MiniLM, searches with FAISS, and generates grounded answers with citations. It can run locally or deploy to Hugging Face Spaces without paid API keys.',
    stack: 'Python · FAISS · Sentence Transformers · Gradio · flan-t5',
    link: '#rag-demo',
    linkLabel: 'Try live demo',
  },
  {
    title: '3D brain-tumor segmentation',
    year: '2025',
    published: true,
    body:
      "A deep learning pipeline that finds and outlines tumors in 3D MRI scans. The part I'm proud of is the data generator — I rebuilt how training samples get made and cleaned up, and that's what pushed the accuracy up on full 3D volumes. It's published in Wiley's International Journal of Imaging Systems and Technology.",
    stack: 'PyTorch · 3D U-Net · MRI · Python',
    link: 'https://doi.org/10.1002/ima.70056',
    linkLabel: 'Read the paper',
  },
  {
    title: 'Process mining with graphs',
    year: '2024',
    body:
      'A tool that pulls the real flow of a process out of large event logs — the path things actually take, not the one drawn on paper. I wrote the path-finding algorithm myself and ran everything through Neo4j, testing on public municipal records (the BPIC15 dataset).',
    stack: 'Neo4j · Python · Pandas · Graphs',
  },
  {
    title: 'Full-stack analytics platform',
    year: '2024',
    body:
      'An end-to-end data platform — Angular up front, Django and Postgres behind it, the whole thing containerized with Docker. Built with a small team so people could explore and manage their data in real time.',
    stack: 'Angular · Django · Postgres · Docker',
  },
  {
    title: 'NeuroTALK — an EEG interface',
    year: '2023',
    body:
      'A low-cost EEG headset and the software to match, meant to help people who are paralyzed or locked-in communicate. Most of the work was in the signal processing and making it actually usable. This one stuck with me more than the rest.',
    stack: 'EEG · Signal processing · BCI · Python',
  },
]

export const publication = {
  title:
    '3D U-Net-Based Brain Tumor Semantic Segmentation Using a Modified Data Generator',
  body:
    'My first paper. It walks through the U-Net setup and the custom data generator that did most of the heavy lifting on the segmentation accuracy.',
  venue: 'Int. Journal of Imaging Systems & Technology · 2025 · DOI 10.1002/ima.70056',
  link: 'https://doi.org/10.1002/ima.70056',
}

export const jobs = [
  {
    role: 'Frontier AI',
    when: 'Jun 2026 — now',
    where: 'Handshake AI · Remote',
    current: true,
    body:
      'I help train and evaluate large language models for frontier AI labs. In practice that means grading and ranking what the models say, writing tricky test cases, and trying to break them to find where they slip — all against fairly strict guidelines. My CS background pays off when the task is judging code or reasoning.',
  },
  {
    role: 'Frontend Engineer',
    when: 'May — Aug 2024',
    where: 'ACSoftware S.r.l. · Italy',
    body:
      'Built web apps for a software company in Italy — mostly e-commerce and e-learning. I owned the front end in React, wired up the auth (OAuth2, JWT, roles), and worked with the backend and design folks to actually get things shipped.',
  },
  {
    role: 'Graduate Assistant & Instructor',
    when: 'Jan — Aug 2024',
    where: 'Università della Calabria · Italy',
    body:
      'Ran the Python labs and taught alongside the regular coursework. I worked with around fifty students on debugging, algorithms, and getting unstuck, and did a lot of code reviews along the way.',
  },
  {
    role: 'Software Engineer Intern',
    when: 'Dec 2023 — Aug 2024',
    where: 'R.B. Software Center S.r.l. · Italy',
    body:
      'My first real engineering job. I built backend services and APIs, set up CI/CD and testing, and wrote some data-processing automation — plus the security basics done properly: auth, encryption, that sort of thing.',
  },
]

export const skills = [
  { cat: 'Machine learning', items: 'Deep learning, CNNs, vision transformers, semantic segmentation, predictive modeling' },
  { cat: 'LLMs & NLP', items: 'RAG, FAISS, sentence-transformers, Hugging Face, LangChain, Haystack, spaCy, Gradio', feat: true },
  { cat: 'Frameworks', items: 'PyTorch, TensorFlow, Keras, FastAPI' },
  { cat: 'Languages', items: 'Python, C / C++, C#, Java, JavaScript, TypeScript, SQL' },
  { cat: 'Data', items: 'Pandas, NumPy, Neo4j, PostgreSQL, graph analytics' },
  { cat: 'Web & backend', items: 'Django, React, Angular, Node.js, REST' },
  { cat: 'Infra', items: 'Docker, AWS, CI/CD, Git, Linux' },
  { cat: 'Security', items: 'OAuth2, JWT, RBAC, encryption' },
]

export const education = [
  { deg: 'M.S. Cybersecurity & Risk Management', school: 'Fairmont State University · West Virginia, USA', when: '2024 — now' },
  { deg: 'M.Sc. Artificial Intelligence & Computer Science', school: 'Università della Calabria · Italy', when: '2023 — 2025' },
  { deg: 'B.Tech Computer Engineering (AI)', school: 'Marwadi University · India', when: '2019 — 2023' },
]

export const honor = {
  tag: 'Erasmus+ MoST scholarship',
  body:
    "Picked for a year's academic exchange — from Università della Calabria over to Fairmont State University in the US (2024–2025).",
}

export const sections = [
  ['about', 'About'],
  ['work', 'Work'],
  ['live-demos', 'Demos'],
  ['llm-eval', 'LLM Eval'],
  ['publication', 'Paper'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['education', 'Education'],
  ['contact', 'Contact'],
]

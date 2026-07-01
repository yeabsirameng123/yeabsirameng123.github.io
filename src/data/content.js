// Everything you'd want to edit lives here. Change the words, ship again.

export const profile = {
  name: 'Yeabsira Dana',
  role: 'Applied ML Engineer & Researcher',
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
  'My work sits between research and product engineering. I have built 3D medical-imaging segmentation pipelines, EEG communication prototypes, graph-based process-mining systems, and applied LLM evaluation tools.',
  'I care about systems that can be inspected: clear data flow, grounded outputs, measurable failure modes, and interfaces that make model behavior visible. My stack is Python, PyTorch, React, Django, FastAPI, PostgreSQL, Neo4j, Hugging Face, LangChain, Haystack, FAISS, and RAG.',
]

export const projects = [
  {
    title: 'LLM evaluation dashboard',
    year: '2026',
    body:
      'An interactive evaluation lab for prompt tests, scoring rubrics, failure categories, citation coverage, and hallucination triage. It treats model quality as something measurable: groundedness, instruction fit, evidence use, and risk control.',
    stack: 'React · RAG eval · Prompt testing · Risk scoring',
    link: '#llm-eval',
    linkLabel: 'Open the dashboard',
  },
  {
    title: 'SegViz semantic segmentation',
    year: '2026',
    body:
      'A live semantic-segmentation app where a SegFormer transformer labels every pixel, returns a blended overlay and standalone mask, and reports class coverage across the frame.',
    stack: 'Computer vision · SegFormer · PyTorch · Gradio · React',
    link: '#segviz-demo',
    linkLabel: 'Open live demo',
  },
  {
    title: 'Grounded - self-evaluating RAG',
    year: '2026',
    body:
      'A deployed retrieval-augmented QA app that answers from sources, cites retrieved evidence, scores claim-level faithfulness, and flags unsupported statements so model behavior is inspectable.',
    stack: 'RAG / Hugging Face / sentence-transformers / Gradio',
    link: '#grounded-demo',
    linkLabel: 'Open live demo',
  },
  {
    title: '3D brain-tumor segmentation',
    year: '2025',
    published: true,
    body:
      'A 3D U-Net pipeline for segmenting brain tumors in MRI volumes. I focused on the data generator and preprocessing path, improving how training samples are assembled for full-volume learning. Published in the International Journal of Imaging Systems and Technology.',
    stack: 'PyTorch · 3D U-Net · MRI · Python',
    link: 'https://doi.org/10.1002/ima.70056',
    linkLabel: 'Read the paper',
  },
  {
    title: 'Process mining with graphs',
    year: '2024',
    body:
      'A graph-based process-mining system for reconstructing real execution paths from event logs. I modeled cases and transitions in Neo4j, implemented path analysis in Python, and tested the workflow on the BPIC15 municipal-records dataset.',
    stack: 'Neo4j · Python · Pandas · Graphs',
  },
  {
    title: 'Full-stack analytics platform',
    year: '2024',
    body:
      'An end-to-end analytics platform with Angular on the frontend, Django and PostgreSQL behind it, and Docker for deployment. The system supported real-time data exploration, account flows, and structured backend APIs.',
    stack: 'Angular · Django · Postgres · Docker',
  },
  {
    title: 'NeuroTALK — an EEG interface',
    year: '2023',
    body:
      'An EEG-based communication prototype built around low-cost hardware, signal processing, and a usable interface. The project explored how brain-computer interfaces can support communication when speech and movement are limited.',
    stack: 'EEG · Signal processing · BCI · Python',
  },
]

export const publication = {
  title:
    '3D U-Net-Based Brain Tumor Semantic Segmentation Using a Modified Data Generator',
  body:
    'Peer-reviewed work on 3D medical-image segmentation using a modified data generator for training U-Net models on MRI volumes.',
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
      'Evaluate and improve frontier language-model behavior through structured ranking, adversarial prompts, code and reasoning review, and failure analysis under strict quality guidelines.',
  },
  {
    role: 'Frontend Engineer',
    when: 'May — Aug 2024',
    where: 'ACSoftware S.r.l. · Italy',
    body:
      'Built React interfaces for e-commerce and e-learning platforms, integrated OAuth2/JWT authentication flows, and collaborated across design and backend teams to ship production features.',
  },
  {
    role: 'Graduate Assistant & Instructor',
    when: 'Jan — Aug 2024',
    where: 'Università della Calabria · Italy',
    body:
      'Led Python lab sessions, supported coursework in programming and algorithms, reviewed student code, and helped roughly fifty students debug and reason through technical assignments.',
  },
  {
    role: 'Software Engineer Intern',
    when: 'Dec 2023 — Aug 2024',
    where: 'R.B. Software Center S.r.l. · Italy',
    body:
      'Built backend services and APIs, wrote data-processing automation, contributed tests and CI/CD setup, and implemented security basics including authentication, encryption, and role-based access control.',
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
    "Selected for a year-long academic exchange from Università della Calabria to Fairmont State University in the US.",
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

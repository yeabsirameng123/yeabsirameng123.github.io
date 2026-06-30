import { useEffect, useMemo, useRef, useState } from 'react'

const segClasses = [
  { id: 'sky', label: 'Sky / open air', color: [76, 176, 255] },
  { id: 'vegetation', label: 'Vegetation', color: [74, 222, 128] },
  { id: 'building', label: 'Buildings / walls', color: [168, 139, 250] },
  { id: 'road', label: 'Road / floor plane', color: [148, 163, 184] },
  { id: 'person', label: 'Person / object', color: [251, 113, 133] },
  { id: 'water', label: 'Water / glass', color: [45, 212, 191] },
  { id: 'other', label: 'Other surfaces', color: [250, 204, 21] },
]

const segById = Object.fromEntries(segClasses.map((item) => [item.id, item]))

const ragDocs = [
  {
    id: 'D1',
    title: 'SegViz architecture',
    text:
      'SegViz accepts an image, runs a SegFormer semantic segmentation pipeline, blends a colored class mask over the photo, and reports scene coverage by class.',
  },
  {
    id: 'D2',
    title: 'RAG app architecture',
    text:
      'Ask My Docs chunks documents, embeds them with MiniLM, retrieves relevant passages with FAISS, and generates grounded answers with source citations.',
  },
  {
    id: 'D3',
    title: 'LLM evaluation dashboard',
    text:
      'The LLM evaluation dashboard scores prompt outputs for groundedness, instruction fit, citation use, risk control, failure categories, and hallucination triggers.',
  },
  {
    id: 'D4',
    title: 'Published segmentation research',
    text:
      'Yeabsira published 3D U-Net-Based Brain Tumor Semantic Segmentation Using a Modified Data Generator in the International Journal of Imaging Systems and Technology.',
  },
  {
    id: 'D5',
    title: 'Deployment constraint',
    text:
      'GitHub Pages is static, so Python, PyTorch, FAISS, and Gradio backends need a hosted runtime such as Hugging Face Spaces for true server-side inference.',
  },
]

const stopwords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 'i', 'in',
  'is', 'it', 'me', 'my', 'of', 'on', 'or', 'the', 'this', 'to', 'use', 'what',
  'with', 'you',
])

function tokens(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopwords.has(token))
}

function createSampleScene() {
  const canvas = document.createElement('canvas')
  canvas.width = 760
  canvas.height = 460
  const ctx = canvas.getContext('2d')
  const sky = ctx.createLinearGradient(0, 0, 0, 230)
  sky.addColorStop(0, '#64b5ff')
  sky.addColorStop(1, '#d9f0ff')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#7c8aa3'
  ctx.fillRect(80, 135, 120, 165)
  ctx.fillStyle = '#9b7ee8'
  ctx.fillRect(230, 92, 135, 208)
  ctx.fillStyle = '#6d7488'
  ctx.fillRect(410, 118, 148, 182)
  ctx.fillStyle = '#99a5b8'
  ctx.fillRect(586, 158, 86, 142)

  ctx.fillStyle = '#cbd5e1'
  for (let x = 98; x < 660; x += 34) {
    ctx.fillRect(x, 160 + ((x / 34) % 2) * 16, 15, 26)
    ctx.fillRect(x, 220, 15, 26)
  }

  ctx.fillStyle = '#42ba68'
  ctx.beginPath()
  ctx.arc(120, 306, 70, 0, Math.PI * 2)
  ctx.arc(204, 318, 62, 0, Math.PI * 2)
  ctx.arc(622, 298, 82, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#5b4634'
  ctx.fillRect(118, 300, 20, 90)
  ctx.fillRect(624, 292, 22, 98)

  const road = ctx.createLinearGradient(0, 310, 0, 460)
  road.addColorStop(0, '#8a93a2')
  road.addColorStop(1, '#394150')
  ctx.fillStyle = road
  ctx.beginPath()
  ctx.moveTo(0, 460)
  ctx.lineTo(265, 315)
  ctx.lineTo(506, 315)
  ctx.lineTo(760, 460)
  ctx.closePath()
  ctx.fill()

  ctx.strokeStyle = '#f8fafc'
  ctx.lineWidth = 8
  ctx.setLineDash([26, 22])
  ctx.beginPath()
  ctx.moveTo(385, 460)
  ctx.lineTo(388, 318)
  ctx.stroke()
  ctx.setLineDash([])

  ctx.fillStyle = '#f43f5e'
  ctx.beginPath()
  ctx.arc(493, 286, 18, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillRect(480, 305, 27, 64)
  ctx.fillStyle = '#1f2937'
  ctx.fillRect(477, 366, 10, 46)
  ctx.fillRect(502, 366, 10, 46)

  ctx.fillStyle = 'rgba(45, 212, 191, 0.5)'
  ctx.beginPath()
  ctx.ellipse(602, 402, 70, 18, -0.06, 0, Math.PI * 2)
  ctx.fill()

  return canvas
}

function drawImageToCanvas(image) {
  const maxWidth = 760
  const scale = Math.min(1, maxWidth / image.width)
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(image.width * scale))
  canvas.height = Math.max(1, Math.round(image.height * scale))
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas
}

function classifyPixel(r, g, b, x, y, width, height) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const sat = max - min
  const upper = y / height < 0.48
  const lower = y / height > 0.62

  if (r > 190 && g < 135 && b < 155) return 'person'
  if (g > r + 22 && g > b + 8 && g > 80) return 'vegetation'
  if (b > r + 28 && b > g - 6 && upper && max > 110) return 'sky'
  if (b > r + 18 && g > r + 8 && lower && sat > 20) return 'water'
  if (lower && Math.abs(r - g) < 26 && Math.abs(g - b) < 32 && max < 175) return 'road'
  if (!lower && max > 75 && Math.abs(r - g) < 72 && Math.abs(g - b) < 78) return 'building'
  if (x / width > 0.72 && y / height > 0.46 && g > 80) return 'vegetation'
  return 'other'
}

function renderSegmentation(baseCanvas, outputCanvas, alpha) {
  const width = baseCanvas.width
  const height = baseCanvas.height
  outputCanvas.width = width
  outputCanvas.height = height

  const source = baseCanvas.getContext('2d').getImageData(0, 0, width, height)
  const out = new ImageData(new Uint8ClampedArray(source.data), width, height)
  const counts = Object.fromEntries(segClasses.map((item) => [item.id, 0]))

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4
      const id = classifyPixel(source.data[i], source.data[i + 1], source.data[i + 2], x, y, width, height)
      const cls = segById[id]
      counts[id] += 1
      out.data[i] = Math.round(source.data[i] * (1 - alpha) + cls.color[0] * alpha)
      out.data[i + 1] = Math.round(source.data[i + 1] * (1 - alpha) + cls.color[1] * alpha)
      out.data[i + 2] = Math.round(source.data[i + 2] * (1 - alpha) + cls.color[2] * alpha)
    }
  }

  outputCanvas.getContext('2d').putImageData(out, 0, 0)
  const total = width * height
  return segClasses
    .map((item) => ({
      ...item,
      pct: Math.round((counts[item.id] / total) * 1000) / 10,
    }))
    .filter((item) => item.pct > 0.4)
    .sort((a, b) => b.pct - a.pct)
}

function SegVizDemo() {
  const canvasRef = useRef(null)
  const [baseCanvas, setBaseCanvas] = useState(null)
  const [alpha, setAlpha] = useState(0.58)
  const [coverage, setCoverage] = useState([])
  const [imageName, setImageName] = useState('sample street scene')

  useEffect(() => {
    setBaseCanvas(createSampleScene())
  }, [])

  useEffect(() => {
    if (!baseCanvas || !canvasRef.current) return
    setCoverage(renderSegmentation(baseCanvas, canvasRef.current, alpha))
  }, [baseCanvas, alpha])

  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      setBaseCanvas(drawImageToCanvas(image))
      setImageName(file.name)
      URL.revokeObjectURL(url)
    }
    image.src = url
  }

  return (
    <article className="demo-panel" id="segviz-demo">
      <div className="demo-title-row">
        <div>
          <span className="eval-kicker">Live computer vision demo</span>
          <h3>SegViz semantic segmentation</h3>
        </div>
        <span className="demo-chip">runs in browser</span>
      </div>
      <div className="segviz-stage">
        <canvas ref={canvasRef} aria-label="Segmentation overlay preview" />
      </div>
      <div className="demo-controls">
        <button type="button" className="mini-btn" onClick={() => { setBaseCanvas(createSampleScene()); setImageName('sample street scene') }}>
          Sample scene
        </button>
        <label className="file-btn">
          Upload photo
          <input type="file" accept="image/*" onChange={handleFile} />
        </label>
        <label className="range-row">
          <span>Overlay</span>
          <input type="range" min="0.15" max="0.9" step="0.05" value={alpha} onChange={(e) => setAlpha(Number(e.target.value))} />
          <b>{Math.round(alpha * 100)}%</b>
        </label>
      </div>
      <div className="demo-note">
        Previewing {imageName}. The downloadable Python app runs the SegFormer model; this portfolio view makes the overlay and coverage workflow live on GitHub Pages.
      </div>
      <div className="coverage-list">
        {coverage.map((item) => (
          <div className="coverage-row" key={item.id}>
            <span className="swatch" style={{ background: `rgb(${item.color.join(',')})` }} />
            <span>{item.label}</span>
            <i style={{ width: `${item.pct}%`, background: `rgb(${item.color.join(',')})` }} />
            <b>{item.pct}%</b>
          </div>
        ))}
      </div>
    </article>
  )
}

function scoreDocs(query, customNote) {
  const queryTokens = tokens(query)
  const customDocs = customNote.trim()
    ? [{ id: 'U1', title: 'User note', text: customNote.trim() }]
    : []
  const docs = [...ragDocs, ...customDocs]
  const scored = docs.map((doc) => {
    const body = tokens(`${doc.title} ${doc.text}`)
    const hitCount = queryTokens.reduce((sum, token) => sum + (body.includes(token) ? 1 : 0), 0)
    return {
      ...doc,
      score: queryTokens.length ? hitCount / queryTokens.length : 0,
      hits: hitCount,
    }
  })
  return scored.sort((a, b) => b.score - a.score).slice(0, 3)
}

function buildAnswer(query, hits) {
  const useful = hits.filter((hit) => hit.hits > 0)
  if (!query.trim()) {
    return 'Ask a question about the projects and the retriever will ground the answer in the evidence cards.'
  }
  if (!useful.length) {
    return 'I do not have enough evidence in the current notes to answer that safely. Add a note or ask about one of the portfolio projects.'
  }
  return useful
    .map((hit) => `${hit.text} [${hit.id}]`)
    .join(' ')
}

function RagDemo() {
  const [query, setQuery] = useState('How does the RAG app keep answers grounded?')
  const [customNote, setCustomNote] = useState('')
  const hits = useMemo(() => scoreDocs(query, customNote), [query, customNote])
  const answer = useMemo(() => buildAnswer(query, hits), [query, hits])
  const grounded = hits.filter((hit) => hit.hits > 0).length

  return (
    <article className="demo-panel" id="rag-demo">
      <div className="demo-title-row">
        <div>
          <span className="eval-kicker">Live retrieval demo</span>
          <h3>Ask My Docs RAG</h3>
        </div>
        <span className="demo-chip">{grounded ? 'grounded' : 'needs evidence'}</span>
      </div>
      <div className="rag-demo-grid">
        <div className="rag-inputs">
          <label>
            Question
            <textarea value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <label>
            Add a note to the index
            <textarea
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Paste a short note and ask about it."
            />
          </label>
          <div className="demo-controls">
            {['What does SegViz show?', 'What cannot GitHub Pages run?', 'Which project is published?'].map((item) => (
              <button type="button" className="mini-btn" key={item} onClick={() => setQuery(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="rag-output">
          <span className="eval-kicker">Grounded answer</span>
          <p>{answer}</p>
          <div className="evidence-stack">
            {hits.map((hit) => (
              <div className={`evidence-hit${hit.hits ? ' active' : ''}`} key={hit.id}>
                <div>
                  <b>{hit.id}</b>
                  <span>{hit.title}</span>
                </div>
                <i style={{ width: `${Math.round(hit.score * 100)}%` }} />
                <small>{Math.round(hit.score * 100)}% query overlap</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function LiveProjectDemos() {
  return (
    <section id="live-demos" className="live-demos">
      <div className="wrap sec">
        <div className="sec-head reveal">
          <span className="ix">03</span><h2>Live project demos</h2>
          <span className="sub">Clickable demos first. Source downloads stay as proof, not the whole experience.</span>
        </div>
        <div className="demo-grid reveal">
          <SegVizDemo />
          <RagDemo />
        </div>
      </div>
    </section>
  )
}

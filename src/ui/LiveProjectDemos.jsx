import { useEffect, useRef, useState } from 'react'

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

const groundedSpaceUrl = 'https://yeabm2-grounded-rag.hf.space'
const groundedRepoUrl = 'https://github.com/yeabsirameng123/grounded-rag'

const groundedSignals = [
  { label: 'Retrieval', value: 'source-backed answers' },
  { label: 'Faithfulness', value: 'claim-level checks' },
  { label: 'Demo test', value: 'catches a fabricated stat' },
]

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
        <span className="demo-chip">on-page app</span>
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
        Previewing {imageName}. Upload a photo, adjust the overlay opacity, and inspect the pixel-level scene breakdown directly in the page.
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

function GroundedDemo() {
  const [loaded, setLoaded] = useState(false)

  return (
    <article className="demo-panel grounded-demo" id="grounded-demo">
      <div className="demo-title-row">
        <div>
          <span className="eval-kicker">Live self-evaluating RAG demo</span>
          <h3>Grounded - self-evaluating RAG</h3>
        </div>
        <span className="demo-chip">live Space</span>
      </div>
      <p className="grounded-copy">
        Retrieval-augmented question answering that checks its own work: it answers from retrieved sources with citations,
        breaks the answer into individual claims, verifies each claim against the sources, and flags anything unsupported.
      </p>
      <div className="grounded-signals">
        {groundedSignals.map((signal) => (
          <div className="evidence-hit active" key={signal.label}>
            <div>
              <b>{signal.label.slice(0, 2).toUpperCase()}</b>
              <span>{signal.label}</span>
            </div>
            <small>{signal.value}</small>
          </div>
        ))}
      </div>
      <div className="grounded-stage">
        {loaded ? (
          <iframe
            title="Grounded live RAG demo"
            src={groundedSpaceUrl}
            loading="lazy"
            allow="clipboard-read; clipboard-write"
          />
        ) : (
          <div className="grounded-poster" data-src={groundedSpaceUrl}>
            <div>
              <span className="eval-kicker">Ready to launch</span>
              <strong>Open the live Gradio app inside this portfolio.</strong>
              <small>Hit "Load worked example" and watch it catch the fabricated "about 80%" claim.</small>
            </div>
            <button type="button" className="btn btn-grad" onClick={() => setLoaded(true)}>
              Launch live demo <span className="ar">↗</span>
            </button>
            <span className="hint">First start can take about 30 seconds on the free Hugging Face tier.</span>
          </div>
        )}
      </div>
      <div className="demo-foot">
        <a className="plink" href={groundedSpaceUrl} target="_blank" rel="noopener">Open in a new tab <span className="ar">↗</span></a>
        <a className="plink" href={groundedRepoUrl} target="_blank" rel="noopener">View code <span className="ar">↗</span></a>
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
          <span className="sub">A live app I built, embedded right here - ask it something and watch it check its own answer.</span>
        </div>
        <div className="demo-grid single-demo reveal">
          {/* <SegVizDemo /> */}
          <GroundedDemo />
        </div>
      </div>
    </section>
  )
}

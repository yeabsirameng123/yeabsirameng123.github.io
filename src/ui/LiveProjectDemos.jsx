import { useState } from 'react'

const segvizSpaceUrl = 'https://yeabm2-segviz.hf.space'
const groundedSpaceUrl = 'https://yeabm2-grounded-rag.hf.space'

const segvizSignals = [
  { label: 'Model', value: 'SegFormer-B0 transformer' },
  { label: 'Output', value: 'overlay, mask, coverage' },
  { label: 'Runtime', value: 'free CPU Space, no keys' },
]

const groundedSignals = [
  { label: 'Retrieval', value: 'source-backed answers' },
  { label: 'Faithfulness', value: 'claim-level checks' },
  { label: 'Demo test', value: 'catches a fabricated stat' },
]

function SignalGrid({ signals }) {
  return (
    <div className="grounded-signals">
      {signals.map((signal) => (
        <div className="evidence-hit active" key={signal.label}>
          <div>
            <b>{signal.label.slice(0, 2).toUpperCase()}</b>
            <span>{signal.label}</span>
          </div>
          <small>{signal.value}</small>
        </div>
      ))}
    </div>
  )
}

function LiveSpaceDemo({
  id,
  className,
  kicker,
  title,
  chip,
  copy,
  signals,
  url,
  frameTitle,
  posterTitle,
  posterText,
  coldStartText,
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <article className={`demo-panel grounded-demo ${className}`} id={id}>
      <div className="demo-title-row">
        <div>
          <span className="eval-kicker">{kicker}</span>
          <h3>{title}</h3>
        </div>
        <span className="demo-chip">{chip}</span>
      </div>
      <p className="grounded-copy">{copy}</p>
      <SignalGrid signals={signals} />
      <div className="grounded-stage">
        {loaded ? (
          <iframe
            title={frameTitle}
            src={url}
            loading="lazy"
            allow="clipboard-read; clipboard-write"
          />
        ) : (
          <div className="grounded-poster" data-src={url}>
            <div>
              <span className="eval-kicker">Ready to launch</span>
              <strong>{posterTitle}</strong>
              <small>{posterText}</small>
            </div>
            <button type="button" className="btn btn-grad" onClick={() => setLoaded(true)}>
              Launch live demo <span className="ar">-&gt;</span>
            </button>
            <span className="hint">{coldStartText}</span>
          </div>
        )}
      </div>
      <div className="demo-foot">
        <a className="plink" href={url} target="_blank" rel="noopener">Open in a new tab <span className="ar">-&gt;</span></a>
      </div>
    </article>
  )
}

function SegVizLiveDemo() {
  return (
    <LiveSpaceDemo
      id="segviz-demo"
      className="segviz-live-demo"
      kicker="Live computer vision demo"
      title="SegViz - semantic segmentation"
      chip="live Space"
      copy="Upload any scene photo, or load the built-in sample. A SegFormer transformer labels every pixel, returns a blended overlay and standalone mask, then ranks the scene by class coverage."
      signals={segvizSignals}
      url={segvizSpaceUrl}
      frameTitle="SegViz live semantic segmentation demo"
      posterTitle="Run real semantic segmentation inside this portfolio."
      posterText="Launch the Space, load the sample scene, or upload a photo to see the model produce a pixel-level mask and coverage breakdown."
      coldStartText="First start can take about 30 seconds on the free Hugging Face tier."
    />
  )
}

function GroundedDemo() {
  return (
    <LiveSpaceDemo
      id="grounded-demo"
      className="grounded-rag-demo"
      kicker="Live self-evaluating RAG demo"
      title="Grounded - self-evaluating RAG"
      chip="live Space"
      copy="Retrieval-augmented question answering that checks its own work: it answers from retrieved sources with citations, breaks the answer into individual claims, verifies each claim, and flags anything unsupported."
      signals={groundedSignals}
      url={groundedSpaceUrl}
      frameTitle="Grounded live RAG demo"
      posterTitle="Inspect a RAG answer that audits its own claims."
      posterText='Launch the app and hit "Load worked example" to watch it catch the fabricated "about 80%" claim.'
      coldStartText="First start can take about 30 seconds on the free Hugging Face tier."
    />
  )
}

export default function LiveProjectDemos() {
  return (
    <section id="live-demos" className="live-demos">
      <div className="wrap sec">
        <div className="sec-head reveal">
          <span className="ix">03</span><h2>Live project demos</h2>
          <span className="sub">Two live AI systems: upload a photo for transformer segmentation, then inspect a RAG answer that checks its own claims.</span>
        </div>
        <div className="demo-grid reveal">
          <SegVizLiveDemo />
          <GroundedDemo />
        </div>
      </div>
    </section>
  )
}

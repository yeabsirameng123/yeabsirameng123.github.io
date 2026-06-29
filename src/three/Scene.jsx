import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

const COUNT = 15000
const RADIUS = 1.45

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPR;
uniform float uScroll;
uniform vec2 uMouse;
varying float vN;

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+1.0*C.xxx;
  vec3 x2=x0-i2+2.0*C.xxx;
  vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(
        i.z+vec4(0.0,i1.z,i2.z,1.0))
      + i.y+vec4(0.0,i1.y,i2.y,1.0))
      + i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

void main(){
  vec3 pos = position;
  float n  = snoise(pos*1.15 + vec3(0.0,0.0,uTime*0.16));
  float n2 = snoise(pos*2.6  + vec3(uTime*0.12));
  float disp = n*0.30 + n2*0.09;
  float mAmt = length(uMouse);
  disp += mAmt*0.10*snoise(pos*3.0 + vec3(uMouse*2.0,0.0));
  disp += uScroll*0.28;
  pos += normalize(position)*disp;
  vN = disp;
  vec4 mv = modelViewMatrix*vec4(pos,1.0);
  gl_PointSize = uSize*uPR*(1.0+n*0.6)/(-mv.z);
  gl_Position = projectionMatrix*mv;
}
`

const fragmentShader = /* glsl */ `
precision mediump float;
uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3;
varying float vN;
void main(){
  vec2 uv = gl_PointCoord-0.5;
  float d = length(uv);
  if(d>0.5) discard;
  float a = smoothstep(0.5,0.0,d);
  float t = clamp(vN*1.7+0.5,0.0,1.0);
  vec3 col = mix(uC1,uC2,t);
  col = mix(col,uC3,smoothstep(0.55,1.0,t));
  gl_FragColor = vec4(col,a*0.92);
}
`

function Orb({ scrollRef }) {
  const group = useRef()
  const mouse = useRef(new THREE.Vector2(0, 0))
  const mLerp = useRef(new THREE.Vector2(0, 0))
  const spin = useRef(0)
  const reduce = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const rad = Math.sqrt(Math.max(0, 1 - y * y))
      const th = golden * i
      arr[i * 3] = Math.cos(th) * rad * RADIUS
      arr[i * 3 + 1] = y * RADIUS
      arr[i * 3 + 2] = Math.sin(th) * rad * RADIUS
    }
    return arr
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 17.0 },
      uPR: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uC1: { value: new THREE.Color('#8B6CFF') },
      uC2: { value: new THREE.Color('#5C8BFF') },
      uC3: { value: new THREE.Color('#45D7E6') },
    }),
    []
  )

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state) => {
    const m = group.current
    if (!m) return
    if (reduce.current) {
      uniforms.uScroll.value = scrollRef.current || 0
      return
    }
    mLerp.current.x += (mouse.current.x - mLerp.current.x) * 0.05
    mLerp.current.y += (mouse.current.y - mLerp.current.y) * 0.05
    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uMouse.value.set(mLerp.current.x, mLerp.current.y)
    uniforms.uScroll.value = scrollRef.current || 0
    spin.current += 0.0015
    m.rotation.y = spin.current + mLerp.current.x * 0.45
    m.rotation.x = mLerp.current.y * 0.3
  })

  return (
    <points ref={group}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Rig({ scrollRef }) {
  // gentle offset so the orb sits right-of-centre on wide screens
  const ref = useRef()
  useFrame(({ viewport }) => {
    if (!ref.current) return
    const wide = viewport.width > viewport.height
    ref.current.position.x += ((wide ? 0.75 : 0) - ref.current.position.x) * 0.1
    ref.current.position.y += ((wide ? 0 : 0.55) - ref.current.position.y) * 0.1
  })
  return (
    <group ref={ref}>
      <Orb scrollRef={scrollRef} />
    </group>
  )
}

export default function Scene({ scrollRef }) {
  return (
    <Canvas
      className="webgl"
      camera={{ position: [0, 0, 3.5], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      <Rig scrollRef={scrollRef} />
    </Canvas>
  )
}

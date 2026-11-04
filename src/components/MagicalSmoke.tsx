import { useEffect, useRef } from 'react'

interface MagicalSmokeProps {
  active: boolean
  onSmokeMidpoint?: () => void
  onSmokeEnd?: () => void
}

const VERT_SRC = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_pos + 1.0) * 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const FRAG_SRC = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec2 v_uv;
  uniform vec2 u_res;
  uniform float u_progress; // 0.0 -> 1.0
  uniform float u_time;

  // Hash without sine
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  // Simplex-style 2D gradient noise
  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Multi-octave Fractal Brownian Motion
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.52;
    mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
    for (int i = 0; i < 5; ++i) {
      v += a * (0.5 + 0.5 * gnoise(p));
      p = rot * p * 2.05 + vec2(2.3, 1.7);
      a *= 0.48;
    }
    return v;
  }

  void main() {
    vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
    vec2 uv = (v_uv - 0.5) * aspect;
    float dist = length(uv);

    // Dynamic swirling domain warping for genuine fluid mist curls
    float t = u_time * 2.2;
    vec2 q = vec2(
      fbm(uv * 2.8 + vec2(t * 0.4, -t * 0.3)),
      fbm(uv * 2.8 + vec2(-t * 0.3, t * 0.5))
    );

    vec2 r = vec2(
      fbm(uv * 3.2 + 3.5 * q + vec2(1.7, 9.2) + t * 0.2),
      fbm(uv * 3.2 + 3.5 * q + vec2(8.3, 2.8) - t * 0.25)
    );

    float f = fbm(uv * 2.6 + 4.2 * r);

    // Apparition envelope:
    // 0.0 -> 0.38: Fast turbulent in-rush billow
    // 0.38 -> 0.45: Dense opacity plateau (view swap occurs here)
    // 0.45 -> 1.0: Fast organic erosion dissipation (wisps shred apart cleanly)
    float inProg = smoothstep(0.0, 0.38, u_progress);
    
    // Core expansion ring
    float expansion = inProg * 1.8;
    float coreMask = smoothstep(expansion + 0.6, expansion - 0.3, dist);

    // Volumetric smoke density combining FBM filaments and expanding core
    float density = f * 1.35 * (0.35 + 0.65 * coreMask);

    // Background veil during peak transition
    float veil = 0.0;
    if (u_progress < 0.42) {
      veil = smoothstep(0.05, 0.38, u_progress) * 0.94;
    } else {
      veil = (1.0 - smoothstep(0.42, 0.85, u_progress)) * 0.94;
    }

    // Fast, organic dissipation (erosion thresholding)
    float alpha = 0.0;
    if (u_progress <= 0.40) {
      alpha = clamp(density * inProg * 1.5 + veil * 0.7, 0.0, 1.0);
    } else {
      // Rapid erosion: lower density wisps evaporate first, then main curls shred
      float fade = (u_progress - 0.40) / 0.60;
      float threshold = fade * 1.1;
      float eroded = smoothstep(threshold, threshold + 0.3, density);
      float overallFade = 1.0 - smoothstep(0.0, 0.88, fade);
      alpha = clamp(eroded * overallFade * 1.3 + veil * overallFade, 0.0, 1.0);
    }

    if (alpha <= 0.005) {
      discard;
    }

    // Color palette: Ethereal Harry Potter apparition
    // Deep dark obsidian core, silvery mist body, and delicate golden Lumos rim light
    vec3 colObsidian = vec3(0.04, 0.05, 0.08);
    vec3 colSilverMist = vec3(0.76, 0.84, 0.94);
    vec3 colLumosGold = vec3(0.92, 0.78, 0.38);

    vec3 col = mix(colObsidian, colSilverMist, smoothstep(0.28, 0.75, f));
    // Add warm golden edge highlight to turbulent fringes
    float goldRim = smoothstep(0.55, 0.85, r.x) * smoothstep(0.3, 0.7, q.y);
    col = mix(col, colLumosGold, goldRim * 0.45);

    gl_FragColor = vec4(col, alpha);
  }
`

/**
 * WebGL-Powered Cinematic Apparition Smoke:
 * Uses domain-warped Fractal Brownian Motion (FBM) with organic erosion dissipation.
 * Snappy, fluid, realistic, and fast fadeout.
 */
export default function MagicalSmoke({
  active,
  onSmokeMidpoint,
  onSmokeEnd,
}: MagicalSmokeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  const midpointCbRef = useRef(onSmokeMidpoint)
  midpointCbRef.current = onSmokeMidpoint
  const endCbRef = useRef(onSmokeEnd)
  endCbRef.current = onSmokeEnd

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Initialize WebGL context
    const gl = (canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    }) ||
      canvas.getContext('experimental-webgl', {
        alpha: true,
      })) as WebGLRenderingContext | null

    if (!gl) {
      // Fallback: fast timeout if WebGL is unavailable
      if (midpointCbRef.current) midpointCbRef.current()
      if (endCbRef.current) endCbRef.current()
      return
    }

    // Compile shaders
    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }

    const vertShader = createShader(gl.VERTEX_SHADER, VERT_SRC)
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAG_SRC)
    const program = gl.createProgram()!
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Fullscreen quad buffer
    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )

    const aPosLoc = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPosLoc)
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uResLoc = gl.getUniformLocation(program, 'u_res')
    const uProgLoc = gl.getUniformLocation(program, 'u_progress')
    const uTimeLoc = gl.getUniformLocation(program, 'u_time')

    // Viewport sizing
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    const w = Math.round(window.innerWidth * dpr)
    const h = Math.round(window.innerHeight * dpr)
    canvas.width = w
    canvas.height = h
    gl.viewport(0, 0, w, h)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    let frame = 0
    // Total frames = 34 (~550ms at 60fps) - snappy, elegant & responsive
    const totalFrames = 34
    let midpointTriggered = false
    const startTime = performance.now()

    const render = () => {
      frame++
      const progress = Math.min(frame / totalFrames, 1.0)
      const elapsedTime = (performance.now() - startTime) * 0.001

      // Midpoint: trigger at ~210ms (frame 13) when screen is shrouded
      if (frame >= 13 && !midpointTriggered) {
        midpointTriggered = true
        if (midpointCbRef.current) {
          midpointCbRef.current()
        }
      }

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(program)
      gl.uniform2f(uResLoc, w, h)
      gl.uniform1f(uProgLoc, progress)
      gl.uniform1f(uTimeLoc, elapsedTime)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      if (frame < totalFrames) {
        animRef.current = requestAnimationFrame(render)
      } else {
        gl.clear(gl.COLOR_BUFFER_BIT)
        if (endCbRef.current) {
          endCbRef.current()
        }
      }
    }

    render()

    return () => {
      cancelAnimationFrame(animRef.current)
      gl.deleteBuffer(posBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertShader)
      gl.deleteShader(fragShader)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  )
}

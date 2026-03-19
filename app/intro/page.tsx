"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

/* ─── Palette ────────────────────────────────────────────────────────────── */
const PAL = {
  bg:       "#f5f0e8",
  textDeep: "#1e0f05",
  textMid:  "#6b4c2a",
  textOver: "#8b6a3e",
  btnFill:  "#3d2510",
  btnText:  "#f5f0e8",
  brass:    "#c49a28",
  gearDark: 0x2e1a0a,
  gearBrass: 0xc49a28,
};

/* ─── Gear definitions ───────────────────────────────────────────────────── */
const GEARS = [
  { r: 1.0,  teeth: 24, x:  0,    y:  0,    spd: 1,      dir:  1 },
  { r: 0.64, teeth: 16, x: -1.62, y:  0.05, spd: 1.5625, dir: -1 },
  { r: 0.64, teeth: 16, x:  1.62, y:  0.05, spd: 1.5625, dir: -1 },
  { r: 0.41, teeth: 10, x:  1.15, y:  1.12, spd: 2.44,   dir:  1 },
  { r: 0.41, teeth: 10, x: -1.15, y: -1.12, spd: 2.44,   dir:  1 },
];

/* ─── Gear geometry builder ──────────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildGear(THREE: any, def: typeof GEARS[0]) {
  const group = new THREE.Group();
  const { r, teeth } = def;

  const discMat = new THREE.MeshStandardMaterial({
    color: PAL.gearDark, metalness: 0.6, roughness: 0.55,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: PAL.gearBrass, metalness: 0.75, roughness: 0.3,
  });

  // Main disc
  group.add(new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.28, 64), discMat));

  // Bevel rings
  const bevelGeo = new THREE.TorusGeometry(r, 0.03, 8, 64);
  const bT = new THREE.Mesh(bevelGeo, brassMat);
  bT.rotation.x = Math.PI / 2; bT.position.y = 0.14;
  const bB = bT.clone(); bB.position.y = -0.14;
  group.add(bT, bB);

  // Hub
  group.add(new THREE.Mesh(
    new THREE.CylinderGeometry(r * 0.22, r * 0.22, 0.34, 32), brassMat,
  ));

  // Inner ring
  const ir = new THREE.Mesh(new THREE.TorusGeometry(r * 0.5, 0.02, 6, 48), brassMat);
  ir.rotation.x = Math.PI / 2;
  group.add(ir);

  // Spokes
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const s = new THREE.Mesh(new THREE.BoxGeometry(r * 0.6, 0.08, 0.09), discMat);
    s.rotation.y = a;
    s.position.set(Math.cos(a) * r * 0.36, 0, Math.sin(a) * r * 0.36);
    group.add(s);
  }

  // Helical teeth
  const toothW = (2 * Math.PI * r) / teeth * 0.55;
  const helixAmt = 0.015;
  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2;
    const helixY = (i - teeth / 2) * helixAmt;
    const tooth = new THREE.Mesh(new THREE.BoxGeometry(toothW, 0.26, 0.22), brassMat);
    tooth.position.set(
      Math.cos(angle) * (r + 0.09),
      helixY,
      Math.sin(angle) * (r + 0.09),
    );
    tooth.rotation.y = -angle;
    group.add(tooth);
  }

  return group;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function IntroPage() {
  const router    = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const threeRef  = useRef<any>(null);

  // Mount guard — prevents hydration mismatch from state-dependent rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [phase,   setPhase]   = useState<"idle"|"p1"|"p2"|"p3"|"p4"|"done">("idle");
  const [label,   setLabel]   = useState("ENTER");
  const [vibrate, setVibrate] = useState(false);
  const [doors,   setDoors]   = useState(false);
  const [seamOn,  setSeamOn]  = useState(false);

  const phaseRef = useRef("idle");
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  /* ── Three.js init ─────────────────────────────────────────────────────── */
  const initThree = useCallback(() => {
    if (!canvasRef.current || threeRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const THREE = (window as any).THREE;
    if (!THREE) return;

    const container = canvasRef.current;
    const W = container.clientWidth || 560;
    const H = container.clientHeight || 340;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 1.8, 7.5);
    camera.lookAt(0, 0, 0);

    // Warm editorial lighting
    const dir = new THREE.DirectionalLight(0xfff8e8, 2.2);
    dir.position.set(-4, 5, 6);
    dir.castShadow = true;
    scene.add(dir);
    scene.add(new THREE.AmbientLight(0xffe0a0, 0.4));
    const fill = new THREE.DirectionalLight(0xffd090, 0.6);
    fill.position.set(4, -2, 3);
    scene.add(fill);

    // Shadow plane
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.12 }),
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Build gears
    const gears: unknown[] = [];
    GEARS.forEach((def) => {
      const g = buildGear(THREE, def);
      g.position.set(def.x * 1.05, def.y * 1.05, 0);
      g.rotation.z = 0.21;
      g.rotation.x = 0.14;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      g.traverse((child: any) => {
        if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; }
      });
      scene.add(g);
      gears.push(g);
    });

    const speeds = GEARS.map(() => 0);
    const ref = { renderer, scene, camera, gears, speeds, spinning: false };
    threeRef.current = ref;

    const animate = () => {
      requestAnimationFrame(animate);
      GEARS.forEach((def, i) => {
        const target = ref.spinning ? def.spd * def.dir * 0.012 : 0;
        ref.speeds[i] += (target - ref.speeds[i]) * 0.05;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ref.gears[i] as any).rotation.y += ref.speeds[i];
      });
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nW = container.clientWidth, nH = container.clientHeight;
      if (!nW || !nH) return;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener("resize", onResize);
  }, []);

  /* ── Click → 5-phase sequence ──────────────────────────────────────────── */
  const handleEnter = useCallback(() => {
    if (phaseRef.current !== "idle") return;

    // Phase 1: button press
    setPhase("p1");

    setTimeout(() => {
      // Phase 2: gears spin up
      setPhase("p2");
      if (threeRef.current) threeRef.current.spinning = true;

      setTimeout(() => {
        // Phase 3: full speed + vibration + typewriter
        setPhase("p3");
        setVibrate(true);
        const WORD = "INITIALISING...";
        let i = 0;
        const tw = setInterval(() => {
          i++;
          setLabel(WORD.slice(0, i));
          if (i >= WORD.length) clearInterval(tw);
        }, 72);

        setTimeout(() => {
          // Phase 4: door split
          setPhase("p4");
          setVibrate(false);
          setSeamOn(true);
          setTimeout(() => setDoors(true), 80); // slight delay so seam glows first

          setTimeout(() => {
            setSeamOn(false);
            setPhase("done");
            localStorage.setItem("intro_seen", "1");
            router.push("/");
          }, 780);
        }, 1100);
      }, 950);
    }, 350);
  }, [router]);

  /* ── Skip ──────────────────────────────────────────────────────────────── */
  const handleSkip = useCallback(() => {
    localStorage.setItem("intro_seen", "1");
    router.push("/");
  }, [router]);

  /* ── Render ────────────────────────────────────────────────────────────── */

  // Avoid SSR/hydration mismatches by rendering a minimal shell until mounted
  if (!mounted) {
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: PAL.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <p style={{
          fontFamily: "Georgia, serif", fontSize: "11px",
          letterSpacing: "0.18em", color: PAL.textOver, opacity: 0.5,
        }}>
          LOADING ENGINE…
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
        strategy="afterInteractive"
        onLoad={initThree}
      />

      {/* Root container */}
      <div style={{
        position: "fixed", inset: 0, overflow: "hidden",
        background: PAL.bg,
        fontFamily: "var(--font-playfair),'Playfair Display',Georgia,serif",
      }}>

        {/* Paper noise */}
        <svg aria-hidden width="100%" height="100%" style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        }}>
          <filter id="pn">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#pn)" opacity="0.04" fill="#7a5a38"/>
        </svg>

        {/* Dot grid texture */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle at 1px 1px,rgba(42,26,14,0.07) 1px,transparent 0)",
          backgroundSize: "24px 24px",
        }}/>

        {/* ── ENGINEERING DRAWING LAYER (z:2) ─────────────────────────────── */}
        {/* Hidden on mobile via .drw-layer class below */}
        <svg
          className="drw-layer"
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%",
            zIndex: 2, pointerEvents: "none",
            overflow: "visible",
          }}
        >
          {/* ── Shared defs ── */}
          <defs>
            {/* Arrowhead marker */}
            <marker id="arr" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
              <polygon points="0,0 5,2.5 0,5" fill="#8b6a3e" opacity="0.11"/>
            </marker>
            <marker id="arr-l" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto-start-reverse">
              <polygon points="0,0 5,2.5 0,5" fill="#8b6a3e" opacity="0.11"/>
            </marker>
            {/* Centreline dash pattern */}
            <style>{`
              @media (max-width: 768px) { .drw-layer { display: none; } }
            `}</style>
          </defs>

          {/* ══════════════════════════════════════════════
              1. CONSTRUCTION LINES — horizontal & vertical
              ══════════════════════════════════════════════ */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.08">
            {/* Horizontals — irregular spacing, not grid */}
            <line x1="0" y1="118" x2="1440" y2="118"/>
            <line x1="0" y1="247" x2="1440" y2="247"/>
            <line x1="0" y1="390" x2="1440" y2="390"/>
            <line x1="0" y1="512" x2="1440" y2="512"/>
            <line x1="0" y1="668" x2="1440" y2="668"/>
            <line x1="0" y1="790" x2="1440" y2="790"/>
            {/* Verticals */}
            <line x1="142" y1="0" x2="142" y2="900"/>
            <line x1="318" y1="0" x2="318" y2="900"/>
            <line x1="560" y1="0" x2="560" y2="900"/>
            <line x1="880" y1="0" x2="880" y2="900"/>
            <line x1="1122" y1="0" x2="1122" y2="900"/>
            <line x1="1298" y1="0" x2="1298" y2="900"/>
          </g>

          {/* ══════════════════════════════════════
              2. DIAGONAL EXTENSION LINES — corners
              ══════════════════════════════════════ */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.07">
            {/* Top-left corner, ~30° */}
            <line x1="0" y1="60"  x2="260" y2="60"/>
            <line x1="60" y1="0"  x2="60"  y2="200"/>
            <line x1="0" y1="0"   x2="280" y2="162"/>   {/* 30° */}
            <line x1="0" y1="0"   x2="162" y2="281"/>   {/* 60° */}
            {/* Top-right corner */}
            <line x1="1440" y1="0"   x2="1160" y2="174"/>
            <line x1="1440" y1="0"   x2="1265" y2="310"/>
            {/* Bottom-left corner */}
            <line x1="0"    y1="900" x2="220"  y2="718"/>
            <line x1="0"    y1="900" x2="155"  y2="640"/>
            {/* Bottom-right corner */}
            <line x1="1440" y1="900" x2="1200" y2="730"/>
            <line x1="1440" y1="900" x2="1282" y2="620"/>
            {/* Mid-edge diagonals */}
            <line x1="0"    y1="450" x2="140"  y2="330"/>
            <line x1="0"    y1="450" x2="140"  y2="570"/>
            <line x1="1440" y1="450" x2="1300" y2="340"/>
            <line x1="1440" y1="450" x2="1300" y2="560"/>
          </g>

          {/* ══════════════════════════════════════════════
              3. DIMENSION ANNOTATIONS
              ══════════════════════════════════════════════ */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none"
             markerEnd="url(#arr)" markerStart="url(#arr-l)" opacity="0.11">

            {/* Dim 1 — top-left, horizontal */}
            <line x1="42" y1="88" x2="198" y2="88"/>
          </g>
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.09">
            <line x1="42"  y1="82" x2="42"  y2="94"/>
            <line x1="198" y1="82" x2="198" y2="94"/>
          </g>
          <text x="120" y="82" textAnchor="middle" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">Ø 220</text>

          {/* Dim 2 — top-left, vertical */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.09">
            <line x1="62" y1="42"  x2="62"  y2="185"/>
            <line x1="56" y1="42"  x2="68"  y2="42"/>
            <line x1="56" y1="185" x2="68"  y2="185"/>
          </g>
          <text x="74" y="118" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">R 68.5</text>

          {/* Dim 3 — top area, horizontal long */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.08">
            <line x1="320" y1="34" x2="560" y2="34"/>
            <line x1="320" y1="28" x2="320" y2="40"/>
            <line x1="560" y1="28" x2="560" y2="40"/>
          </g>
          <text x="440" y="28" textAnchor="middle" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">PCD 180</text>

          {/* Dim 4 — top-right */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.09">
            <line x1="1100" y1="52" x2="1298" y2="52"/>
            <line x1="1100" y1="46" x2="1100" y2="58"/>
            <line x1="1298" y1="46" x2="1298" y2="58"/>
          </g>
          <text x="1199" y="46" textAnchor="middle" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">M4 × 0.7</text>

          {/* Dim 5 — right edge, vertical */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.08">
            <line x1="1390" y1="200" x2="1390" y2="390"/>
            <line x1="1384" y1="200" x2="1396" y2="200"/>
            <line x1="1384" y1="390" x2="1396" y2="390"/>
          </g>
          <text x="1404" y="300" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12" writingMode="tb">26T</text>

          {/* Dim 6 — right-mid */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.09">
            <line x1="1200" y1="512" x2="1380" y2="512"/>
            <line x1="1200" y1="506" x2="1200" y2="518"/>
            <line x1="1380" y1="506" x2="1380" y2="518"/>
          </g>
          <text x="1290" y="506" textAnchor="middle" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">PITCH 8mm</text>

          {/* Dim 7 — bottom-right */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.09">
            <line x1="1100" y1="852" x2="1380" y2="852"/>
            <line x1="1100" y1="846" x2="1100" y2="858"/>
            <line x1="1380" y1="846" x2="1380" y2="858"/>
          </g>
          <text x="1240" y="846" textAnchor="middle" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">MODULE 2.5</text>

          {/* Dim 8 — bottom-left vertical */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.08">
            <line x1="52" y1="668" x2="52" y2="790"/>
            <line x1="46" y1="668" x2="58" y2="668"/>
            <line x1="46" y1="790" x2="58" y2="790"/>
          </g>
          <text x="64" y="734" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">⌀ 14.0</text>

          {/* Dim 9 — bottom-left horizontal */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.09">
            <line x1="80" y1="862" x2="310" y2="862"/>
            <line x1="80"  y1="856" x2="80"  y2="868"/>
            <line x1="310" y1="856" x2="310" y2="868"/>
          </g>
          <text x="195" y="856" textAnchor="middle" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">±0.05</text>

          {/* Dim 10 — left-mid */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.08">
            <line x1="48" y1="390" x2="48" y2="512"/>
            <line x1="42" y1="390" x2="54" y2="390"/>
            <line x1="42" y1="512" x2="54" y2="512"/>
          </g>
          <text x="62" y="456" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">REF</text>

          {/* Dim 11 — upper-mid angled leader */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.08">
            <line x1="380" y1="128" x2="470" y2="80"/>
            <line x1="470" y1="80"  x2="560" y2="80"/>
          </g>
          <text x="472" y="74" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">16T</text>

          {/* Dim 12 — lower-right leader */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.08">
            <line x1="1060" y1="770" x2="1100" y2="730"/>
            <line x1="1100" y1="730" x2="1200" y2="730"/>
          </g>
          <text x="1202" y="726" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.12">Ø 110</text>

          {/* Dim 13 — mid-top arc callout */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.07">
            <path d="M 720 60 A 80 80 0 0 1 840 60"/>
            <line x1="780" y1="60" x2="780" y2="30"/>
            <line x1="760" y1="30" x2="820" y2="30"/>
          </g>
          <text x="790" y="25" fontFamily="monospace" fontSize="9"
            fill="#8b6a3e" opacity="0.11">R 80</text>

          {/* Dim 14 — bottom partial arc */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.07">
            <path d="M 460 880 A 60 60 0 0 0 580 880"/>
          </g>
          <text x="520" y="898" textAnchor="middle" fontFamily="monospace" fontSize="8"
            fill="#8b6a3e" opacity="0.10">SR 60</text>

          {/* ══════════════════════════════════════════
              4. 2D FLAT GEAR OUTLINES
              ══════════════════════════════════════════ */}

          {/* Gear A — large, bottom-left, r=90 */}
          <g transform="translate(130,760)" stroke="#8b6a3e" fill="none">
            {/* Dedendum */}
            <circle r="72" strokeWidth="0.6" opacity="0.09"/>
            {/* Addendum */}
            <circle r="90" strokeWidth="0.6" opacity="0.09"/>
            {/* Pitch circle */}
            <circle r="81" strokeWidth="0.5" opacity="0.07" strokeDasharray="8 3 2 3"/>
            {/* Bore */}
            <circle r="18" strokeWidth="0.6" opacity="0.09"/>
            {/* Centrelines */}
            <line x1="-95" y1="0" x2="95" y2="0" strokeWidth="0.4" opacity="0.07" strokeDasharray="10 4 2 4"/>
            <line x1="0" y1="-95" x2="0" y2="95" strokeWidth="0.4" opacity="0.07" strokeDasharray="10 4 2 4"/>
            {/* Teeth — 20 teeth */}
            {Array.from({length: 20}).map((_, i) => {
              const tw = (2 * Math.PI * 81) / 20 * 0.45;
              return (
                <rect
                  key={i}
                  x={-tw / 2} y={-90} width={tw} height={18}
                  transform={`rotate(${(i / 20) * 360})`}
                  strokeWidth="0.6" opacity="0.09"
                />
              );
            })}
          </g>

          {/* Gear B — medium, top-right, r=55 */}
          <g transform="translate(1310,120)" stroke="#8b6a3e" fill="none">
            <circle r="44" strokeWidth="0.6" opacity="0.09"/>
            <circle r="55" strokeWidth="0.6" opacity="0.09"/>
            <circle r="49.5" strokeWidth="0.5" opacity="0.07" strokeDasharray="8 3 2 3"/>
            <circle r="11" strokeWidth="0.6" opacity="0.09"/>
            <line x1="-60" y1="0" x2="60" y2="0" strokeWidth="0.4" opacity="0.07" strokeDasharray="10 4 2 4"/>
            <line x1="0" y1="-60" x2="0" y2="60" strokeWidth="0.4" opacity="0.07" strokeDasharray="10 4 2 4"/>
            {Array.from({length: 14}).map((_, i) => {
              const tw = (2 * Math.PI * 49.5) / 14 * 0.45;
              return (
                <rect key={i} x={-tw / 2} y={-55} width={tw} height={11}
                  transform={`rotate(${(i / 14) * 360})`}
                  strokeWidth="0.6" opacity="0.09"/>
              );
            })}
          </g>

          {/* Gear C — small, top-left, r=35 */}
          <g transform="translate(68,152)" stroke="#8b6a3e" fill="none">
            <circle r="28" strokeWidth="0.6" opacity="0.09"/>
            <circle r="35" strokeWidth="0.6" opacity="0.09"/>
            <circle r="31.5" strokeWidth="0.5" opacity="0.07" strokeDasharray="6 2 2 2"/>
            <circle r="7" strokeWidth="0.6" opacity="0.09"/>
            <line x1="-38" y1="0" x2="38" y2="0" strokeWidth="0.4" opacity="0.07" strokeDasharray="8 3 2 3"/>
            <line x1="0" y1="-38" x2="0" y2="38" strokeWidth="0.4" opacity="0.07" strokeDasharray="8 3 2 3"/>
            {Array.from({length: 10}).map((_, i) => {
              const tw = (2 * Math.PI * 31.5) / 10 * 0.45;
              return (
                <rect key={i} x={-tw / 2} y={-35} width={tw} height={7}
                  transform={`rotate(${(i / 10) * 360})`}
                  strokeWidth="0.6" opacity="0.09"/>
              );
            })}
          </g>

          {/* Gear D — medium, bottom-right, r=60 */}
          <g transform="translate(1350,760)" stroke="#8b6a3e" fill="none">
            <circle r="48" strokeWidth="0.6" opacity="0.10"/>
            <circle r="60" strokeWidth="0.6" opacity="0.10"/>
            <circle r="54" strokeWidth="0.5" opacity="0.07" strokeDasharray="8 3 2 3"/>
            <circle r="12" strokeWidth="0.6" opacity="0.10"/>
            <line x1="-65" y1="0" x2="65" y2="0" strokeWidth="0.4" opacity="0.07" strokeDasharray="10 4 2 4"/>
            <line x1="0" y1="-65" x2="0" y2="65" strokeWidth="0.4" opacity="0.07" strokeDasharray="10 4 2 4"/>
            {Array.from({length: 16}).map((_, i) => {
              const tw = (2 * Math.PI * 54) / 16 * 0.45;
              return (
                <rect key={i} x={-tw / 2} y={-60} width={tw} height={12}
                  transform={`rotate(${(i / 16) * 360})`}
                  strokeWidth="0.6" opacity="0.10"/>
              );
            })}
          </g>

          {/* Gear E — tiny, mid-right edge, r=22.5 */}
          <g transform="translate(1415,450)" stroke="#8b6a3e" fill="none">
            <circle r="18" strokeWidth="0.5" opacity="0.08"/>
            <circle r="22.5" strokeWidth="0.5" opacity="0.08"/>
            <circle r="20" strokeWidth="0.4" opacity="0.06" strokeDasharray="5 2 1 2"/>
            <circle r="4.5" strokeWidth="0.5" opacity="0.08"/>
            <line x1="-26" y1="0" x2="26" y2="0" strokeWidth="0.4" opacity="0.06" strokeDasharray="6 2 2 2"/>
            <line x1="0" y1="-26" x2="0" y2="26" strokeWidth="0.4" opacity="0.06" strokeDasharray="6 2 2 2"/>
            {Array.from({length: 8}).map((_, i) => {
              const tw = (2 * Math.PI * 20) / 8 * 0.45;
              return (
                <rect key={i} x={-tw / 2} y={-22.5} width={tw} height={4.5}
                  transform={`rotate(${(i / 8) * 360})`}
                  strokeWidth="0.5" opacity="0.08"/>
              );
            })}
          </g>

          {/* ══════════════════════════════════════
              5. CENTRE-MARK CROSSES
              ══════════════════════════════════════ */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.10">
            {/* Near Gear A */}
            <circle cx="130" cy="760" r="5"/>
            <line x1="118" y1="760" x2="142" y2="760"/>
            <line x1="130" y1="748" x2="130" y2="772"/>
            {/* Near Gear B */}
            <circle cx="1310" cy="120" r="5"/>
            <line x1="1298" y1="120" x2="1322" y2="120"/>
            <line x1="1310" y1="108" x2="1310" y2="132"/>
            {/* Near Gear C */}
            <circle cx="68" cy="152" r="4"/>
            <line x1="58" y1="152" x2="78" y2="152"/>
            <line x1="68" y1="142" x2="68" y2="162"/>
          </g>

          {/* ══════════════════════════════════════════════════
              6. PARTIAL ARC SWING RADIUS ANNOTATIONS
              ══════════════════════════════════════════════════ */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.07">
            {/* Top-left swing */}
            <path d="M 142 0 A 247 247 0 0 1 389 247"/>
            <line x1="142" y1="0" x2="389" y2="247"/>
            {/* Bottom-right swing */}
            <path d="M 1298 900 A 200 200 0 0 0 1098 700"/>
            <line x1="1298" y1="900" x2="1098" y2="700"/>
          </g>
          <text x="290" y="105" fontFamily="monospace" fontSize="8"
            fill="#8b6a3e" opacity="0.10" transform="rotate(45,290,105)">R 247</text>
          <text x="1160" y="825" fontFamily="monospace" fontSize="8"
            fill="#8b6a3e" opacity="0.10" transform="rotate(-45,1160,825)">R 200</text>

          {/* ══════════════════════════════════════════
              7. TITLE BLOCK — top-right corner
              ══════════════════════════════════════════ */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.07">
            {/* Outer border */}
            <rect x="1248" y="18" width="174" height="78"/>
            {/* Divider rows */}
            <line x1="1248" y1="37" x2="1422" y2="37"/>
            <line x1="1248" y1="56" x2="1422" y2="56"/>
            <line x1="1248" y1="75" x2="1422" y2="75"/>
            {/* Divider col */}
            <line x1="1335" y1="37" x2="1335" y2="96"/>
          </g>
          <text x="1258" y="32" fontFamily="monospace" fontSize="7.5"
            fill="#8b6a3e" opacity="0.10">DRG NO.</text>
          <text x="1344" y="32" fontFamily="monospace" fontSize="7.5"
            fill="#8b6a3e" opacity="0.10">SCALE 1:1</text>
          <text x="1258" y="51" fontFamily="monospace" fontSize="7.5"
            fill="#8b6a3e" opacity="0.10">DATE</text>
          <text x="1344" y="51" fontFamily="monospace" fontSize="7.5"
            fill="#8b6a3e" opacity="0.10">2026-03</text>
          <text x="1258" y="70" fontFamily="monospace" fontSize="7.5"
            fill="#8b6a3e" opacity="0.10">REV A</text>
          <text x="1344" y="70" fontFamily="monospace" fontSize="7.5"
            fill="#8b6a3e" opacity="0.10">SHEET 1/1</text>
          <text x="1258" y="90" fontFamily="monospace" fontSize="7"
            fill="#8b6a3e" opacity="0.09">MUSTAFA SAYYED · MECH ENG</text>

          {/* Second small title block — bottom-left */}
          <g stroke="#8b6a3e" strokeWidth="0.5" fill="none" opacity="0.065">
            <rect x="18" y="820" width="120" height="62"/>
            <line x1="18"  y1="838" x2="138" y2="838"/>
            <line x1="18"  y1="856" x2="138" y2="856"/>
            <line x1="18"  y1="874" x2="138" y2="874"/>
          </g>
          <text x="26" y="834" fontFamily="monospace" fontSize="7"
            fill="#8b6a3e" opacity="0.09">ASSEMBLY DRG</text>
          <text x="26" y="852" fontFamily="monospace" fontSize="7"
            fill="#8b6a3e" opacity="0.09">TOLERANCE ±0.1</text>
          <text x="26" y="870" fontFamily="monospace" fontSize="7"
            fill="#8b6a3e" opacity="0.09">THIRD ANGLE</text>
          <text x="26" y="876" fontFamily="monospace" fontSize="7"
            fill="#8b6a3e" opacity="0.08">PROJECTION</text>

        </svg>



        {/* ── MAIN SCENE (z:10) — text + canvas + button ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}>

          {/* Overline + heading + subline */}
          <div style={{ textAlign: "center", marginBottom: "24px", userSelect: "none" }}>

            <p style={{
              fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
              fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase",
              color: PAL.textOver, marginBottom: "14px", fontWeight: 600,
            }}>
              MUSTAFA SAYYED · PORTFOLIO
            </p>

            <h1 style={{
              fontFamily: "var(--font-playfair),'Playfair Display',Georgia,serif",
              fontSize: "clamp(26px,4vw,52px)", fontWeight: 700, lineHeight: 1.12,
              color: PAL.textDeep, letterSpacing: "-0.01em",
              maxWidth: "660px", margin: "0 auto 12px",
            }}>
              Engineering Precision Meets<br/>Project Leadership.
            </h1>

            <p style={{
              fontFamily: "var(--font-cormorant),'Cormorant Garamond',Georgia,serif",
              fontStyle: "italic", fontSize: "15px",
              color: PAL.textMid, letterSpacing: "0.03em",
            }}>
              Click to enter
            </p>

          </div>

          {/* Three.js canvas host */}
          <div
            ref={canvasRef}
            style={{
              width: "min(560px,88vw)",
              height: "min(340px,44vw)",
              position: "relative",
              animation: vibrate ? "vibrate 0.1s linear infinite" : "none",
              filter: phase === "p3"
                ? "drop-shadow(0 0 24px rgba(196,154,40,0.35))"
                : "none",
              transition: "filter 0.4s ease",
            }}
          />

          {/* ENTER button area */}
          <div style={{
            marginTop: "32px", position: "relative",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>

            {/* Brass pulse ring (Phase 1) */}
            {phase === "p1" && (
              <div aria-hidden style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: "180px", height: "52px",
                borderRadius: "4px",
                border: `1.5px solid ${PAL.brass}`,
                animation: "brassRing 0.55s ease-out forwards",
                pointerEvents: "none",
              }}/>
            )}

            {/* Mesh glow dots (Phase 3) */}
            {phase === "p3" && [
              { left: "calc(50% + 155px)", top: "-170px" },
              { left: "calc(50% - 155px)", top: "-170px" },
              { left: "calc(50% + 90px)",  top: "-280px" },
              { left: "calc(50% - 90px)",  top: "-280px" },
            ].map((pos, i) => (
              <div key={i} aria-hidden style={{
                position: "fixed", zIndex: 12, pointerEvents: "none", ...pos,
                width: "8px", height: "8px", borderRadius: "50%",
                background: PAL.brass, filter: "blur(4px)", opacity: 0,
                animation: "meshGlow 0.8s ease-in-out infinite alternate",
                animationDelay: `${i * 0.2}s`,
              }}/>
            ))}

            {/* The button */}
            <button
              id="intro-enter-btn"
              onClick={handleEnter}
              disabled={phase !== "idle"}
              style={{
                width: "180px", height: "52px",
                background: PAL.btnFill,
                color: PAL.btnText,
                border: `1px solid ${PAL.brass}`,
                borderRadius: "4px",
                fontFamily: "var(--font-jetbrains),'JetBrains Mono',monospace",
                fontSize: "12px", letterSpacing: "0.2em", fontWeight: 600,
                cursor: phase === "idle" ? "pointer" : "default",
                transform: phase === "p1" ? "scale(0.96)" : "scale(1)",
                transition: "transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease",
                boxShadow: phase === "p3"
                  ? `0 0 20px 6px rgba(196,154,40,0.42), 0 4px 20px rgba(42,26,14,0.25)`
                  : "0 4px 20px rgba(42,26,14,0.18)",
              }}
              onMouseEnter={(e) => {
                if (phase !== "idle") return;
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = "#e8b830";
                b.style.boxShadow = "0 0 14px 3px rgba(232,184,48,0.35), 0 4px 20px rgba(42,26,14,0.18)";
              }}
              onMouseLeave={(e) => {
                if (phase !== "idle") return;
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = PAL.brass;
                b.style.boxShadow = "0 4px 20px rgba(42,26,14,0.18)";
              }}
            >
              {label}
            </button>

          </div>
        </div>

        {/* ── DOORS (z:20 — rendered ABOVE scene) ──
             Doors start as invisible parchment panels (opacity 0).
             They become visible only during Phase 4 when they slide apart,
             revealing the portfolio beneath. The key trick: they start transparent,
             snap opaque on phase transition, then animate out.             ── */}

        {/* Left door */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
          background: PAL.bg, zIndex: 20, willChange: "transform",
          opacity: phase === "p4" || phase === "done" ? 1 : 0,
          transform: doors ? "translateX(-101%)" : "translateX(0)",
          transition: doors
            ? "transform 0.7s cubic-bezier(0.85,0,0.15,1)"
            : "opacity 0.05s step-end",
          pointerEvents: phase === "p4" ? "all" : "none",
        }}>
          {/* dot grid on door face */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle at 1px 1px,rgba(42,26,14,0.07) 1px,transparent 0)",
            backgroundSize: "24px 24px",
          }}/>
        </div>

        {/* Right door */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
          background: PAL.bg, zIndex: 20, willChange: "transform",
          opacity: phase === "p4" || phase === "done" ? 1 : 0,
          transform: doors ? "translateX(101%)" : "translateX(0)",
          transition: doors
            ? "transform 0.7s cubic-bezier(0.85,0,0.15,1)"
            : "opacity 0.05s step-end",
          pointerEvents: phase === "p4" ? "all" : "none",
        }}>
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle at 1px 1px,rgba(42,26,14,0.07) 1px,transparent 0)",
            backgroundSize: "24px 24px",
          }}/>
        </div>

        {/* Brass seam (z:21) */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: "calc(50% - 0.5px)",
          width: "1px", height: "100%",
          background: PAL.brass, zIndex: 21, pointerEvents: "none",
          opacity: seamOn ? 1 : 0,
          boxShadow: seamOn ? `0 0 10px 3px ${PAL.brass}` : "none",
          transition: seamOn ? "opacity 0.1s ease" : "opacity 0.6s ease",
        }}/>

        {/* Skip link */}
        <button
          onClick={handleSkip}
          style={{
            position: "fixed", bottom: "22px", right: "26px", zIndex: 30,
            background: "none", border: "none", padding: 0, cursor: "pointer",
            fontFamily: "var(--font-jetbrains),monospace",
            fontSize: "11px", letterSpacing: "0.14em",
            color: PAL.btnText, opacity: 0.4, textTransform: "uppercase",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.4"; }}
        >
          Skip →
        </button>

        {/* CSS keyframes */}
        <style>{`
          @keyframes brassRing {
            0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.9; }
            100% { transform: translate(-50%,-50%) scale(3.6); opacity: 0;   }
          }
          @keyframes vibrate {
            0%   { transform: translate(0,0); }
            20%  { transform: translate(-1.5px,0.5px); }
            40%  { transform: translate(1.5px,-1px); }
            60%  { transform: translate(-1px,1.5px); }
            80%  { transform: translate(1px,-0.5px); }
            100% { transform: translate(0,0); }
          }
          @keyframes meshGlow {
            0%   { opacity: 0;    transform: scale(1); }
            100% { opacity: 0.72; transform: scale(2.6); }
          }
        `}</style>
      </div>
    </>
  );
}

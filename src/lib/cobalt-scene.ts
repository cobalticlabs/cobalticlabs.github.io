import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  IcosahedronGeometry,
  Mesh,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import { fragmentShader, vertexShader } from "./cobalt-shaders";

const WIDE_MIN_PX = 760;
const BLOB_RADIUS = 1.15;
const DUST_COUNT = 900;
const MAX_STEP_S = 0.05;
const EASE = 0.06;
const ENERGY_DECAY = 0.96;
const START_TIME_S = 4.2;

export function startCobaltScene(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  reduceMotion: boolean,
): (() => void) | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }

  const small = host.clientWidth < WIDE_MIN_PX;
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2),
  );

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  const uniforms = {
    uTime: { value: START_TIME_S },
    uAmp: { value: 1 },
    uMouse: { value: new Vector2(0, 0) },
    uDeep: { value: new Color("#0a1f8f") },
    uCobalt: { value: new Color("#2b50ff") },
    uGlow: { value: new Color("#9fb4ff") },
  };

  const blobGeometry = new IcosahedronGeometry(BLOB_RADIUS, small ? 64 : 96);
  const blobMaterial = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });
  const blob = new Mesh(blobGeometry, blobMaterial);
  scene.add(blob);

  const positions = new Float32Array(DUST_COUNT * 3);
  for (let i = 0; i < DUST_COUNT; i++) {
    const r = 1.9 + Math.random() * 2.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const dustGeometry = new BufferGeometry();
  dustGeometry.setAttribute("position", new BufferAttribute(positions, 3));
  const dustMaterial = new PointsMaterial({
    color: 0x8fa4ff,
    size: 0.022,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const dust = new Points(dustGeometry, dustMaterial);
  scene.add(dust);

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (w >= WIDE_MIN_PX) {
      blob.scale.setScalar(1);
      blob.position.set(1.5, 0.15, 0);
    } else {
      const unitsPerPx =
        (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z) / h;
      const radiusPx = Math.min(w * 0.36, 150);
      blob.scale.setScalar((radiusPx * unitsPerPx) / 1.45);
      blob.position.set(0, (h / 2 - (radiusPx + 40)) * unitsPerPx, 0);
    }
    dust.scale.copy(blob.scale);
    dust.position.copy(blob.position);
    if (reduceMotion) renderer.render(scene, camera);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  const target = { x: 0, y: 0 };
  const mouse = { x: 0, y: 0 };
  let energy = 0;
  const onPointerMove = (e: PointerEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    energy = Math.min(1, energy + Math.hypot(x - target.x, y - target.y) * 2.2);
    target.x = x;
    target.y = y;
  };

  const step = (dt: number) => {
    mouse.x += (target.x - mouse.x) * EASE;
    mouse.y += (target.y - mouse.y) * EASE;
    energy *= ENERGY_DECAY;
    uniforms.uTime.value += dt;
    uniforms.uAmp.value = 1 + energy * 0.9;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    blob.rotation.y += dt * 0.12;
    blob.rotation.x = mouse.y * 0.35;
    blob.rotation.z = -mouse.x * 0.15;
    dust.rotation.y -= dt * 0.03;
    dust.rotation.x = mouse.y * 0.12;
    camera.position.x = mouse.x * 0.25;
    camera.position.y = mouse.y * 0.18;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  step(0);

  let frame = 0;
  let last = 0;
  let onScreen = true;
  const tick = (now: number) => {
    frame = 0;
    if (!onScreen || document.hidden) return;
    step(Math.min((now - last) / 1000, MAX_STEP_S));
    last = now;
    frame = requestAnimationFrame(tick);
  };
  const play = () => {
    if (reduceMotion || frame || !onScreen || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  const visibility = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    play();
  });
  visibility.observe(host);
  document.addEventListener("visibilitychange", play);
  if (!reduceMotion)
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  play();

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibility.disconnect();
    document.removeEventListener("visibilitychange", play);
    window.removeEventListener("pointermove", onPointerMove);
    blobGeometry.dispose();
    blobMaterial.dispose();
    dustGeometry.dispose();
    dustMaterial.dispose();
    renderer.dispose();
  };
}

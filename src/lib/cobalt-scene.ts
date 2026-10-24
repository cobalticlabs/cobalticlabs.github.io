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
  Vector3,
  WebGLRenderer,
} from "three";
import type { ShapeId } from "@/content/types";
import { fragmentShader, vertexShader } from "./cobalt-shaders";
import { stagePose, WIDE_MIN_PX, type Band, type Pose } from "./stage";

const BLOB_RADIUS = 1.15;
const DETAIL_SMALL = 40;
const DETAIL_LARGE = 72;
const DUST_COUNT = 900;
const DUST_OPACITY = 0.7;
const MAX_STEP_S = 0.05;
const FOLLOW = 0.09;
const MORPH = 0.06;
const MOUSE_EASE = 0.06;
const ENERGY_DECAY = 0.96;
const START_TIME_S = 4.2;
const DEVICE_ANGLE = -0.42;

const SHAPES: Record<
  ShapeId,
  { box: Vector3; boxMix: number; spikes: number }
> = {
  blob: { box: new Vector3(1, 1, 1), boxMix: 0, spikes: 0 },
  browser: { box: new Vector3(1.3, 0.85, 0.12), boxMix: 1, spikes: 0 },
  phone: { box: new Vector3(0.58, 1.15, 0.1), boxMix: 1, spikes: 0 },
  network: { box: new Vector3(1, 1, 1), boxMix: 0, spikes: 1 },
};

function isShape(value: string | undefined): value is ShapeId {
  return value !== undefined && value in SHAPES;
}

interface Layout {
  hero: Band | null;
  services: Band | null;
  rows: { shape: ShapeId; center: number }[];
}

function pageBand(el: Element | null): Band | null {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
  };
}

function shift(band: Band | null, scroll: number): Band | null {
  return band && { top: band.top - scroll, bottom: band.bottom - scroll };
}

function ease(rate: number, dt: number): number {
  return 1 - Math.pow(1 - rate, dt * 60);
}

function nearestAngle(current: number, target: number): number {
  const turn = Math.PI * 2;
  return target + Math.round((current - target) / turn) * turn;
}

export function startCobaltScene(
  canvas: HTMLCanvasElement,
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

  const small = window.innerWidth < WIDE_MIN_PX;
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
    uBox: { value: new Vector3(1, 1, 1) },
    uBoxMix: { value: 0 },
    uSpikes: { value: 0 },
    uDeep: { value: new Color("#0a1f8f") },
    uCobalt: { value: new Color("#2b50ff") },
    uGlow: { value: new Color("#9fb4ff") },
  };

  const blobGeometry = new IcosahedronGeometry(
    BLOB_RADIUS,
    small ? DETAIL_SMALL : DETAIL_LARGE,
  );
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
    opacity: DUST_OPACITY,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const dust = new Points(dustGeometry, dustMaterial);
  scene.add(dust);

  const hero = document.querySelector("[data-stage='hero']");
  const services = document.querySelector("[data-stage='services']");
  const rows = Array.from(
    document.querySelectorAll<HTMLElement>("[data-shape]"),
  );

  let hovered: ShapeId | null = null;
  const onRowEnter = (e: PointerEvent) => {
    const shape = (e.currentTarget as HTMLElement).dataset.shape;
    if (isShape(shape)) hovered = shape;
  };
  const onRowLeave = () => {
    hovered = null;
  };
  for (const row of rows) {
    row.addEventListener("pointerenter", onRowEnter);
    row.addEventListener("pointerleave", onRowLeave);
  }

  const measure = (): Layout => ({
    hero: pageBand(hero),
    services: pageBand(services),
    rows: rows.flatMap((row) => {
      const shape = row.dataset.shape;
      const band = pageBand(row);
      return isShape(shape) && band
        ? [{ shape, center: (band.top + band.bottom) / 2 }]
        : [];
    }),
  });
  let layout = measure();
  const relayout = () => {
    layout = measure();
  };
  const layoutObserver = new ResizeObserver(relayout);
  layoutObserver.observe(document.body);

  const centeredShape = (scroll: number): ShapeId => {
    if (hovered) return hovered;
    const middle = scroll + window.innerHeight / 2;
    let best: ShapeId = "blob";
    let bestDistance = Infinity;
    for (const row of layout.rows) {
      const distance = Math.abs(row.center - middle);
      if (distance < bestDistance) {
        best = row.shape;
        bestDistance = distance;
      }
    }
    return best;
  };

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
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

  let pose: Pose | null = null;
  let spin = 0;

  const step = (dt: number, instant: boolean) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scroll = window.scrollY;
    const goal = stagePose({
      width,
      height,
      hero: shift(layout.hero, scroll) ?? { top: 0, bottom: height },
      services: shift(layout.services, scroll),
      shape: centeredShape(scroll),
    });

    const follow = instant ? 1 : ease(FOLLOW, dt);
    const morph = instant ? 1 : ease(MORPH, dt);
    const current: Pose = pose ?? {
      ...goal,
      opacity: instant ? goal.opacity : 0,
    };
    pose = {
      x: current.x + (goal.x - current.x) * follow,
      y: current.y + (goal.y - current.y) * follow,
      radius: current.radius + (goal.radius - current.radius) * follow,
      opacity: current.opacity + (goal.opacity - current.opacity) * follow,
      shape: goal.shape,
    };

    const shape = SHAPES[goal.shape];
    uniforms.uBox.value.lerp(shape.box, morph);
    uniforms.uBoxMix.value += (shape.boxMix - uniforms.uBoxMix.value) * morph;
    uniforms.uSpikes.value += (shape.spikes - uniforms.uSpikes.value) * morph;

    mouse.x += (target.x - mouse.x) * MOUSE_EASE;
    mouse.y += (target.y - mouse.y) * MOUSE_EASE;
    energy *= ENERGY_DECAY;
    uniforms.uTime.value += dt;
    uniforms.uAmp.value = 1 + energy * 0.9;
    uniforms.uMouse.value.set(mouse.x, mouse.y);

    const device = uniforms.uBoxMix.value;
    spin += dt * 0.12 * (1 - device);
    const facing = nearestAngle(spin, DEVICE_ANGLE);
    blob.rotation.y = spin + (facing - spin) * device + mouse.x * 0.25 * device;
    blob.rotation.x =
      mouse.y * 0.35 * (1 - device) + (0.12 + mouse.y * 0.2) * device;
    blob.rotation.z = -mouse.x * 0.15 * (1 - device);
    dust.rotation.y -= dt * 0.03;
    dust.rotation.x = mouse.y * 0.12;
    dustMaterial.opacity = DUST_OPACITY * (1 - 0.6 * device);

    const unitsPerPx =
      (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z) / height;
    blob.position.set(
      (pose.x - width / 2) * unitsPerPx,
      (height / 2 - pose.y) * unitsPerPx,
      0,
    );
    blob.scale.setScalar((pose.radius * unitsPerPx) / BLOB_RADIUS);
    dust.position.copy(blob.position);
    dust.scale.copy(blob.scale);

    camera.position.x = mouse.x * 0.25;
    camera.position.y = mouse.y * 0.18;
    camera.lookAt(camera.position.x * 0.6, camera.position.y * 0.6, 0);

    canvas.style.opacity = pose.opacity.toFixed(3);
    if (pose.opacity > 0.005) renderer.render(scene, camera);
  };

  let frame = 0;
  let last = 0;
  const tick = (now: number) => {
    frame = 0;
    if (document.hidden) return;
    step(Math.min((now - last) / 1000, MAX_STEP_S), false);
    last = now;
    frame = requestAnimationFrame(tick);
  };
  const play = () => {
    if (reduceMotion || frame || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };

  let still = 0;
  const redraw = () => {
    if (still) return;
    still = requestAnimationFrame(() => {
      still = 0;
      step(0, true);
    });
  };

  const onResize = () => {
    resize();
    relayout();
    if (reduceMotion) redraw();
  };
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", play);
  if (reduceMotion) {
    window.addEventListener("scroll", redraw, { passive: true });
    step(0, true);
  } else {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    step(0, false);
    play();
  }

  return () => {
    cancelAnimationFrame(frame);
    cancelAnimationFrame(still);
    layoutObserver.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", redraw);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", play);
    for (const row of rows) {
      row.removeEventListener("pointerenter", onRowEnter);
      row.removeEventListener("pointerleave", onRowLeave);
    }
    blobGeometry.dispose();
    blobMaterial.dispose();
    dustGeometry.dispose();
    dustMaterial.dispose();
    renderer.dispose();
  };
}

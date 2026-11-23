import * as THREE from "three";

export const HoloPortraitShader = {
  uniforms: {
    uTexture: { value: null },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uDissolve: { value: 0.0 }, // 0.0 = solid, 1.0 = dissolved into particles
    uAspect: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    uniform float uTime;
    uniform float uDissolve;

    // Simplex noise helper
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.zzzz);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      vec3 displacedPos = position;

      // When dissolving, pull vertices toward the mercury core on the left (-X) and disperse
      if (uDissolve > 0.001) {
        float noise = snoise(vec3(position.xy * 2.5, uTime * 0.8));
        displacedPos.x -= uDissolve * (3.5 + noise * 1.5);
        displacedPos.y += sin(uTime * 2.0 + position.x * 4.0) * uDissolve * 0.8;
        displacedPos.z += (noise - 0.5) * uDissolve * 2.2;
      }

      vec4 mvPosition = modelViewMatrix * vec4(displacedPos, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uDissolve;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    // Thin-film iridescent color from Fresnel / cosine gradient
    vec3 iridescentPalette(float t) {
      vec3 a = vec3(0.85, 0.88, 0.95);
      vec3 b = vec3(0.18, 0.22, 0.28);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.00, 0.33, 0.67);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      // 1. Liquid cursor ripple on texture UV
      vec2 mouseDist = vUv - uMouse;
      float dist = length(mouseDist);
      float ripple = sin(dist * 28.0 - uTime * 4.0) * exp(-dist * 4.5) * 0.015;
      vec2 distortedUv = vUv + normalize(mouseDist + 0.0001) * ripple;

      vec4 texColor = texture2D(uTexture, distortedUv);

      // 2. Silver Duotone remapping
      float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      // Silver color ramp: Deep graphite -> Brushed Chrome -> Radiant Porcelain
      vec3 shadowColor = vec3(0.086, 0.094, 0.11);    // #16181C
      vec3 midColor = vec3(0.788, 0.804, 0.827);       // #C9CDD3
      vec3 highlightColor = vec3(0.968, 0.972, 0.98); // #F7F8FA

      vec3 duotone = mix(shadowColor, midColor, smoothstep(0.1, 0.6, luminance));
      duotone = mix(duotone, highlightColor, smoothstep(0.6, 0.95, luminance));

      // 3. Subtle horizontal holographic scanlines
      float scanline = sin(vUv.y * 380.0 + uTime * 1.5) * 0.035;
      duotone += scanline;

      // 4. Fresnel Iridescent Edge Glow
      vec3 viewDir = normalize(vViewPosition);
      float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
      fresnel = pow(fresnel, 2.2);

      vec3 iridColor = iridescentPalette(fresnel * 1.5 + uTime * 0.1);
      vec3 finalColor = mix(duotone, iridColor, fresnel * 0.45);

      // Edge border glow (1px rim highlight)
      float edgeX = smoothstep(0.0, 0.02, vUv.x) * (1.0 - smoothstep(0.98, 1.0, vUv.x));
      float edgeY = smoothstep(0.0, 0.015, vUv.y) * (1.0 - smoothstep(0.985, 1.0, vUv.y));
      float borderFactor = 1.0 - (edgeX * edgeY);
      finalColor = mix(finalColor, iridColor * 1.4, borderFactor * 0.85);

      // 5. Scroll Dissolve into silver dust
      float alpha = texColor.a;
      if (uDissolve > 0.0) {
        float noiseThreshold = fract(sin(dot(vUv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
        if (noiseThreshold < uDissolve * 1.2) {
          discard;
        }
        alpha *= (1.0 - uDissolve);
      }

      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};


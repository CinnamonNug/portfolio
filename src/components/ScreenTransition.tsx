import { useLocation } from "@solidjs/router";
import { createEffect, on, onCleanup, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { Renderer, Program, Mesh, Triangle, OGLRenderingContext } from "ogl";

export default function ScreenTransition() {
    const location = useLocation();
    let canvasRef: HTMLCanvasElement | undefined;

    // Explicitly typed state variables
    let renderer: Renderer;
    let gl: OGLRenderingContext;
    let mesh: Mesh;
    let animationFrameId: number;
    let startTime: number | null;    
    const MAX_TIME = 600; 

    // Handle screen/window resizing changes instantly
    const resize = () => {
        if (!renderer || isServer) return;
        renderer.setSize(window.innerWidth, window.innerHeight);
        mesh.program.uniforms.uResolution.value = [window.innerWidth, window.innerHeight];
    };

    onMount(() => {
        if (!canvasRef) return;

        // 1. Initialize OGL Context
        renderer = new Renderer({ canvas: canvasRef, alpha: true, dpr: window.devicePixelRatio });
        gl = renderer.gl;

        // 2. Setup Fullscreen Triangle Geometry
        const geometry = new Triangle(gl);
        
        // 3. Compile Program
        const program = new Program(gl, {
            vertex: `
                attribute vec2 position;
                varying vec2 vUv;
                void main() {
                    vUv = position * 0.5 + 0.5;
                    gl_Position = vec4(position, 0.0, 1.0);
                }
            `,
            fragment: `
                precision highp float;
                varying vec2 vUv;
                uniform float uTime;
                uniform vec2 uResolution;

                float hash(vec2 p) {
                    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
                }

                void main() {
                    vec2 uv = vUv;
                    uv.x *= uResolution.x / uResolution.y;

                    float gridSize = 16.0; 
                    vec2 gridUv = fract(uv * gridSize);
                    vec2 cellId = floor(uv * gridSize);

                    float randomThresholdIn = hash(cellId) * 0.5;
                    float randomThresholdOut = 0.5 + hash(cellId + vec2(1.0)) * 0.5;

                    float hasPoppedIn = step(randomThresholdIn, uTime);
                    float hasPoppedOut = step(randomThresholdOut, uTime);
                    float squareMaskActive = hasPoppedIn * (1.0 - hasPoppedOut);

                    vec2 centerDist = abs(gridUv - 0.5);
                    float currentMaxDist = max(centerDist.x, centerDist.y);
                    float squareShape = step(currentMaxDist, 0.505);

                    float finalMask = squareShape * squareMaskActive;

                    gl_FragColor = vec4(vec3(0.0), finalMask);
                }
            `,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: [window.innerWidth, window.innerHeight] }
            }
        });

        // 4. Finalize Mesh & Listeners
        mesh = new Mesh(gl, { geometry, program });
        resize();
        window.addEventListener("resize", resize);

        // Move cleanup inside onMount so it NEVER runs during SSR cleanup passes
        onCleanup(() => {
            window.removeEventListener("resize", resize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        });
    });

    // Main Animation Loop
    const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / MAX_TIME, 1.0);

        mesh.program.uniforms.uTime.value = progress;
        renderer.render({ scene: mesh });

        if (progress < 1.0) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    };

    // Watch Router Changes
    createEffect(on(() => location.pathname, () => {
        if (isServer || !renderer) return; 
        cancelAnimationFrame(animationFrameId);
        startTime = null;
        animationFrameId = requestAnimationFrame(animate);
    }, { defer: true }));

    return (
        <canvas 
            ref={canvasRef} 
            class="z-50 h-screen w-screen fixed top-0 left-0 pointer-events-none" 
        />
    );
}
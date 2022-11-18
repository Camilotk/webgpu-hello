import { CheckWebGPU } from './helper';
import shader from './shader.wgsl';
import "./site.css";

const CreateTriangle = async () => {
    const checkgpu = CheckWebGPU();
    if(checkgpu.includes("Seu browser não suporta WebGPU!")) {
        console.log(checkgpu);
        throw("Your browser is wrong!");
    }

    // Elemento do canvas
    const canvas = document.getElementById('canvas-webgpu') as HTMLCanvasElement;

    // WebGPU
    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
    const device = await adapter?.requestDevice() as GPUDevice;

    const context = canvas.getContext('webgpu') as GPUCanvasContext;
    const format = 'bgra8unorm';

    context.configure({
        device: device,
        format: format
    });

    const pipeline = device.createRenderPipeline({
        vertex: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "vs_main"
        },
        fragment: {
            module: device.createShaderModule({
                code: shader
            }),
            entryPoint: "fs_main",
            targets: [{ format: format}]
        },
        primitive: {
            topology: "triangle-list"
        }
    });

    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            clearValue: {r: 2.0, g: 0.247, b: 0.314, a: 1.0 },
            loadOp: 'clear',
            loadValue: {r: 2.0, g: 0.247, b: 0.314, a: 1.0 },
            storeOp: 'store'
        }]
    });

    renderPass.setPipeline(pipeline);
    renderPass.draw(3, 1, 0, 0);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
};

CreateTriangle();
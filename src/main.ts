import { CheckWebGPU } from './helper'; 
import shader from './shader.wgsl'; // importa shader
import "./site.css";

const CreateTriangle = async () => {
    const checkgpu = CheckWebGPU();
    if(checkgpu.includes('Your current browser does not support WebGPU!')){
        console.log(checkgpu);
        throw('Your current browser does not support WebGPU!');
    }

     // Elemento do canvas
    const canvas = document.getElementById('canvas-webgpu') as HTMLCanvasElement;
    
    // WebGPU
    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;  
    // GPUDevice é o objeto que representa a nossa GPU com os métodos de acesso 
    const device = await adapter?.requestDevice() as GPUDevice;

    const context = canvas.getContext('webgpu') as GPUCanvasContext;
    const format = 'bgra8unorm'; 
    
    // Configura a WebGPU no Canvas
    context.configure({
        device: device,
        format: format,
    });
    
    // https://www.w3.org/TR/webgpu/#gpurenderpipeline
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
            targets: [{
                format: format
            }]
        },
        primitive:{
            topology: "triangle-list" 
        } 
    });
   
    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

     // Começa o encoding
    const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            clearValue: { r: 0.2, g: 0.247, b: 0.314, a: 1.0 }, 
            loadOp: 'clear',
            loadValue: { r: 0.2, g: 0.247, b: 0.314, a: 1.0 }, 
            storeOp: 'store'
        }]
    });
  
    renderPass.setPipeline(pipeline);
    renderPass.draw(3, 1, 0, 0);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
}

// Executa a função
CreateTriangle();

// Desenha novamente o triangulo conforme o tamanho da tela
window.addEventListener('resize', function(){
    CreateTriangle();
});
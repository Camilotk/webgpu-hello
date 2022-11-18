export const CheckWebGPU = () => {
    let result = 'Ótimo, seu browser suporta WebGPU! ✅';
    if (!navigator.gpu) {
        result = `Seu browser não suporta WebGPU! ❌ \n\n
                    
                Cheque se você habilitou a flag da WebGPU em seu navegador. Atualmente, WebGPU é suportado no  
                Chrome canary (https://www.google.com/chrome/canary/) com a flag "enable-unsafe-webgpu" habilitada. 
                Veja a página de Status de Implementação (https://github.com/gpuweb/gpuweb/wiki/Implementation-Status) 
                para mais detalhes.               
                `;
    } 

    const canvas = document.getElementById('canvas-webgpu') as HTMLCanvasElement;
    if(canvas){
        const div = document.getElementsByClassName('item2')[0] as HTMLDivElement;
        canvas.width  = div.offsetWidth;
        canvas.height = div.offsetHeight;

        function windowResize() {
            canvas.width  = div.offsetWidth;
            canvas.height = div.offsetHeight;
        };
        window.addEventListener('resize', windowResize);
    }
    return result;
}
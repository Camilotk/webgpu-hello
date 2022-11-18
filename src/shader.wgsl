// shader da vértice

// Output
// Struct (agrupamento de dados) que representa a saída da função.
// Propriedades:
//   - Position do tipo Vetor de 4 floats 32-bit = Posição do elemento
//   - vColor do tipo Vetor de 4 floats 32-bit = cor v1, v2, v3   
struct Output {
    @builtin(position) Position : vec4<f32>,
    @location(0) vColor : vec4<f32>
};

// vs_main
// Função para o Shader das Vértices
// Retorna: 
//   - Valor do tipo Output declarado acima.
@vertex
fn vs_main(@builtin(vertex_index) VertexIndex: u32) -> Output {
    // pos é um array de 3 posições do Tipo vec2 de 32-bits 
    // que representa a posição de 3 vértices do triangulo
    var pos = array<vec2<f32>, 3>(
        vec2<f32>(0.0, 0.5), // Vértice 1
        vec2<f32>(-0.5, -0.5), // Vértice 2
        vec2<f32>(0.5, -0.5)  // Véretice 3
    );

    // color é um array de mesmo tipo que representa as cores 
    // de cada uma das vértices.
    var color = array<vec3<f32>, 3>(
        vec3<f32>(1.0, 0.0, 0.0), // RED
        vec3<f32>(0.0, 1.0, 0.0), // GREEN
        vec3<f32>(0.0, 0.0, 1.0) // BLUE
    );

    // Cria um output
    var output: Output;
    //   Recebe a posição do elemento com os vértices, mas também os eixos z e w (escala)
    //   Por isso vec4 = vec2 + z + w
    output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0); 
    //   Recebe a cor e adiciona 1.0 que é a transparência da cor
    output.vColor = vec4<f32>(color[VertexIndex], 1.0);

    return output;
}

// shader do fragmento

// fs_main
// Desestrutura a cor de um output como input e retorna a posição das cores para fazer o gradiente.
// Recebe:
//   - vColor que representa os valores de Cor abstraidos como vec4<f32>
@fragment
fn fs_main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {
    return vColor;
}
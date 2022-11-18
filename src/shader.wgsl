// Struct (objeto sem métodos) que representa o output
struct Output {
    @builtin(position) Position : vec4<f32>,
    @location(0) vColor : vec4<f32>
};

// Main da Vértices 
@vertex
fn vs_main(@builtin(vertex_index) VertexIndex: u32) -> Output {
    // posição que vamos criar
    var pos = array<vec2<f32>, 3>(
        vec2<f32>(0.0, 0.5), // Vértice 1
        vec2<f32>(-0.5, -0.5), // Vértice 2
        vec2<f32>(0.5, -0.5)  // Véretice 3
    );

    // cores de cada vértice
    var color = array<vec3<f32>, 3>(
        vec3<f32>(1.0, 0.0, 0.0), // RED
        vec3<f32>(0.0, 1.0, 0.0), // GREEN
        vec3<f32>(0.0, 0.0, 1.0) // BLUE
    );

    // Criou uma variavel output com a posição e cor
    var output: Output;
    output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0); 
    output.vColor = vec4<f32>(color[VertexIndex], 1.0);

    return output;
}

// Main do Fragment
@fragment
fn fs_main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {
    return vColor;
}
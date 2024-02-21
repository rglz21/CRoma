const boton = document.querySelector('#generar');

boton.addEventListener("click", (evento) => {
    let textarea1 = document.getElementById("completa").value;
    let textarea2 = document.getElementById("pBuscar").value;

    let correlativos1 = new Set(textarea1.split('\n').map(line => line.trim()));
    let correlativos2 = new Set(textarea2.split('\n').map(line => line.trim()));
    let correlativosFaltantes = [];

    correlativos1.forEach(correlativo => {
        if (!correlativos2.has(correlativo) && !isNaN(correlativo)) {
            correlativosFaltantes.push(correlativo);
        }
    });

    document.getElementById("resultado").innerText = `** RESULTADOS:
	total de correlativos: ${textarea1.split('\n').length}
	total de correlativos encontrados: ${textarea2.split('\n').length}
	Se encontro ${correlativosFaltantes.length} correlativos faltantes.`
	
	generarArchivo(correlativosFaltantes.join('\n'));
});

function generarArchivo(contenido) {
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'correlativos_faltantes.txt';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
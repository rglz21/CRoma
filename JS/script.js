function procesarTodo() {
    const output = document.getElementById('outputContainer');
    output.innerHTML = ""; // Limpiar resultados anteriores

    // Variables para almacenar los valores que restaremos después
    let totalAccounts_C2 = 0;
    let totalSubscribers_C2 = 0;
    let totalBills_C3 = 0;
    let totalSubscribers_C3 = 0;

    // --- PROCESAR CAJA 1 ---
    const data1 = document.getElementById('inputCaja1').value.trim();
    if (data1) {
        const lineas = data1.split('\n');
        if (lineas.length >= 2) {
            const encabezados = lineas[0].trim().split(/\s{2,}|\t/);
            const valores = lineas[1].trim().split(/\s{2,}|\t/);
            const indices = [4, 5, 6, 7, 8, 9, 10];
            let suma = 0;
            let tabla = `<table class="table table-sm table-bordered"><tbody>`;

            indices.forEach(idx => {
                if (valores[idx]) {
                    let valorLimpio = valores[idx].replace(/,/g, '').replace(/Dollar/gi, '').trim();
                    let num = parseFloat(valorLimpio);
                    if (!isNaN(num)) {
                        suma += num;
                        tabla += `<tr><td><small>${encabezados[idx]}</small></td><td>${num.toLocaleString('en-US')}</td></tr>`;
                    }
                }
            });
            tabla += `<tr class="table-success"><th>TOTAL</th><th>${suma.toLocaleString('en-US')} Dollar</th></tr></tbody></table>`;
            agregarResultado("CAJA 1: Resumen de Cargos", tabla);
        }
    }

    // --- PROCESAR CAJA 2 ---
    const data2 = document.getElementById('inputCaja2').value.trim();
    if (data2) {
        const lineas = data2.split('\n');
        if (lineas.length >= 2) {
            const valores = lineas[1].trim().split(/\s{2,}|\t/);
            // Extraemos y limpiamos los valores numéricos
            totalAccounts_C2 = parseInt(valores[3]) || 0;
            totalSubscribers_C2 = parseInt(valores[4]) || 0;

            const html = `
                <p class="mb-1">Total Accounts: <strong>${totalAccounts_C2}</strong></p>
                <p class="mb-0">Total Subscribers: <strong>${totalSubscribers_C2}</strong></p>`;
            agregarResultado("CAJA 2: Conteos", html);
        }
    }

    // --- PROCESAR CAJA 3 ---
    const data3 = document.getElementById('inputCaja3').value.trim();
    if (data3) {
        const lineas = data3.split('\n');
        if (lineas.length >= 2) {
            const valores = lineas[1].trim().split(/\s{2,}|\t/);
            // Extraemos y limpiamos los valores numéricos
            totalBills_C3 = parseInt(valores[7]) || 0;
            totalSubscribers_C3 = parseInt(valores[8]) || 0;

            const html = `
                <p class="mb-1">Total Bills: <strong>${totalBills_C3}</strong></p>
                <p class="mb-0">Total Subscribers: <strong>${totalSubscribers_C3}</strong></p>`;
            agregarResultado("CAJA 3: Bill Suppressed", html);
        }
    }

    // --- CÁLCULO DE RESTAS (DIFERENCIAS) ---
    if (data2 && data3) {
        const restaAccountsBills = totalAccounts_C2 - totalBills_C3;
        const restaSubscribers = totalSubscribers_C2 - totalSubscribers_C3;
		console.log(restaSubscribers)
        const htmlDiferencias = `
            <div class="row text-center">
                <div class="col-6 border-end">
                    <small class="text-muted d-block"> Cuentas </small>
                    <span class="fs-4 fw-bold text-success">
                        ${restaAccountsBills}
                    </span>
                </div>
                <div class="col-6">
                    <small class="text-muted d-block">Suscriptores</small>
                    <span class="fs-4 fw-bold text-success">
                        ${restaSubscribers}
                    </span>
                </div>
            </div>
        `;
        agregarResultado("COMPARATIVA DE DATOS (RESTAS)", htmlDiferencias);
    }
}

function agregarResultado(titulo, contenido) {
    const output = document.getElementById('outputContainer');
    const div = document.createElement('div');
    div.className = "mb-4 p-3 border border-dark border-2 bg-white shadow-sm";
    div.innerHTML = `<h6 class="fw-bold border-bottom border-dark pb-2 mb-3">${titulo}</h6>${contenido}`;
    output.appendChild(div);
}
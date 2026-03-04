document.addEventListener('DOMContentLoaded', () => {
    const selectAnio = document.getElementById('anio-vehiculo');
    const selectCuotas = document.getElementById('cuotas');
    const inputMonto = document.getElementById('monto');
    const btn = document.getElementById('calc-btn');
    const resultContainer = document.getElementById('result-container');
    const priceText = document.getElementById('final-price');
    const adminText = document.getElementById('admin-price');

    // Cuotas
    if (selectCuotas) {
        for (let i = 4; i <= 24; i++) {
            let op = document.createElement('option');
            op.value = i;
            op.innerText = i + (i === 1 ? " Cuota" : " Cuotas");
            selectCuotas.appendChild(op);
        }
    }

    // Modelo
    if (selectAnio) {
        let op2222 = document.createElement('option');

        for (let i = 2026; i >= 2006; i--) {
            let op = document.createElement('option');
            op.value = i; op.innerText = i;
            selectAnio.appendChild(op);
        }
            op2222.value = "2222"; op2222.innerText = "2222";
            selectAnio.appendChild(op2222);
    }


    inputMonto.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value !== "") {
            e.target.value = new Intl.NumberFormat('es-AR').format(value);
        }
    });
//---------------------------------------------------EDITAR DESDE ACÁ----------------------------------------------------------------------------
    const calculadoraTasas = (anio) => {
        // EJEMPLO: Usamos los valores decimales directos (5.3% -> 0.053)
        if (anio === "2222") return 0.12; //PORCENTAJE DE PRESTAMOS PERSONALES
        if (anio >= 2006 && anio <= 2012) return 0.067; //PORCENTAJE DE CUOTAS DESDDE 2006 HASTA 2012
        if (anio >= 2013 && anio <= 2026) return 0.052; //PORCENTAJE DE CUOTAS DESDDE 2013 HASTA 2026
        return 0;
    }

    const calculadoraGastosAdmin = (monto) => {
        let viaticos = 40000; //VALOR EN PESOS DE VIATICOS NO PONER NI PUNTOS NI COMAS
        let escribano = 60000; //VALOR EN PESOS DE ESCRIBANO NO PONER NI PUNTOS NI COMAS
        let gastosdegestoria = 100000; //VALOR EN PESOS DE GASTOS DE GESTON NO PONER NI PUNTOS NI COMAS
        const gastosAdmin = monto * 0.02 + viaticos + escribano + gastosdegestoria; //ACÁ SE SUMAN TODOS LOS GASTOS ADMINISTRATIVOS
        return gastosAdmin;
    }
//---------------------------------------------------FIN DE SECTOR DE EDICIÓN----------------------------------------------------------------------------
    btn.addEventListener('click', () => {
        const montoLimpio = parseFloat(inputMonto.value.replace(/\./g, ''));
        const cuotas = parseInt(selectCuotas.value);
        const anio = selectAnio.value;

        if (montoLimpio > 0 && cuotas > 0 && anio !== "") {
            btn.innerText = "Calculando...";
            setTimeout(() => {
                const tasaMensual = calculadoraTasas(anio);
                const totalConInteres = montoLimpio + (montoLimpio * (cuotas * tasaMensual));
                
                // Redondeamos ambos valores a enteros
                const cuota = Math.round(totalConInteres / cuotas);
                const gastosAdmin = Math.round(calculadoraGastosAdmin(totalConInteres));

                // Formateamos sin decimales (minimumFractionDigits: 0)
                priceText.innerText = `$ ${cuota.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
                adminText.innerText = `$ ${gastosAdmin.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

                resultContainer.classList.remove('hidden');
                btn.innerText = "Calcular Cuota";
            }, 600);
        } else {
            alert("Completa todos los datos.");
        }
    });
});








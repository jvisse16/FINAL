function cocinar() {
    fetch('ingre.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Recetas cargadas:', data);
            const recetas = data.recetas;
            const seleccionados = Array.from(document.querySelectorAll('input[name="ingrediente"]:checked')).map(input => input.value);
            console.log('Ingredientes seleccionados:', seleccionados);

            const receta = recetas.find(r => {
                return r.ingredientes.every(ing => seleccionados.includes(ing)) && seleccionados.length === r.ingredientes.length;
            });

            if (receta) {
                console.log('Receta encontrada:', receta);
                document.getElementById('nombrePlatillo').innerText = receta.nombre;

                receta.ingredientes.forEach((ing, index) => {
                    document.getElementById(`ingrediente${index + 1}`).innerText = ing;
                });

                for (let i = receta.ingredientes.length; i < 4; i++) {
                    document.getElementById(`ingrediente${i + 1}`).innerText = '';
                }

                document.getElementById('imagenPlatillo').innerHTML = `<img src="${receta.imagen}" alt="${receta.nombre}" width="200" height="200">`;
            } else {
                console.log('No se encontró una receta con los ingredientes seleccionados.');
                document.getElementById('nombrePlatillo').innerText = 'NO hay resultados';
                document.getElementById('ingrediente1').innerText = '';
                document.getElementById('ingrediente2').innerText = '';
                document.getElementById('ingrediente3').innerText = '';
                document.getElementById('ingrediente4').innerText = '';
                document.getElementById('imagenPlatillo').innerHTML = 'Imagen';
            }
        })
        .catch(error => {
            console.error('Hubo un problema con la operación de fetch:', error);
        });
}

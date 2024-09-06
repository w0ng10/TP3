async function obtenerDatos() {
    const peticion = new Request("https://rickandmortyapi.com/api/character/63");
    const respuesta = await fetch(peticion); // Devuelve JSON => Objecto JS
    const json = await respuesta.json();
    console.log(json);
    console.log(respuesta);
    console.log(json.status);
}

obtenerDatos();
const formLogin = document.querySelector("#login")
const inputUser = document.querySelector("#input-user")
const inputPass = document.querySelector("#input-pass")
const loginIncorrecto = document.querySelector("#logint")
const contenedorForm = document.querySelector(".container-login")
const logout = document.querySelector("#logout")
const contenedorPokemon = document.querySelector(".container-usuarios")
const tabla = document.querySelector("table")

// para hacer una función que nos sirva para subir valores al ls
// 1) un valor a convertir con JSON.stringify
// 2) una clave que le proporcione un nombre a ese valor que se suba

const datosUsuario = {
    user: "gasti",
    password: "gaston123"
}

const subirAlLs = ( clave, valor ) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

const obtenerDelLs = ( clave ) => {
    return JSON.parse(localStorage.getItem(clave))
}

formLogin.onsubmit = ( event ) => {
    event.preventDefault()
    if ( inputUser.value === datosUsuario.user && inputPass.value === datosUsuario.password ) {
        subirAlLs("login", true)
        contenedorForm.style.display = "none"  
        logout.style.display = "block"      
        contenedorPokemon.style.display = "flex"        
    } else {        
        loginIncorrecto.style.display = "block"
        inputPass.style.border = "1px solid red"
        inputUser.style.border = "1px solid red"
        contenedorPokemon.style.display = "none"
    }
}

// esta función valida si existe un token en el localStorage
// también verifica su valor, es decir, si este es diferente a true, que es el valor que subimos desde el envío del formulario (onsubmit), entonces signiifca que el usuario no se pudo loggear

function validarLogin ( clave ) {
if ( clave !== true ) {
    contenedorForm.style.display = "flex"
    logout.style.display = "none"
    contenedorPokemon.style.display = "none"
} else {
    contenedorForm.style.display = "none"
    logout.style.display = "block"
    contenedorPokemon.style.display = "flex"
    }
}

validarLogin(obtenerDelLs("login"))

// evento que deslogea a mi usuario

logout.onclick = () => {
    localStorage.removeItem( "login" )
    console.log("Cerraste sesión")
    validarLogin(obtenerDelLs("login"))
    formLogin.reset()
}

// una tabla desde js con reduce

const nextEvol = (array) => {
    let acc = ""
    array.forEach( (elemento) => {
        acc += `${elemento.name} `
    })
    return acc
}


function pokemonAHtml ( array ) {
    const arrayReduce = array.reduce( ( acc, elemento ) => {
        return  acc + `
        <tbody>
            <tr>
                <td>
                    ${elemento.name}
                </td>
                <td>
                    ${elemento.type[0]}
                </td>
                <td>
                    ${elemento.height}
                </td>
                <td>
                    ${elemento.weight}
                </td>
                <td>
                    ${ elemento["next_evolution"] && typeof elemento["next_evolution"] === "object" ? nextEvol(elemento["next_evolution"]) : "No tiene" }
                </td>
            </tr>
        </tbody>       
        `
    },`
    <thead>
    <tr>
        <th>
            Nombre
        </th>
        <th>
            Tipo
        </th>
        <th>
            Altura
        </th>
        <th>
            Peso
        </th>
        <th>
            Evolución
        </th>
        <tr>
    </thead>
    `)
    tabla.innerHTML = arrayReduce
}

pokemonAHtml(pokemon)
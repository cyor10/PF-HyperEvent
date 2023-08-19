const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export function validateUser(inputs){
    let errros = {}

    if(!inputs.email) errros.email = "Su email es invalido"
    if(!regexEmail.test(inputs.email)) inputs.email = "The email entered is not valid"
    if(inputs.email.length > 70) inputs.email = "The email entered is not valid"

    return errros;
}

export function validateEvent(inputs){
    let errros = {}    
    if(!inputs.eventname) errros.eventname= "Su evento no puede estar vacio"

    return errros;
}
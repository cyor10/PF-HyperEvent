const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPasword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).{8,}$/

export function validateUser(inputs){
    let errros = {}

    if (!inputs.email) {
        errros.email = "The Email is required";
      } else if (!regexEmail.test(inputs.email)) {
        errros.email = "The Email entered is not valid";
      } else if (inputs.email.length > 70) {
        errros.email = "The Email entered is too long";
      }
      if (!inputs.password) {
        errros.password = "The password is required";
      } else if (!regexPasword.test(inputs.password)) {
        errros.password = "The password entered is not valid";
    
      }
          if (!inputs.username) {
        errros.username = "The username is required";
      } else if (inputs.username.length < 4 || inputs.username.length > 20) {
        errros .username = "The username length is not valid";
      }
      
      if (!/^[a-zA-Z]+$/.test(inputs.name)) {
        errros.name = "The name can only contain letters";
      }
      if (!/^[a-zA-Z]+$/.test(inputs.last_name)) {
        errros.last_name = "The name can only contain letters";
      }
    return errros;
}

export function validateEvent(inputs){
    let errros = {}    
    if(!inputs.eventname) errros.eventname= "Su evento no puede estar vacio"

    return errros;
}
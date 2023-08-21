const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPasword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export function validateUser(inputs){
    let errors = {}

    if (!inputs.email) {
        errors.email = "The Email is required";
      } else if (!regexEmail.test(inputs.email)) {
        errors.email = "The Email entered is not valid";
      } else if (inputs.email.length > 70) {
        errors.email = "The Email entered is too long";
      }
      if (!inputs.password) {
        errors.password = "The password is required";
      } else if (!regexPasword.test(inputs.password)) {
        errors.password = "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
    
      }
          if (!inputs.username) {
        errors.username = "The username is required";
      } else if (inputs.username.length < 4 || inputs.username.length > 20) {
        errors .username = "The username length is not valid";
      }
      
      if (!/^[a-zA-Z]+$/.test(inputs.name)) {
        errors.name = "The name can only contain letters";
      }
      if (!/^[a-zA-Z]+$/.test(inputs.last_name)) {
        errors.last_name = "The name can only contain letters";
      }
    return errors;
}

export function validateEvent(inputs){
    let errors = {}    
    if(!inputs.eventname) errors.eventname= "Su evento no puede estar vacio"

    return errors;
}
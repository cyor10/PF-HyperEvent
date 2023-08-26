const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPasword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).{8,}$/
const regexImage = /\.(jpg|jpeg|png)$/;

export function validateLogin(inputs) {
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
        errors.password = "The password entered is not valid";
      }
      return errors
}

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
        errors.password = "The password entered is not valid";
      }
          if (!inputs.username) {
        errors.username = "The username is required";
      } else if (inputs.username.length < 4 || inputs.username.length > 20) {
        errors .username = "The username length is not valid";
      }
      
      if (!/^[a-zA-Z]*$/.test(inputs.name)) {
        errors.name = "The name can only contain letters";
      }
      if (!/^[a-zA-Z]*$/.test(inputs.last_name)) {
        errors.last_name = "The name can only contain letters";
      }
      if(!inputs.file){
        errors.file = "You must upload an image"
      } /* else if(!regexImage.test(inputs.file.name)){
        errors.file = "Select a valid image format"
      } */
    return errors;
}

export function validateEventField(inputs) {
  let errors = {};

  // Perform validation based on the input field name
  if (!inputs.event_name) {
    errors.event_name = "Event Name is required";
  }
  if (!inputs.org_name) {
    errors.org_name = "Organization Name is required";
  }
  if (!inputs.stock) {
    errors.stock = "Maximum of 1000, contact sales for more";
  }
  if(!inputs.event_image){
    errors.event_image = "Select a valid image format"
  }
  if(inputs.place_name){
    errors.place_name === "Place name is required"
  }
  if(!inputs.adress){
    errors.adress = "Adress is required"
  }
  if(!inputs.city){
    errors.city = "City is required"
  }
  if(!inputs.country){
    errors.country = "Country is required"
  }
  if(!inputs.postal){
    errors.postal = "Postal code is required"
  }
  if(!inputs.intro){
    errors.intro = "Summary is required"
  }
  if(inputs.intro.length >140){
    errors.intro = "Max chars 140"
  }
  if(!inputs.description){
    errors.description = "Description is required"
  }
  if(!inputs.start_at){
    errors.start_at = "Start time is required"
  }
  if(!inputs.end_at){
    errors.end_at = "End time is required"
  }
  return errors;
}



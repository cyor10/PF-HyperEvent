const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPasword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const regexImage = /\.(jpg|jpeg|png)$/;

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
      
      if (!/^[a-zA-Z\s]*$/.test(inputs.name)) {
        errors.name = "The name can only contain letters";
      }
      if (!/^[a-zA-Z\s]*$/.test(inputs.last_name)) {
        errors.last_name = "The name can only contain letters";
      }
      if(!inputs.file){
        errors.file = "You must upload an image"
      } else if(!regexImage.test(inputs.file.name)){
        errors.file = "Select a valid image format"
      }
    return errors;
}

export function validateEventField(name, value) {
  const errors = {};

  // Perform validation based on the input field name
  if (name === "event_name" && !value) {
    errors[name] = "Event Name is required";
  }
  if (name === "org_name" && !value) {
    errors[name] = "Organization Name is required";
  }
  if (name === "stock" && value>1000) {
    errors[name] = "Maximum of 1000, contact sales for more";
  }
  if(name === "event_image" && !regexImage.test(value.name)){
    errors[name] = "Select a valid image format"
  }
  if(name === "place_name" && !value){
    errors[name] === "Place name is required"
  }
  if(name ==="adress" && value.length<1){
    errors[name] = "Adress is required"
  }
  if(name ==="city" && !value){
    errors[name] = "City is required"
  }
  if(name ==="country" && !value){
    errors[name] = "Country is required"
  }
  if(name === "postal" && !value){
    errors[name] = "Postal code is required"
  }
  if(name === "intro" && !value){
    errors[name] = "Summary is required"
  }
  if(name === "intro" && value.length>140){
    errors[name] = "Max chars 140"
  }
  if(name === "description" && !value){
    errors[name] = "Description is required"
  }
  if(name ==="start_at" && !value){
    errors[name] = "Start time is required"
  }
  if(name ==="end_at" && !value){
    errors[name] = "End time is required"
  }
  return errors;
}



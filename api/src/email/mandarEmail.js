const nodemailer =  require('nodemailer');

async function sendEmail(newUser) { // Pasar los datos del usuario como argumento
    const transport = nodemailer.createTransport({
      service: "Gmail",
      port: 465, 
      secure: true, 
      auth: {
        user: "my.hyperevents@gmail.com",
        pass: "lbgkhodyukbjxrdk",
      },
    });

    const imageUrl ="https://cdn.discordapp.com/attachments/1137881023183593592/1142140899976032296/OIG.png";
    const emailContent = `
    <div style="background-color: #f2f2f2; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">¡Bienvenido a  HYPER EVENTS!</h2>
        <p>Hola ${newUser.name + newUser.last_name},</p>
        <p>Gracias por registrarte en HYPER EVENTS. ¡Te damos la bienvenida a nuestra comunidad!...</p>
        <p>Tus detalles de cuenta:</p>
        <ul>
          <li>Nombre de usuario: ${newUser.name + newUser.last_name}</li>
          <li>Correo electrónico: ${newUser.email}</li>
        </ul>
        <p>Recuerda que puedes acceder a tu cuenta en cualquier momento para explorar y participar en los eventos que más te interesen...</p>
        <p>¡Esperamos verte pronto en HYPER EVENTS!</p>
        <p>Saludos,<br>El equipo de HYPER EVENTS</p>
        <img src="${imageUrl}" alt="Imagen de firma" style="max-width: 20%; margin-top: 20px;">
      </div>
    </div>
  `;
      try {
          await transport.sendMail( {
            from: "my.hyperevents@gmail.com",
            to: newUser.email,
            subject: "¡Bienvenido a HYPER EVENTS!",
            html: emailContent,

                });
                console.log('Correo electrónico enviado correctamente.');
              } catch (error) {
                console.error('Error al enviar el correo electrónico:', error);
              };        
   
    }

    async function sendEmailPayment(newUser) { // Pasar los datos del usuario como argumento
      const transport = nodemailer.createTransport({
        service: "Gmail",
        port: 465, 
        secure: true, 
        auth: {
          user: "my.hyperevents@gmail.com",
          pass: "lbgkhodyukbjxrdk",
        },
      });
      let emailContent=""
      const imageUrl ="https://cdn.discordapp.com/attachments/1137881023183593592/1142140899976032296/OIG.png";
      if(newUser.status==="approved"){      
        emailContent = `
      <div style="background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">¡Gracias por tu compra!</h2>
          <p>Hola ${newUser.name + " " + newUser.last_name},</p>
          <p>Gracias por confiar en HYPER EVENTS.</p>
          <p>Detalles de tu compra:</p>
          <ul>
            <li>Nombre de usuario: ${newUser.name + newUser.last_name}</li>
            <li>Correo electrónico: ${newUser.email}</li>
            <li>Total de compra: $${newUser.amount} pesos</li>
          </ul>
          <p>Recuerda que puedes acceder a tus tickets desde la pagina</p>
          <p>¡Esperamos que disfrutes tu evento!</p>
          <p>Saludos,<br>El equipo de HYPER EVENTS</p>
          <img src="${imageUrl}" alt="Imagen de firma" style="max-width: 20%; margin-top: 20px;align-items: center;">
        </div>
      </div>
    `;}
    if(newUser.status==="failure"){
      emailContent = `
      <div style="background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">¡No se pudo concretar tu compra!</h2>
          <p>Hola ${newUser.name + " " + newUser.last_name},</p>
          <p>Lamentablemente hubo un error con tu compra.</p>
          <p>Puedes volver a intentarlo o contactarte con el administrador</p>
          <p>¡Esperamos que puedas disfrutar de tu evento!</p>
          <p>Saludos,<br>El equipo de HYPER EVENTS</p>
          <img src="${imageUrl}" alt="Imagen de firma" style="max-width: 20%; margin-top: 20px;align-items: center;">
        </div>
      </div>
    `
    }
    if(newUser.status==="pending"){
      emailContent = `
      <div style="background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">¡Su compra se encuentra pendiente!</h2>
          <p>Hola ${newUser.name + " " + newUser.last_name},</p>
          <p>Una vez se realize su pago recibira un mail con las entradas correspondientes.</p>
          <p>Muchas gracias por confiar en HYPER EVENTS</p>
          <p>¡Esperamos que puedas disfrutar de tu evento!</p>
          <p>Saludos,<br>El equipo de HYPER EVENTS</p>
          <img src="${imageUrl}" alt="Imagen de firma" style="max-width: 20%; margin-top: 20px; align-items: center;">
        </div>
      </div>
    `
    }

        try {
            await transport.sendMail( {
              from: "my.hyperevents@gmail.com",
              to: newUser.email,
              subject: "¡Compras en HyperEvents!",
              html: emailContent,
  
                  });
                  console.log('Correo electrónico enviado correctamente.');
                } catch (error) {
                  console.error('Error al enviar el correo electrónico:', error);
                };        
      }
    module.exports = { sendEmail , sendEmailPayment }

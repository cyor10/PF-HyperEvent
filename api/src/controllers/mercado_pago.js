//todo: Implementar controller para Mercado pago  ... x*xx**xxx***
require("dotenv").config();
const { MERCADOPAGO_ACCESS_TOKEN } = process.env;

const mercadopago = require("mercadopago");
//* Librería -> { configure, preferences:{create} }

mercadopago.configure({
  sandbox: true,
  access_token: `${MERCADOPAGO_ACCESS_TOKEN}`,
});
 
const pagar = (req, res) => {
  const { monto, descripcion } = req.body;
  // descripcion   "tv celu ventilador"
  const preference = {
    items: [
      { 
        title: descripcion,
        unit_price: parseFloat(monto),
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://127.0.0.1:3000/",
      failure: "http://127.0.0.1:3000/",
      pending: "http://127.0.0.1:3000/",
    },
    auto_return: "approved",
  }; 

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      // init_point -> es una url donde voy a poder realizar mi pago
      res.json({ init_point: response.body.init_point });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error al crear preferencia de pago" });
    });
};

module.exports = {
  pagar,
};

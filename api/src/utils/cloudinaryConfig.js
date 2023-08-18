const cloudinary = require("cloudinary").v2

cloudinary.config({ 
  cloud_name: 'hyperevents', 
  api_key: '354843391925314', 
  api_secret: 'In3YdDwhmSZ9-PIYpxo0ZF6kM94' 
});

module.exports = cloudinary

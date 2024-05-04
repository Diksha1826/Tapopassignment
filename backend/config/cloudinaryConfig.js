const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dhstzwele' , 
    api_key: '995861233519374' , 
    api_secret: 'kbWglc1i19_jZuJ3IpzndG_vBYI' ,
  });

  module.exports = cloudinary ;
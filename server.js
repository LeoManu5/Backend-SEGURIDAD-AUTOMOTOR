const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const products = require('./data/products.json'); 

const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  
  socket.emit('products', products);

  
  socket.on('new-product', (product) => {
    products.push(product);
    io.emit('products', products); 
  });

  
  socket.on('delete-product', (id) => {
    const index = products.findIndex((prod) => prod.id === id);
    if (index !== -1) {
      products.splice(index, 1); 
      io.emit('products', products); 
    }
  });
});

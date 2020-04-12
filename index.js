
const express = require('express');
const expressApp = express();
const bodyParser = require('body-parser');

const http = require('http').createServer(expressApp);
const io = require('socket.io')(http);
const helmet = require('helmet');
const { createStore } = require('redux');
const { dialogflow } = require('actions-on-google');

const { adjustSupers, adjustFrames, takeNote, adjustWeight, adjustBrood } = require('./actions');
const reducer = require('./reducer');

const app = dialogflow({ debug: true });
const store = createStore(reducer);
const port = 3000;

expressApp.use(bodyParser.json());
expressApp.use(helmet());

app.intent('edit beehive', (conv, { beehive }) => {
  conv.ask(`Visite de la ruche ${beehive}`);
});

app.intent(['sumarize', 'sumarizeWithContext'], (conv, { beehive }) => {
  const state = store.getState();
  const { supers, frames, brood } = state[beehive];
  let res = `Ruche ${beehive}. `;
  if (typeof supers !== 'undefined') {
    res += `Contient ${frames} cadres. `;
  }
  if (typeof supers !== 'undefined') {
    res += `Contient ${supers} hausses. `;
  }
  if (typeof brood !== 'undefined') {
    res += `Quantité de couvain : ${brood}. `;
  }
  conv.ask(res);
});

app.intent('supers', (conv, { supers, beehive }) => {
  store.dispatch(adjustSupers(beehive, supers));
  conv.ask('Ok, la ruche ' + beehive + ' possède donc ' + supers + ' hausse.');
});

app.intent('frames', (conv, { frames, beehive }) => {
  store.dispatch(adjustFrames(beehive, frames));
  conv.ask('La ruche ' + beehive + ' possède maintenant ' + frames + ' cadres.');
});

app.intent('brood', (conv, { quantity, beehive }) => {
  store.dispatch(adjustBrood(beehive, quantity));
  conv.ask(`Quantité de couvain : ${quantity}`);
});

app.intent(['weight', 'weightWithBeehive'], (conv, { weight, beehive }) => {
  store.dispatch(adjustWeight(beehive, weight));
  conv.ask('Le poids de ' + weight + ' kg a bien été enregistré pour la ruche ' + beehive + '.');
});

app.intent('note', (conv, { text, beehive }) => {
  store.dispatch(takeNote(beehive, text));
  conv.ask('J\'ai bien enregistré la note pour la ruche ' + beehive);
});


expressApp.use('/static', express.static('client/dist'));

expressApp.get('/client', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

expressApp.post('/diagflow', app);

io.on('connection', function(socket){
  console.log('a user connected');
  const state = store.getState();
  socket.emit('new state', state);
});

store.subscribe(() => io.emit('new state', store.getState()));

http.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
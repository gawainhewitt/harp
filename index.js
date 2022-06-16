const EventBinders = require('./eventBinders');
const EventHandlers = require('./eventHandlers');
const CoolStuffHappens = require('./coolStuffHappens');

const eventBinders = new EventBinders;
const coolStuffHappens = new CoolStuffHappens;
const eventHandlers = new EventHandlers(eventBinders, coolStuffHappens);


class Storage {

  prefix = '';

  loadEvents = [];

  triggerEvents = [];

  constructor(prefix) {
    this.prefix = prefix ? `${prefix}-` : '';
  }

  registLoadEvent({ eventName, callback }) {
    this.loadEvents.push({
      eventName: `${this.prefix}${eventName}`,
      callback,
    });
  }

  registTriggerEvent({ eventName, callback }) {
    this.triggerEvents.push({
      eventName: `${this.prefix}${eventName}`,
      callback,
    });
  }

  listen(delay = 0) {
    setTimeout(() => {
      this.loadEvents.forEach((localEvent) => {
        localStorage.setItem(localEvent.eventName, Date.now());
      });
      window.addEventListener('storage', (event) => {
        if (!event.newValue || event.newValue === 'null' || event.key === 'jfVersion') {
          return;
        }
        // console.log('>>>> ', event.newValue, event);
        const newData = JSON.parse(event.newValue).data;
        const allEventsList = this.loadEvents.concat(this.triggerEvents);
        allEventsList.forEach((localEvent) => {
          if (localEvent.eventName === event.key) {
            if (localEvent.callback) {
              localEvent.callback(newData);
            }
          }
        });
      });
    }, delay);
  }

  trigger(eventName, data) {
    localStorage.setItem(`${this.prefix}${eventName}`, JSON.stringify({ data }));
    localStorage.removeItem(`${this.prefix}${eventName}`);
  }
}

export default Storage;

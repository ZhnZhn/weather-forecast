import EventEmitter from 'eventemitter3';

const eventCenter = new EventEmitter();
if (eventCenter.setMaxListeners) {
  eventCenter.setMaxListeners(10);
}

export { eventCenter }
export const SYNC_EVENT = 'recharts.syncMouseEvents'

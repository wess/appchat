import {Storage} from '@ionic/storage';

const _key = (key: string) => `tessatalk_${key}`;

const _storage = new Storage();

const datastore = {
  init: async () => {
    const db = await _storage.create();

    return db;
  },

  get: async (key:string, fallback:any = null):Promise<any|null> => {
    var res = await _storage.get(_key(key));
    if(res != null) {
      return JSON.parse(res);
    }

    return fallback;
  },

  set: async (key:string, value:any) => {
    await _storage.set(
      _key(key), 
      JSON.stringify(value)
    );
  },

  delete: async (key:string): Promise<any | null> => {
    let res = await _storage.get(_key(key));

    if(res != null) {
      await _storage.remove(_key(key));
    }

    return res;
  },

  clear: async() => {
    await _storage.clear();
  }
}


export default datastore;
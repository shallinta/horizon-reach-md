const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const SIGN_IN = 'auth/SIGN_IN';
const SIGN_OUT = 'auth/SIGN_OUT';
const SET_RECORD = 'auth/SET_RECORD';
const CLEAR_RECORD = 'auth/CLEAR_RECORD';

const initialState = {
  loaded: false,
  record: [],
  user: '',
};

/**
 * @module redux/modules/auth
 * @return {Object}
 */
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SIGN_IN:
      return {
        ...state,
        user: action.data,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: '',
      };
    case SET_RECORD:
      return {
        ...state,
        record: Array.from(state.record).concat(action.data),
      };
    case CLEAR_RECORD:
      return {
        ...state,
        record: []
      };
    default:
      return state;
  }
}

/**
 * Check whether the auth data has been loaded
 * @return {Boolean}
 */
// export function isLoaded(globalState) {
//   return globalState.auth && globalState.auth.loaded;
// }

/**
 * Load auth data from API server
 * @return {Object}
 */
// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: client => client.get('/api/loadAuth')
//   };
// }

/**
 * sign in
 * @method signIn
 * @return {Object}
 */
export function signIn(data) {
  return {
    type: SIGN_IN,
    data,
  };
}

/**
 * sign out
 * @method signOut
 * @return {Object}
 */
export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

/**
 * record message
 * @return {Object}
 */
export function setRecord(data) {
  return {
    type: SET_RECORD,
    data,
  };
}

/**
 * clear records
 * @method clearRecord
 * @return {Object}
 */
export const clearRecord = () => ({
  type: CLEAR_RECORD,
});

// constants/SmallConstants.js
var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000/api/";
var APIVersion = "v1";
var Root = APIRoot + APIVersion;

module.exports = {

  API_URL: Root,

  APIEndpoints: {
    LOGIN:          Root + "/auth/sign_in",
    REGISTRATION:   Root + "/auth"
    // STORIES:        Root + "/auth/stories"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    SIGN_UP_REQUEST: null,
    SIGN_UP_RESPONSE: null,
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    LOGOUT: null,

    // Routes
    REDIRECT: null

    // LOAD_STORIES: null,
    // RECEIVE_STORIES: null,
    // LOAD_STORY: null,
    // RECEIVE_STORY: null,
    // CREATE_STORY: null,
    // RECEIVE_CREATED_STORY: null
  })

};
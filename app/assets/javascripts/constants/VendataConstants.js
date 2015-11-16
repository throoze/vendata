// constants/SmallConstants.js
var keyMirror = require('keymirror');

var APIRoot    = "http://localhost:3000/api/";
var APIVersion = "v1";
var Root       = APIRoot + APIVersion;

module.exports = {

  API_URL: Root,

  APIEndpoints: {
    // Auth
    LOGIN:        Root + "/auth/sign_in",
    REGISTRATION: Root + "/auth",

    // Schemata
    SCHEMATA:              Root + "/schemata",              // GET
    SCHEMATA_COLLECTIONS:  Root + "/schemata/collections",  // GET
    SCHEMATA_DESCRIPTIONS: Root + "/schemata/descriptions", // GET
    SCHEMATA_PARENTHOOD:   Root + "/schemata/parenthood",   // GET
    SCHEMATA_INHERITANCE:  Root + "/schemata/inheritance",  // GET
    SCHEMATA_CONSTRAINTS:  Root + "/schemata/constraints",  // GET

    // Scrapping
    SCRAPPING_GET_DOC_FOR_SCRAPPING:  Root + "/scrapping/new.json",          // GET
    SCRAPPING_POST_SCRAPPED_DOC:      Root + "/scrapping/new",               // POST
    SCRAPPING_GET_DOC_FOR_VALIDATING: Root + "/scrapping/validate/new.json", // GET
    SCRAPPING_POST_VALIDATED_DOC:     Root + "/scrapping/validate/new"       // POST
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    LOGOUT: null,

    // Routes
    REDIRECT: null,

    // Scrapping
    LOAD_SCHEMATA: null,
    RECEIVE_SCHEMATA: null,
    LOAD_DOC_FOR_SCRAPPING: null,
    RECEIVE_DOC_FOR_SCRAPPING: null,
    LOAD_DOC_FOR_VALIDATION: null,
    RECEIVE_DOC_FOR_VALIDATION: null,
    CREATE_DOC: null,
    RECEIVE_CREATED_DOC: null,
    VALIDATE_DOC: null,
    RECEIVE_VALIDATED_DOC: null
  }),

  DocumentCloud: {
    oEmbed: {
        params :{
            maxheight: 750,
            maxwidth: 600,
            container: '#my-document-div',
            notes: false, // default: true
            text: true, // default: true
            zoom: true, // default: true
            search: true, // default: true
            sidebar: false, // default: true
            pdf: true, // default: true
            responsive: true, // default: false
            responsive_offset: 50
            // default_note: 1,
            // default_page: 1,
        }
    }
  },

  Strings: {
    SCRAP_NEW: "Scrappear nuevo...",
    VALIDATE_NEW: "Validar nuevo..."
  }

};
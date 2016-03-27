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
        REGISTRATION: Root + "/auth/",
        LOGOUT:       Root + "/auth/sign_out",
        UPDATE:       Root + "/auth/",
        USERS_STATISTICS: "/users_statistics", //GET

        // Schemata
        SCHEMATA:              Root + "/schemata",              // GET
        SCHEMATA_COLLECTIONS:  Root + "/schemata/collections",  // GET
        SCHEMATA_DESCRIPTIONS: Root + "/schemata/descriptions", // GET
        SCHEMATA_PARENTHOOD:   Root + "/schemata/parenthood",   // GET
        SCHEMATA_INHERITANCE:  Root + "/schemata/inheritance",  // GET
        SCHEMATA_CONSTRAINTS:  Root + "/schemata/constraints",  // GET

        // Scraping
        SCRAPING_GET_DOC_FOR_SCRAPING:   Root + "/scraping/new.json",          // GET
        SCRAPING_POST_SCRAPED_DOC:       Root + "/scraping/new",               // POST
        SCRAPING_GET_DOC_FOR_VALIDATING: Root + "/scraping/validate/new.json", // GET
        SCRAPING_POST_VALIDATED_DOC:     Root + "/scraping/validate/new",      // POST
        SCRAPING_LOAD_CONSTANT_CLASS:    Root + "/scraping/constant",          // GET
        SCRAPING_CREATE_CONSTANT_CLASS:  Root + "/scraping/constant"           // POST
    },

    Roles: {
        // ROLES = [:banned, :scraper, :validator, :admin]
        ADMIN: "admin",
        VALIDATOR: "validator",
        SCRAPER: "scraper",
        BANNED: "banned"
    },

    Events: {
        CHANGE: 'change',
        SCHEMATA_CHANGE: 'schemata_change',
        CONSTANTS_CHANGE: 'constants_change'
    },

    PayloadSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        // Session
        CREATE_REQUEST: null,
        CREATE_RESPONSE: null,
        LOGIN_REQUEST: null,
        LOGIN_RESPONSE: null,
        LOGOUT_REQUEST: null,
        LOGOUT_REPONSE: null,
        UPDATE_REQUEST: null,
        UPDATE_RESPONSE: null,
        LOAD_USER: null,
        LOAD_USERS_STATISTICS: null,
        RECEIVE_LOAD_USER: null,
        RECEIVE_USERS_STATISTICS: null,
        // Routes
        REDIRECT: null,

        // Scraping
        LOAD_SCHEMATA: null,
        RECEIVE_SCHEMATA: null,
        LOAD_DOC_FOR_SCRAPING: null,
        RECEIVE_DOC_FOR_SCRAPING: null,
        LOAD_DOC_FOR_VALIDATION: null,
        RECEIVE_DOC_FOR_VALIDATION: null,
        CREATE_DOC: null,
        RECEIVE_CREATED_DOC: null,
        VALIDATE_DOC: null,
        RECEIVE_VALIDATED_DOC: null,
        CLEAR_DOC: null,
        RECEIVE_CLEAR_DOC: null,
        LOAD_CONSTANT_CLASS: null,
        RECEIVE_CONSTANT_CLASS: null,
        CREATE_CONSTANT_CLASS: null

    }),

    DocumentCloud : {
        params: {
            "showAnnotations":  false,
            "container":        "#document-visor",
            "notes":            false,
            "text":             true,
            "zoom":             true,
            "search":           true,
            "sidebar":          false,
            "pdf":              true,
            "responsive":       false,
            "default_page":     1
        }
    },

    Strings: {
        LOADING:                   "Cargando...",
        SEARCHING:                 "Buscando...",
        SUBMIT:                    "Enviar",
        DELETE:                    "Eliminar",
        ADD:                       "Agregar",
        CLOSE:                     "Cerrar",
        CREATED:                   "Creado!",
        SUCCESSFULLY_CREATED:      "La entidad ha sido creada con éxito!",
        PLACEHOLDER_TEXT:          "Introduzca el texto",
        PLACEHOLDER_EMAIL:         "Introduzca el correo electrónico",
        PLACEHOLDER_PASSWORD:      "Introduzca la contraseña",
        PLACEHOLDER_DATE:          "Introduzca la fecha: dd-mm-aaaa",
        PLACEHOLDER_NUMBER:        "Introduzca el número",
        PLACEHOLDER_CHOOSE:        "Seleccione",
        HELP:                      "Ayuda",
        FAQ:                       "Preguntas Frecuentes",
        SUPPORT:                   "Soporte técnico",
        CREATE_NEW:                "Crear nuevo",
        NO_RESULTS:                "No se encontraron resultados",

        SCRAP_NEW:                 "Nuevo documento",
        VALIDATE_NEW:              "Validar nuevo",
        SCRAPING_FORM_TITLE:       "Formulario de vaciado",
        SCRAPING_REQUEST_DOC:      "Para empezar, solicita un nuevo documento.",
        CLEAR_DOC:                 "Limpiar documento",
        DOWNLOAD_PDF:              "Descarga el PDF",
        CHOOSE_ALTERNATIVE_ENTITY: "Seleccione el tipo de elemento a vaciar",
        SUCCESSFULLY_SCRAPED:      "El documento fue vaciado correctamente!",

        PROFILE:                   "Perfil",
        ACTIONS:                   "Acciones",
        ROLE:                      "Rol",
        NAME:                      "Nombre",
        NICKNAME:                  "Nickname",
        EMAIL:                     "Email",
        UPDATE_ACTION:             "Actualizar Informacion",
        CREATE_ACTION:             "Crear Usuario",
        SCRAPING_NUMBER:           "# Scrapings",
        VALIDATION_NUMBER:         "# Validaciones",  
        LAST_TIME_CONNECTED:       "Ultima Conexion", 
        MY_STATISTICS:             "Mis Estadisticas",
        MANAGE_USERS_STATISTICS:   "Estadisticas Globales",
        CONNECTION_NUMBER:         "# Conexiones",



        ERROR:                     "Error!",
        ERROR_FORM:                "Errores al procesar el formulario!",
        ERROR_NULL_FIELD:          "Este campo no debe ser nulo",
        ERROR_EMPTY_FIELD:         "Este campo no debe estar vacío",
        ERROR_MUST_BE_BOOLEAN:     "Este campo debe ser o verdadero o falso",
        ERROR_MUST_BE_NUMBER:      "Este campo debe ser un número",
        ERROR_MUST_BE_STRING:      "Este campo debe ser un texto",
        ERROR_MUST_BE_DATE:        "Este campo debe ser una fecha",
        ERROR_SELECT_ENTITY:       "Debe seleccionar la entidad a vaciar",
        NOTIFY_DEV_TEAM:           "Tome nota de los pasos que siguió para producir el error, y notifíquelo al equipo de desarrollo."
    },

    Utils: {
        startsWith: function (string, prefix) {
            return string.slice(0, prefix.length) == prefix;
        },

        endsWith: function (string, suffix) {
            return suffix === '' || string.slice(-suffix.length) == suffix;
        },

        peel: function (string) {
            return string.substring(1, string.length-1);
        },

        labelify: function(string) {
            if (string !== null) {
                return string.split("_").map(function(word){
                    return word.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
                }).join(" ");
            } else { return null; }
        },

        reformat: function(errorList){
            var pre_formatted_errors = errorList.map(function(error, i){
                var from = error.from.reduce(function(prev, nex){
                    var previous = prev;
                    var next = nex;
                    if (!isNaN(previous)){
                        previous = (Number(prev)+1).toString();
                    }
                    if (!isNaN(next)){
                        next = (Number(nex)+1).toString();
                    }
                    return previous+" -> "+next;
                });
                error.from = from;
                return error;
            });
            var formatted_errors = {};
            pre_formatted_errors.forEach( function(element, index) {
                if (!formatted_errors[element.from])
                    formatted_errors[element.from] = [];
                formatted_errors[element.from] = formatted_errors[element.from].concat(element.error);
            });
            return formatted_errors;
        },

        dig: function(obj, f, schema) {
            var _dig = function(object, field) {
                var result = [];
                if (object.hasOwnProperty(field)) {
                    if (!schema.descriptions[object[field]].constant)
                        result.push(object);
                }
                for (var key in object){
                    if (object[key] !== null && typeof object[key] === 'object') {
                        var inner_result = _dig(object[key], field);
                        result = result.concat(inner_result);
                    }
                }
                return result;
            };
            return _dig(obj, f);
        }
    }
};
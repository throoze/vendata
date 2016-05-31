# Trello: https://trello.com/c/mhAYHNRo
# Cambios:
#
# ✓ Cambiar el efecto de los actos normativos por una lista de efectos
#
# ✓ Creación de empresa publica. Que todos los campos menos el nombre de la empresa
#   sean opcionales
#
# ✓ Nuevo acto normativo: Orden Administrativa
#
# ✓ En intervención de institución, quitar obligatoriedad del campo " registro mercantil"
#
# ✓ Los montos para aprobación de créditos adicionales o presupuesto de gastos e ingresos,
#   sólo se pueden colocar en números y no acepta puntos ni comas. Eso hay que cambiarlo,
#   porque necesitamos colocar los montos exactos y muchas veces estos vienen con decimales.
#   Esto es urgente.
#
# ✓ Hay actos normativos que no tienen número, por lo que necesitamos que esa opción también
#   acepte letras para poder colocar "No Aplica".
#
# ✓ En el efecto designación incluir empresas y organismos, además de los ciudadanos.
#
# ✓ Agregar RIF a la definición de un ciudadano, y hacer que tanto la cédula como el RIF sean
#   opcionales
#
# * Revisar el comportamiento de los campos booleanos
#
# ✓ En expropiaciones solo aparece la opción terreno, hay que agregar también empresa, porque
#   a veces te dicen terrenos "tal" o bienes e inmuebles de la empresa "tal".
#
# ✓ En el efecto "aprobación de presupuesto de gastos e ingresos", sólo te da como opción
#   "empresa beneficiaria", pero también aplica para "organismo público", habría que agregar
#   otra opción. Ahora, si esa empresa beneficiaria no aparece, hay que ingresarla como nueva,
#   y te pide todos los datos de creación de una empresa pública, pero en el caso de este acto
#   normativo no te da más datos de la empresa, solo su nombre y a quién está adscrita. Cómo
#   podemos solucionar eso?
#
# ✓ En el efecto presupuesto de gastos e ingresos, permitir tanto empresa beneficiaria, como
#   organismos públicos.
#
# * Permitir lista vacía de actos normativos
#
# * En el campo años de duración, crear un tipo nuevo de campo para años meses y días.
#
# * Cambiar el campo correspondiente en el efecto "Jubilación" por un campo de duración.

Schema.collection.drop
Schema.create([
    {
        name: "schema",
        root_collection: "Documento",
        collections: [
            "Documento",
            "GacetaOficial",
            "ActoNormativo",
            "AprobacionDeLey",
            "Decreto",
            "Resolucion",
            "LeyAprobatoria",
            "Providencia",
            "AcuerdoActoNormativo",
            "Requisitoria",
            "Autorizacion",
            "Decision",
            "Pais",
            "Nacionalidad",
            "OrganismoInternacional",
            "Ciudadano",
            "Institucion",
            "Organismo",
            "Empresa",
            "EmpresaPrivada",
            "EmpresaEstatal",
            "CuerpoPolicial",
            "EntidadBancaria",
            "Efecto",
            "Cargo",
            "Rango",
            "IntervencionDeInstitucion",
            "ProrrogaDeIntervencion",
            "Designacion",
            "Expropiacion",
            "CreditoAdicional",
            "AscensoMilitar",
            "LicenciaDeExploracionYExplotacion",
            "Acuerdo",
            "AcuerdoBilateral",
            "AcuerdoMarcoDeCooperacion",
            "AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion",
            "AcuerdoComplementarioDeCooperacion",
            "EstablecimientoDeSedeDiplomatica",
            "DelegacionDeFunciones",
            "OrdenDeAprehension",
            "Jubilacion",
            "Ley",
            "CreacionDeEmpresaEstatal",
            "CreacionDeOrganismoPublico",
            "AprobacionDePresupuestoDeIngresosOGastos",
            "AprobacionDePresupuestoParaElEjercicioFiscal"
        ],
        descriptions: {
            # Defaults field options:
            # blank: false
            # nullable: false
            Documento: {
                classname: "Documento",
                human_readable: "Documento",
                constant: false,
                abstract: true,
                fields: {
                    numero: { type: "string", label: "Número" },
                    fecha:  { type: "date" }
                }
            },
            GacetaOficial: {
                classname: "GacetaOficial",
                human_readable: "Gaceta Oficial",
                constant: false,
                abstract: false,
                extends: ["Documento"],
                fields_order: ["ano", "mes", "fecha", "numero", "tipo", "actos_normativos"],
                fields: {
                    tipo:   {
                        type: "string",
                        options: ["ordinario", "extraordinario"]
                    },
                    ano: { type: "string", label: "Año" },
                    mes: { type: "string" },
                    actos_normativos: { type: "[ActoNormativo]", nullable: true }
                }
            },
            ActoNormativo: {
                classname: "ActoNormativo",
                human_readable: "Acto Normativo",
                constant: false,
                abstract: true,
                extends: ["Documento"],
                fields: {
                    emisor: { type: "Organismo" },
                    efectos: { type: "[Efecto]" }
                }
            },
            AprobacionDeLey: {
                classname: "AprobacionDeLey",
                human_readable: "Aprobacion De Ley",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos", "deroga"],
                fields: {
                    deroga: { type: "Ley", nullable: true }
                }
            },
            OrdenAdministrativa: {
                classname: "OrdenAdministrativa",
                human_readable: "Orden Administrativa",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos"]
            },
            Decreto: {
                classname: "Decreto",
                human_readable: "Decreto",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos"]
            },
            Resolucion: {
                classname: "Resolucion",
                human_readable: "Resolucion",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos"]
            },
            LeyAprobatoria: {
                classname: "LeyAprobatoria",
                human_readable: "Ley Aprobatoria",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos"]
            },
            Providencia: {
                classname: "Providencia",
                human_readable: "Providencia",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos"]
            },
            AcuerdoActoNormativo: {
                classname: "AcuerdoActoNormativo",
                human_readable: "Acuerdo",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos"]
            },
            Requisitoria: {
                classname: "Requisitoria",
                human_readable: "Requisitoria",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos"]
            },
            Autorizacion: {
                classname: "Autorizacion",
                human_readable: "Autorizacion",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos"]
            },
            Decision: {
                classname: "Decision",
                human_readable: "Decisión",
                constant: false,
                abstract: false,
                extends: ["ActoNormativo", "Documento"],
                fields_order: ["numero", "fecha", "emisor", "efectos"]
            },
            Pais: {
                classname: "Pais",
                human_readable: "Pais",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                key: ["nombre"],
                fields_order: ["nombre", "nacionalidad"],
                fields: {
                    nombre: { type: "string" },
                    nacionalidad: { type: "string" }
                }
            },
            Nacionalidad: {
                classname: "Nacionalidad",
                human_readable: "Nacionalidad",
                constant: true,
                abstract: false,
                to_str: ["nacionalidad"],
                key: ["nacionalidad"],
                fields_order: ["nacionalidad", "pais"],
                fields: {
                    nacionalidad: { type: "string" },
                    pais: { type: "string" }
                }
            },
            OrganismoInternacional: {
                classname: "OrganismoInternacional",
                human_readable: "Organismo Internacional",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                key: ["nombre"],
                extends: ["Institucion"],
                fields_order: ["nombre", "acronimo"]
            },
            Ciudadano: {
                classname: "Ciudadano",
                human_readable: "Ciudadano",
                extends: ["Institucion"],
                constant: true,
                abstract: false,
                to_str: ["cedula", "nombre"],
                key: ["cedula"],
                fields_order: ["nombre", "cedula", "RIF", "es_militar", "pais_de_nacimiento", "nacionalidad","direccion"],
                fields: {
                    cedula: { type: "string", nullable: true },
                    RIF: { type: "string", label: "RIF", nullable: true },
                    es_militar: { 
                        type: "boolean",
                        default: false
                    },
                    pais_de_nacimiento: {
                        type: "Pais",
                        nullable: true
                    },
                    nacionalidad: {
                        type: "Nacionalidad",
                        nullable: true
                    },
                    direccion: {
                        type: "string",
                        nullable: true
                    }
                }
            },
            Institucion: {
                classname: "Institucion",
                constant: true,
                abstract: true,
                to_str: ["nombre"],
                key: ["nombre"],
                human_readable: "Institucion",
                fields: {
                    nombre: { type: "string" }
                }
            },
            Organismo: {
                classname: "Organismo",
                human_readable: "Organismo",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                key: ["nombre"],
                extends: ["Institucion"],
                fields_order: ["nombre", "acronimo", "depende_de"],
                fields: {
                    acronimo: { type: "string", label: "Acrónimo", nullable: true, blank: true },
                    depende_de: { type: "Organismo", nullable: true }
                }
            },
            Empresa: {
                classname: "Empresa",
                constant: true,
                abstract: true,
                to_str: ["nombre"],
                key: ["nombre"],
                human_readable: "Empresa",
                extends: ["Institucion"],
                fields_order: ["nombre", "acronimo"],
                fields: {
                    acronimo: { type: "string", label: "Acrónimo", nullable: true, blank: true }
                }
            },
            EmpresaPrivada: {
                classname: "EmpresaPrivada",
                human_readable: "Empresa Privada",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                key: ["nombre"],
                extends: ["Empresa", "Institucion"],
                fields_order: ["nombre", "acronimo", "registro_mercantil"],
                fields: {
                    registro_mercantil: { type: "string", nullable: true },
                    acronimo: { type: "string", label: "Acrónimo", nullable: true, blank: true }
                }
            },
            EmpresaEstatal: {
                classname: "EmpresaEstatal",
                human_readable: "Empresa Estatal",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                key: ["nombre"],
                extends: ["Empresa", "Institucion"],
                fields_order: [
                    "nombre",
                    "acronimo",
                    "capital_inicial",
                    "duracion",
                    "accionista_de",
                    "adscrita_a",
                    "filial_de"
                    ],
                fields: {
                    acronimo: { type: "string", label: "Acrónimo", nullable: true, blank: true },
                    capital_inicial: { type: "number", nullable: true, blank: true },
                    duracion: { type: "string", nullable: true, blank: true },
                    accionista_de: { type: "[Empresa]", nullable: true, blank: true },
                    adscrita_a: { type: "Organismo", nullable: true, blank: true },
                    filial_de: { type: "Institucion", nullable: true, blank: true }
                }
            },
            CuerpoPolicial: {
                classname: "CuerpoPolicial",
                human_readable: "Cuerpo Policial",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                key: ["nombre"],
                extends: ["Institucion"],
                fields_order: ["nombre", "acronimo"],
                fields: {
                    acronimo: { type: "string", label: "Acrónimo", nullable: true, blank: true }
                }
            },
            EntidadBancaria: {
                classname: "EntidadBancaria",
                human_readable: "Entidad Bancaria",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                key: ["nombre"],
                extends: ["Institucion"],
                fields_order: ["nombre", "acronimo"],
                fields: {
                    acronimo: { type: "string", label: "Acrónimo", nullable: true, blank: true }
                }
            },
            Efecto: {
                classname: "Efecto",
                human_readable: "Efecto",
                constant: false,
                abstract: true,
                fields: {
                    fecha: { type: "date" }
                }
            },
            Cargo: {
                classname: "Cargo",
                human_readable: "Cargo",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                key: ["nombre"],
                fields_order: ["nombre"],
                fields: {
                    nombre: { type: "string" }
                }
            },
            Rango: {
                classname: "Rango",
                human_readable: "Rango",
                constant: true,
                abstract: false,
                to_str: ["nombre"],
                key: ["nombre"],
                fields_order: ["nombre"],
                fields: {
                    nombre: { type: "string" }
                }
            },
            IntervencionDeInstitucion: {
                classname: "IntervencionDeInstitucion",
                human_readable: "Intervención De Institución",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "institucion", "motivo"],
                fields: {
                    institucion: { type: "Institucion" },
                    motivo: { type: "string" }
                }
            },
            ProrrogaDeIntervencion: {
                classname: "ProrrogaDeIntervencion",
                human_readable: "Prorroga De Intervención",
                extends: ["Efecto"],
                constant: false,
                abstract: false,
                fields_order: ["fecha", "institucion", "motivo", "duracion", "motivo_prorroga"],
                fields: {
                    institucion: { type: "Institucion", label: "Institución" },
                    motivo: { type: "string" },
                    duracion: { type: "string" },
                    motivo_prorroga: { type: "string", label: "Motivo de la Prórroga" }
                }
            },
            Designacion: {
                classname: "Designacion",
                human_readable: "Designación",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "ciudadano", "status", "cargo", "fecha_fin"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    status: {
                        type: "string",
                        options: ["fijo", "encargado", "ratificado"]
                    },
                    cargo: { type: "Cargo" },
                    fecha_fin: {
                        type: "date",
                        nullable: [ "status", "==", "encargado" ]
                    }
                }
            },
            Expropiacion: {
                classname: "Expropiacion",
                human_readable: "Expropiación",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "terreno", "ubicacion", "motivo", "nuevo_uso"],
                fields: {
                    terreno: { type: "string", nullable: true },
                    institucion: { type: "Institucion", label: "Institución", nullable: true },
                    ubicacion: { type: "string" },
                    motivo: { type: "string" },
                    nuevo_uso: { type: "string" }
                }
            },
            CreditoAdicional: {
                classname: "CreditoAdicional",
                human_readable: "Crédito Adicional",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "beneficiario", "monto", "destino"],
                fields: {
                    beneficiario: { type: "Institucion" },
                    monto: { type: "string" },
                    destino: { type: "string" }
                }
            },
            AscensoMilitar: {
                classname: "AscensoMilitar",
                human_readable: "Ascenso Militar",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: [
                    "fecha", 
                    "ciudadanos",
                    "graduacion",
                    "rango_nuevo",
                    "rango_anterior",
                    "promocion",
                    "componente_militar"
                    ],
                fields: {
                    ciudadanos: { type: "[Ciudadano]" },
                    graduacion: { type: "boolean" },
                    rango_nuevo: { type: "Rango" },
                    rango_anterior: { type: "Rango" },
                    promocion: { type: "string", nullable: true },
                    componente_militar: {
                        type: "string",
                        options: [
                                "Fuerzas Armadas",
                                "Aviacion",
                                "Naval",
                                "Guardia Nacional",
                                "Milicia",
                                "Guardia de Honor"
                            ]
                    }
                }
            },
            LicenciaDeExploracionYExplotacion: {
                classname: "LicenciaDeExploracionYExplotacion",
                human_readable: "Licencia De Exploración Y Explotación",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "tipo", "actividades_a_desarrollar", "empresa_beneficiaria"],
                fields: {
                    tipo: { type: "string", options: ["Revocación", "Concesión"] },
                    actividades_a_desarrollar: { type: "string" },
                    empresa_beneficiaria: { type: "Empresa" }
                }
            },
            Acuerdo: {
                classname: "Acuerdo",
                human_readable: "Acuerdo",
                constant: false,
                abstract: true,
                extends: ["Efecto"],
                fields_order: ["fecha", "paises_firmantes", "ambito"],
                fields: {
                    paises_firmantes: { type: "[Pais]" },
                    ambito: { type: "string", label: "Ámbito" },
                    duracion: { type: "string", label: "Duración" }
                }
            },
            AcuerdoBilateral: {
                classname: "AcuerdoBilateral",
                human_readable: "Acuerdo Bilateral",
                constant: false,
                abstract: false,
                extends: ["Acuerdo", "Efecto"],
                fields_order: ["fecha", "paises_firmantes", "ambito"]
            },
            AcuerdoMarcoDeCooperacion: {
                classname: "AcuerdoMarcoDeCooperacion",
                human_readable: "Acuerdo Marco De Cooperación",
                constant: false,
                abstract: false,
                extends: ["Acuerdo", "Efecto"],
                fields_order: ["fecha", "paises_firmantes", "ambito"]
            },
            AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion: {
                classname: "AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion",
                human_readable: "Acuerdo Complementario Al Acuerdo Marco De Cooperación",
                constant: false,
                abstract: false,
                extends: ["Acuerdo", "Efecto"],
                fields_order: ["fecha", "paises_firmantes", "ambito"]
            },
            AcuerdoComplementarioDeCooperacion: {
                classname: "AcuerdoComplementarioDeCooperacion",
                human_readable: "Acuerdo Complementario De Cooperación",
                constant: false,
                abstract: false,
                extends: ["Acuerdo", "Efecto"],
                fields_order: ["fecha", "paises_firmantes", "ambito"]
            },
            EstablecimientoDeSedeDiplomatica: {
                classname: "EstablecimientoDeSedeDiplomatica",
                human_readable: "Establecimiento De Sede Diplomática",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "organismo" ],
                fields: {
                    organismo: { type: "OrganismoInternacional" }
                }
            },
            DelegacionDeFunciones: {
                classname: "DelegacionDeFunciones",
                human_readable: "Delegación De Funciones",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "ciudadano", "cargo", "atribuciones"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    cargo: { type: "Cargo" },
                    atribuciones: { type: "string" }
                }
            },
            OrdenDeAprehension: {
                classname: "OrdenDeAprehension",
                human_readable: "Orden De Aprehensión",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "ciudadano", "tribunal", "delito"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    tribunal: { type: "Institucion" },
                    delito: { type: "string" }
                }
            },
            Jubilacion: {
                classname: "Jubilacion",
                human_readable: "Jubilación",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "ciudadano", "cargo", "anos_de_servicio", "institucion"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    cargo: { type: "Cargo" },
                    anos_de_servicio: { type: "number" },
                    institucion: { type: "Institucion", label: "Institución" }
                }
            },
            Ley: {
                classname: "Ley",
                human_readable: "Ley",
                constant: true,
                abstract: false,
                to_str: ["titulo"],
                key: ["titulo"],
                extends: ["Efecto"],
                fields_order: ["fecha", "titulo", "fecha_de_aprobacion", "tipo", "contenido"],
                fields: {
                    titulo: { type: "string", label: "Título" },
                    fecha_de_aprobacion: { type: "date", label: "Fecha De Aprobación" },
                    tipo: {
                        type: "string",
                        options: [
                                "organica",
                                "ordinaria",
                                "decreto ley",
                                "ley habilitante"
                            ]
                    },
                    contenido: {
                        type: "string",
                        nullable: true,
                        blank: true
                    }
                }
            },
            CreacionDeEmpresaEstatal: {
                classname: "CreacionDeEmpresaEstatal",
                human_readable: "Creación De Empresa Estatal",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "empresa"],
                fields: {
                    empresa: { type: "Empresa" }
                }
            },
            CreacionDeOrganismoPublico: {
                classname: "CreacionDeOrganismoPublico",
                human_readable: "Creación De Organismo Público",
                constant: false,
                abstract: false,
                extends: ["Efecto"],
                fields_order: ["fecha", "organismo", "sustituye_a"],
                fields: {
                    organismo: { type: "Organismo" },
                    sustituye_a: {
                        type: "Organismo",
                        nullable: true
                    }
                }
            },
            AprobacionDePresupuestoDeIngresosOGastos: {
                classname: "AprobacionDePresupuestoDeIngresosOGastos",
                human_readable: "Aprobación De Presupuesto De Ingresos O Gastos",
                extends: ["Efecto"],
                constant: false,
                abstract: false,
                fields_order: ["fecha", "empresa_beneficiaria", "monto_aprobado", "fecha_de_aprobacion"],
                fields: {
                    institucion_beneficiaria: { type: "Institucion", label: "Institución Beneficiaria" },
                    monto_aprobado: { type: "string" },
                    fecha_de_aprobacion: { type: "date", label: "Fecha De Aprobación" }
                }
            },
            AprobacionDePresupuestoParaElEjercicioFiscal: {
                classname: "AprobacionDePresupuestoParaElEjercicioFiscal",
                human_readable: "Aprobación De Presupuesto Para El Ejercicio Fiscal",
                extends: ["Efecto"],
                constant: false,
                abstract: false,
                fields_order: ["fecha", "beneficiario", "monto_aprobado", "fecha_de_aprobacion"],
                fields: {
                    beneficiario: { type: "string" },
                    monto_aprobado: { type: "string" },
                    fecha_de_aprobacion: { type: "date", label: "Fecha De Aprobación" }
                }
            }
        },
        constraints: {
            AprobacionDeLey: {
                efectos: {
                    typeIn: ["Ley"]
                }
            },
            Decreto: {
                efectos: {
                    typeIn: [
                        "CreacionDeEmpresaEstatal",
                        "CreacionDeOrganismoPublico",
                        "Designacion",
                        "Expropiacion",
                        "CreditoAdicional"
                    ]
                }
            },
            Resolucion: {
                efectos: {
                    typeIn: [
                        "CreacionDeOrganismoPublico",
                        "Designacion",
                        "IntervencionDeInstitucion",
                        "ProrrogaDeIntervencion",
                        "AscensoMilitar",
                        "LicenciaDeExploracionYExplotacion",
                        "Jubilacion"
                    ]
                }
            },
            LeyAprobatoria: {
                efectos: {
                    typeIn: [
                        "AcuerdoBilateral",
                        "AcuerdoMarcoDeCooperacion",
                        "AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion",
                        "AcuerdoComplementarioDeCooperacion",
                        "EstablecimientoDeSedeDiplomatica"
                    ]
                }
            },
            Providencia: {
                efectos: {
                    typeIn: [
                        "Designacion",
                        "DelegacionDeFunciones",
                        "Jubilacion"
                    ]
                }
            },
            AcuerdoActoNormativo: {
                efectos: {
                    typeIn: [
                        "CreditoAdicional",
                        "Designacion"
                    ]
                }
            },
            Requisitoria: {
                efectos: {
                    typeIn: ["OrdenDeAprehension"]
                }
            },
            Autorizacion: {
                efectos: {
                    typeIn: ["CreacionDeEmpresaEstatal"]
                }
            }
        },
        parenthood: {
            # Keys are the possible collections, and values are the
            # collections that extend the correspondent collection key
            # without any specific order.
            Documento: ["GacetaOficial"],
            GacetaOficial: [],
            ActoNormativo: [
                "AprobacionDeLey",
                "Decreto",
                "Resolucion",
                "LeyAprobatoria",
                "Providencia",
                "AcuerdoActoNormativo",
                "Requisitoria",
                "Autorizacion"
            ],
            AprobacionDeLey: [],
            Decreto: [],
            Resolucion: [],
            LeyAprobatoria: [],
            Providencia: [],
            AcuerdoActoNormativo: [],
            Requisitoria: [],
            Autorizacion: [],
            Decision: [],
            Pais: [],
            Nacionalidad: [],
            OrganismoInternacional: [],
            Ciudadano: [],
            Institucion: [
                "Ciudadano",
                "Organismo",
                "Empresa",
                "CuerpoPolicial",
                "EntidadBancaria"
            ],
            Organismo: [],
            Empresa: ["EmpresaPrivada", "EmpresaEstatal"],
            EmpresaPrivada: [],
            EmpresaEstatal: [],
            CuerpoPolicial: [],
            EntidadBancaria: [],
            Efecto: [
                "IntervencionDeInstitucion",
                "ProrrogaDeIntervencion",
                "Designacion",
                "Expropiacion",
                "CreditoAdicional",
                "AscensoMilitar",
                "LicenciaDeExploracionYExplotacion",
                "Acuerdo",
                "EstablecimientoDeSedeDiplomatica",
                "DelegacionDeFunciones",
                "OrdenDeAprehension",
                "Jubilacion",
                "Ley",
                "CreacionDeEmpresaEstatal",
                "CreacionDeOrganismoPublico",
                "AprobacionDePresupuestoDeIngresosOGastos",
                "AprobacionDePresupuestoParaElEjercicioFiscal"
            ],
            Cargo: [],
            Rango: [],
            IntervencionDeInstitucion: [],
            ProrrogaDeIntervencion: [],
            Designacion: [],
            Expropiacion: [],
            CreditoAdicional: [],
            AscensoMilitar: [],
            LicenciaDeExploracionYExplotacion: [],
            Acuerdo: [
                "AcuerdoBilateral",
                "AcuerdoMarcoDeCooperacion",
                "AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion",
                "AcuerdoComplementarioDeCooperacion"
            ],
            AcuerdoBilateral: [],
            AcuerdoMarcoDeCooperacion: [],
            AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion: [],
            AcuerdoComplementarioDeCooperacion: [],
            EstablecimientoDeSedeDiplomatica: [],
            DelegacionDeFunciones: [],
            OrdenDeAprehension: [],
            Jubilacion: [],
            Ley: [],
            CreacionDeEmpresaEstatal: [],
            CreacionDeOrganismoPublico: [],
            AprobacionDePresupuestoDeIngresosOGastos: [],
            AprobacionDePresupuestoParaElEjercicioFiscal: []
        },
        inheritance: {
            # Keys are the possible collections, and values are the
            # collections extended by the correspondent collection key
            # ordered by inheritance.
            Documento: [],
            GacetaOficial: ["Documento"],
            ActoNormativo: ["Documento"],
            AprobacionDeLey: ["ActoNormativo", "Documento"],
            Decreto: ["ActoNormativo", "Documento"],
            Resolucion: ["ActoNormativo", "Documento"],
            LeyAprobatoria: ["ActoNormativo", "Documento"],
            Providencia: ["ActoNormativo", "Documento"],
            AcuerdoActoNormativo: ["ActoNormativo", "Documento"],
            Requisitoria: ["ActoNormativo", "Documento"],
            Autorizacion: ["ActoNormativo", "Documento"],
            Decision: ["ActoNormativo", "Documento"],
            Pais: [],
            Nacionalidad: [],
            OrganismoInternacional: [],
            Ciudadano: ["Institucion"],
            Institucion: [],
            Organismo: ["Institucion"],
            Empresa: ["Institucion"],
            EmpresaPrivada: ["Empresa", "Institucion"],
            EmpresaEstatal: ["Empresa", "Institucion"],
            CuerpoPolicial: ["Institucion"],
            EntidadBancaria: ["Institucion"],
            Efecto: [],
            Cargo: [],
            Rango: [],
            IntervencionDeInstitucion: ["Efecto"],
            ProrrogaDeIntervencion: ["Efecto"],
            Designacion: ["Efecto"],
            Expropiacion: ["Efecto"],
            CreditoAdicional: ["Efecto"],
            AscensoMilitar: ["Efecto"],
            LicenciaDeExploracionYExplotacion: ["Efecto"],
            Acuerdo: ["Efecto"],
            AcuerdoBilateral: ["Acuerdo", "Efecto"],
            AcuerdoMarcoDeCooperacion: ["Acuerdo", "Efecto"],
            AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion: ["Acuerdo", "Efecto"],
            AcuerdoComplementarioDeCooperacion: ["Acuerdo", "Efecto"],
            EstablecimientoDeSedeDiplomatica: ["Efecto"],
            DelegacionDeFunciones: ["Efecto"],
            OrdenDeAprehension: ["Efecto"],
            Jubilacion: ["Efecto"],
            Ley: ["Efecto"],
            CreacionDeEmpresaEstatal: ["Efecto"],
            CreacionDeOrganismoPublico: ["Efecto"],
            AprobacionDePresupuestoDeIngresosOGastos: ["Efecto"],
            AprobacionDePresupuestoParaElEjercicioFiscal: ["Efecto"]
        }
    }
])
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Schema definition. Describes how documents are expected to be:

# DUDA: Jubilacion[:institucion]: Institucion u Organismo????

Schema.create([
    {
        name: "schema",
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
            "CreacionDeOrganismoPublico"
        ],
        descriptions: {
            Documento: {
                classname: "Documento",
                human_readable: "Documento",
                fields: {
                    numero: { type: "int" },
                    fecha:  { type: "date" },
                    tipo:   {
                        type: "string",
                        constraints: {
                            valueIn: ["ordinario", "extraordinario"]
                        }
                    },
                    listo:  { type: "boolean" },
                }
            },
            GacetaOficial: {
                classname: "GacetaOficial",
                human_readable: "Gaceta Oficial",
                extends: ["Documento"],
                fields: {
                    documentos: { type: "[ActoNormativo]" }
                }
            },
            ActoNormativo: {
                classname: "ActoNormativo",
                human_readable: "Acto Normativo",
                extends: ["Documento"],
                fields: {
                    emisor: { type: "Organismo" },
                    efecto: { type: "Efecto" }
                }
            },
            AprobacionDeLey: {
                classname: "AprobacionDeLey",
                human_readable: "Aprobacion De Ley",
                extends: ["ActoNormativo", "Documento"],
                fields: {
                    deroga: {
                        type: "Ley",
                        nullable: true
                     }
                }
            },
            Decreto: {
                classname: "Decreto",
                human_readable: "Decreto",
                extends: ["ActoNormativo", "Documento"]
            },
            Resolucion: {
                classname: "Resolucion",
                human_readable: "Resolucion",
                extends: ["ActoNormativo", "Documento"]
            },
            LeyAprobatoria: {
                classname: "LeyAprobatoria",
                human_readable: "Ley Aprobatoria",
                extends: ["ActoNormativo", "Documento"]
            },
            Providencia: {
                classname: "Providencia",
                human_readable: "Providencia",
                extends: ["ActoNormativo", "Documento"]
            },
            AcuerdoActoNormativo: {
                classname: "AcuerdoActoNormativo",
                human_readable: "Acuerdo",
                extends: ["ActoNormativo", "Documento"]
            },
            Requisitoria: {
                classname: "Requisitoria",
                human_readable: "Requisitoria",
                extends: ["ActoNormativo", "Documento"]
            },
            Autorizacion: {
                classname: "Autorizacion",
                human_readable: "Autorizacion",
                extends: ["ActoNormativo", "Documento"]
            },
            Pais: {
                classname: "Pais",
                human_readable: "Pais",
                fields: {
                    nombre: { type: "string" },
                    nacionalidad: { type: "string" }
                }
            },
            Nacionalidad: {
                classname: "Pais",
                human_readable: "Pais",
                fields: {
                    nacionalidad: { type: "string" },
                    pais: { type: "string" }
                }
            },
            OrganismoInternacional: {
                classname: "OrganismoInternacional",
                human_readable: "Organismo Internacional",
                fields: {
                    nombre: { type: "string" },
                    acronimo: { type: "string" }
                }
            },
            Ciudadano: {
                classname: "Ciudadano",
                human_readable: "Ciudadano",
                fields: {
                    nombre: { type: "string" },
                    cedula: { type: "string" },
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
                human_readable: "Institucion",
                fields: {
                    nombre: { type: "string" },
                    acronimo: { type: "string" }
                }
            },
            Organismo: {
                classname: "Organismo",
                human_readable: "Organismo",
                extends: ["Institucion"],
                fields: {
                    depende_de: {
                        type: "Organismo",
                        nullable: true
                    }
                }
            },
            Empresa: {
                classname: "Empresa",
                human_readable: "Empresa",
                extends: ["Institucion"]
            },
            EmpresaPrivada: {
                classname: "EmpresaPrivada",
                human_readable: "Empresa Privada",
                extends: ["Empresa", "Institucion"],
                fields: {
                    registro_mercantil: { type: "string" }
                }
            },
            EmpresaEstatal: {
                classname: "EmpresaEstatal",
                human_readable: "Empresa Estatal",
                extends: ["Empresa", "Institucion"],
                fields: {
                    capital_inicial: { type: "number" },
                    duracion: { type: "string" },
                    accionista_de: { type: "[Empresa]" },
                    adscrita_a: {
                        type: "Organismo",
                        nullable: true
                    }
                }
            },
            CuerpoPolicial: {
                classname: "CuerpoPolicial",
                human_readable: "Cuerpo Policial",
                extends: ["Institucion"]
            },
            EntidadBancaria: {
                classname: "EntidadBancaria",
                human_readable: "Entidad Bancaria",
                extends: ["Institucion"]
            },
            Efecto: {
                classname: "Efecto",
                human_readable: "Efecto",
                fields: {
                    fecha: { type: "date" }
                }
            },
            Cargo: {
                classname: "Cargo",
                human_readable: "Cargo",
                fields: {
                    nombre: { type: "string" }
                }
            },
            Rango: {
                classname: "Rango",
                human_readable: "Rango",
                fields: {
                    nombre: { type: "string" }
                }
            },
            IntervencionDeInstitucion: {
                classname: "IntervencionDeInstitucion",
                human_readable: "Intervencion De Institucion",
                extends: ["Efecto"],
                fields: {
                    institucion: { type: "Institucion" },
                    motivo: { type: "string" }
                }
            },
            ProrrogaDeIntervencion: {
                classname: "ProrrogaDeIntervencion",
                human_readable: "Prorroga De Intervencion",
                extends: ["Efecto"],
                fields: {
                    institucion: { type: "Institucion" },
                    motivo: { type: "string" },
                    duracion: { type: "string" },
                    motivo_prorroga: { type: "string" }
                }
            },
            Designacion: {
                classname: "Designacion",
                human_readable: "Designacion",
                extends: ["Efecto"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    status: {
                        type: "string",
                        constraints: {
                            valueIn: ["fijo", "encargado", "ratificado"]
                        }
                    },
                    cargo: { type: "Cargo" },
                    fecha_fin: {
                        type: "date",
                        constraints: {
                            nullable: "this.status == 'encargado'",
                        }
                    }
                }
            },
            Expropiacion: {
                classname: "Expropiacion",
                human_readable: "Expropiacion",
                extends: ["Efecto"],
                fields: {
                    terreno: { type: "string" },
                    ubicacion: { type: "string" },
                    motivo: { type: "string" },
                    nuevo_uso: { type: "string" }
                }
            },
            CreditoAdicional: {
                classname: "CreditoAdicional",
                human_readable: "Credito Adicional",
                extends: ["Efecto"],
                fields: {
                    beneficiario: { type: "Institucion" },
                    monto: { type: "number" },
                    destino: {type: "string" }
                }
            },
            AscensoMilitar: {
                classname: "AscensoMilitar",
                human_readable: "Ascenso Militar",
                extends: ["Efecto"],
                fields: {
                    ciudadanos: { type: "[Ciudadano]" },
                    graduacion: { type: "boolean" },
                    rango_nuevo: { type: "Rango" },
                    rango_anterior: { type: "Rango" },
                    promocion: {
                        type: "string",
                        nullable: true
                    },
                    componente_militar: {
                        type: "string",
                        constraints: {
                            valueIn: [
                                "Fuerzas Armadas",
                                "Aviacion",
                                "Naval",
                                "Guardia Nacional",
                                "Milicia",
                                "Guardia de Honor"
                            ]
                        }
                    }
                }
            },
            LicenciaDeExploracionYExplotacion: {
                classname: "LicenciaDeExploracionYExplotacion",
                human_readable: "Licencia De Exploracion Y Explotacion",
                extends: ["Efecto"]
            },
            Acuerdo: {
                classname: "Acuerdo",
                human_readable: "Acuerdo",
                extends: ["Efecto"],
                fields: {
                    paises_firmantes: { type: "[Pais]" },
                    ambito: { type: "string" },
                    duracion: { type: "string" }
                }
            },
            AcuerdoBilateral: {
                classname: "AcuerdoBilateral",
                human_readable: "Acuerdo Bilateral",
                extends: ["Acuerdo", "Efecto"]
            },
            AcuerdoMarcoDeCooperacion: {
                classname: "AcuerdoMarcoDeCooperacion",
                human_readable: "Acuerdo Marco De Cooperacion",
                extends: ["Acuerdo", "Efecto"]
            },
            AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion: {
                classname: "AcuerdoComplementarioAlAcuerdoMarcoDeCooperacion",
                human_readable: "Acuerdo Complementario Al Acuerdo Marco De Cooperacion",
                extends: ["Acuerdo", "Efecto"]
            },
            AcuerdoComplementarioDeCooperacion: {
                classname: "AcuerdoComplementarioDeCooperacion",
                human_readable: "Acuerdo Complementario De Cooperacion",
                extends: ["Acuerdo", "Efecto"]
            },
            EstablecimientoDeSedeDiplomatica: {
                classname: "EstablecimientoDeSedeDiplomatica",
                human_readable: "Establecimiento De Sede Diplomatica",
                extends: ["Efecto"],
                fields: {
                    organismo: { type: "OrganismoInternacional" }
                }
            },
            DelegacionDeFunciones: {
                classname: "DelegacionDeFunciones",
                human_readable: "Delegacion De Funciones",
                extends: ["Efecto"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    cargo: { type: "Cargo" },
                    atribuciones: { type: "string" }
                }
            },
            OrdenDeAprehension: {
                classname: "OrdenDeAprehension",
                human_readable: "Orden De Aprehension",
                extends: ["Efecto"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    tribunal: { type: "Institucion" },
                    delito: { type: "string" }
                }
            },
            Jubilacion: {
                classname: "Jubilacion",
                human_readable: "Jubilacion",
                extends: ["Efecto"],
                fields: {
                    ciudadano: { type: "Ciudadano" },
                    cargo: { type: "Cargo" },
                    anos_de_servicio: { type: "number" },
                    institucion: { type: "Institucion" }
                }
            },
            Ley: {
                classname: "Ley",
                human_readable: "Ley",
                extends: ["Efecto"],
                fields: {
                    titulo: { type: "string" },
                    fecha_de_aprobacion: { type: "date" },
                    tipo: {
                        type: "string",
                        constraints: {
                            valueIn: [
                                "organica",
                                "ordinaria",
                                "decreto ley",
                                "ley habilitante"
                            ]
                        }
                    },
                    contenido: {
                        type: "string",
                        blank: true
                    }
                }
            },
            CreacionDeEmpresaEstatal: {
                classname: "CreacionDeEmpresaEstatal",
                human_readable: "Creacion De Empresa Estatal",
                extends: ["Efecto"],
                fields: {
                    empresa: { type: "Empresa" }
                }
            },
            CreacionDeOrganismoPublico: {
                classname: "CreacionDeOrganismoPublico",
                human_readable: "Creacion De Organismo Publico",
                extends: ["Efecto"],
                fields: {
                    organismo: { type: "Organismo" },
                    sustituye_a: {
                        type: "Organismo",
                        nullable: true
                    }
                }
            }
        },
        constraints: {
            AprobacionDeLey: {
                efecto: {
                    typeIn: ["Ley"]
                }
            },
            Decreto: {
                efecto: {
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
                efecto: {
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
                efecto: {
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
                efecto: {
                    typeIn: [
                        "Designacion",
                        "DelegacionDeFunciones",
                        "Jubilacion"
                    ]
                }
            },
            Acuerdo: {
                efecto: {
                    typeIn: [
                        "CreditoAdicional",
                        "Designacion"
                    ]
                }
            },
            Requisitoria: {
                efecto: {
                    typeIn: ["OrdenDeAprehension"]
                }
            },
            Autorizacion: {
                efecto: {
                    typeIn: ["CreacionDeEmpresaEstatal"]
                }
            }
        },
        parenthood: {
            # Keys are the possible collections, and values are the
            # collections that extend the correspondent collection key
            # without any specific order.
            Documento: [
                "GacetaOficial",
                "ActoNormativo",
                "AprobacionDeLey",
                "Decreto",
                "Resolucion",
                "LeyAprobatoria",
                "Providencia",
                "AcuerdoActoNormativo",
                "Requisitoria",
                "Autorizacion"
            ],
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
            Pais: [],
            Nacionalidad: [],
            OrganismoInternacional: [],
            Ciudadano: [],
            Institucion: [
                "Organismo",
                "Empresa",
                "EmpresaPrivada",
                "EmpresaEstatal",
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
                "CreacionDeOrganismoPublico"
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
            CreacionDeOrganismoPublico: []
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
            Pais: [],
            Nacionalidad: [],
            OrganismoInternacional: [],
            Ciudadano: [],
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
        }
    }
])

# DocumentCloud source document fetched from DC platform
source_seeds = nil
page = 1
PER_PAGE = 1000
QUERY = 'group: ipysvenezuela'

def is_extraordinary(doc)
    doc.id.include? "extraordinaria"
end

begin
    source_seeds = DocumentCloud.search(QUERY, :per_page => PER_PAGE, :page => page)
    batch = []
    source_seeds.documents.each do |doc|
        batch << Source.new({dc_id: doc.id, canonical_url: doc.canonical_url, is_extraordinary: is_extraordinary(doc)})
    end
    Source.import batch
    page += 1
end until source_seeds.documents.length == 0

# Admin user
User.create!({email: "rdbvictor19@gmail.com", password: "12345678", password_confirmation: "12345678", role: :admin})
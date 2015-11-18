tree: {
    options:["Documento"],
    cardinality: "1",
    Documento: {
        options: ["GacetaOficial"],
        cardinality: "1",
        GacetaOficial: {
            options: [
                "AprobacionDeLey",
                "Decreto",
                "Resolucion",
                "LeyAprobatoria",
                "Providencia",
                "AcuerdoActoNormativo",
                "Requisitoria",
                "Autorizacion"
            ]
            cardinality: "n",
            AprobacionDeLey: {},
            Decreto: {},
            Resolucion: {},
            LeyAprobatoria: {},
            Providencia: {},
            AcuerdoActoNormativo: {},
            Requisitoria: {},
            Autorizacion: {}
        }
    }
}
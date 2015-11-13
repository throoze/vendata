class Api::V1::SchemataController < ApplicationController
    def index
        render status: 200, json: Schema.first
    end

    def add_collection
        render status: 500, json: { error: "Vendata: 'add_collection' has not yet been implemented" }
    end

    def get_collections
        render status: 200, json: Schema.first.collections
    end

    def get_descriptions
        render status: 200, json: Schema.first.descriptions
    end

    def get_parenthood
        render status: 200, json: Schema.first.parenthood
    end

    def get_inheritance
        render status: 200, json: Schema.first.inheritance
    end

    def get_constraints
        render status: 200, json: Schema.first.constraints
    end

end

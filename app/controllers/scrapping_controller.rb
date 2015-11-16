class ScrappingController < ApplicationController
    def index
    end

    def get_new_scrapping
        # offset = rand(Model.count)
        # # Rails 4
        # rand_record = Model.offset(offset).first
        # (Add criteria to both counting and selecting)
        render status: :ok, json: { :message => "Vendata: get_new_scrapping not yet implemented " }
    end

    def new_scrapping
        render status: :ok, json: { :message => "Vendata: new_scrapping not yet implemented " }
    end

    def get_new_validation
        render status: :ok, json: { :message => "Vendata: get_new_validation not yet implemented " }
    end

    def new_validation
        render status: :ok, json: { :message => "Vendata: new_validation not yet implemented " }
    end
end

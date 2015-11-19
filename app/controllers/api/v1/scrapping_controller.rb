class Api::V1::ScrappingController < ApplicationController
    def get_new_scrapping
        # TODO: Determine criteria based on user privileges
        criteria = {:status => :pending, :is_extraordinary => false}
        offset = rand(Source.where(criteria).count)
        rand_record = Source.where(criteria).offset(offset).first
        render status: :ok, json: { :source => rand_record }
    end

    def new_scrapping
        render status: :ok, json: { :message => "Vendata: new_scrapping not yet implemented " }
    end

    def get_new_validation
        sources = Source.where(:status => :scrapped).joins(:scrappers).where.not(scrappings: { user: current_user})
        offset = rand(sources.count)
        rand_record = sources.offset(offset).first
        render status: :ok, json: { :source => rand_record }
    end

    def new_validation
        render status: :ok, json: { :message => "Vendata: new_validation not yet implemented " }
    end
end

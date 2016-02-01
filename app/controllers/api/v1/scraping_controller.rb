class Api::V1::ScrapingController < ApplicationController
    def get_new_scraping
        # TODO: Determine criteria based on user privileges
        criteria = {:status => :pending, :is_extraordinary => false}
        offset = rand(Source.where(criteria).count)
        rand_record = Source.where(criteria).offset(offset).first
        render status: :ok, json: { :source => rand_record }
    end

    def new_scraping
        render status: :ok, json: { :message => "Vendata: new_scraping not yet implemented " }
    end

    def get_new_validation
        sources = Source.where(:status => :scraped).joins(:scrapers).where.not(scrapings: { user: current_user})
        offset = rand(sources.count)
        rand_record = sources.offset(offset).first
        render status: :ok, json: { :source => rand_record }
    end

    def new_validation
        render status: :ok, json: { :message => "Vendata: new_validation not yet implemented " }
    end

    def constant
        params.require(:classname)
        classname = params[:classname]
        constants = Constant.where(classname: classname)
        payload = { :classname => classname, :objects => constants }
        render status: :ok, json: payload
    end
end

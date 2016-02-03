class Api::V1::ScrapingController < ApplicationController
    before_action :authenticate_user!
    
    def get_new_scraping
        # TODO: Determine criteria based on user privileges
        criteria = {:status => :pending, :is_extraordinary => false}
        offset = rand(Source.where(criteria).count)
        rand_record = Source.where(criteria).offset(offset).first
        render status: :ok, json: { :source => rand_record }
    end

    def new_scraping
        params.permit(:source, :scraping =>[])
        scraped_docs = params.require(:scraping).map{ |e| e.permit!}
        source_id = params.require(:source)
        source = Source.find_by_id!(source_id)

        scraping = Scraping.new
        scraping.user = current_user
        scraping.source = source

        main_doc = scraped_docs.first
        main = Document.create(main_doc)
        inner_docs = scraped_docs[1..-1]
        inner = Document.create(inner_docs)

        scraping.document_id = main.id.to_s
        scraping.main = main
        scraping.inner = inner

        scraping.save

        source.status = :scraped
        source.latest_scraping = scraping

        source.save

        render status: :created, json: { status: :created }
    end

    def get_new_validation
        sources = Source.where(:status => :scraped).joins(:scrapers).where.not(scrapings: { user: current_user})
        offset = rand(sources.count)
        rand_record = sources.offset(offset).first
        render status: :ok, json: { :source => rand_record }
    end

    def new_validation
        render status: :not_implemented, json: { :message => "Vendata: new_validation not yet implemented " }
    end

    def constant
        params.require(:classname)
        classname = params[:classname]
        constants = Constant.where(classname: classname)
        payload = { :classname => classname, :objects => constants }
        render status: :ok, json: payload
    end

    def new_constant
        constant = params.require(:constant).permit(:classname, params[:constant].try(:keys)).tap do |constant_params|
            constant_params.require(:classname)
        end
        classname = constant[:classname]
        criteria = Constant.where(classname: classname)
        key_fields = Schema.first.descriptions[classname][:key]
        for key in key_fields
            criteria = criteria.where(key => constant[key])
        end
        size = criteria.size
        status = :ok
        if size == 0
            puts "Constant: ", constant
            Constant.create(constant)
            status = :created
        end
        payload = { :classname => classname, :objects => Constant.where(classname: classname) }
        render status: status, json: payload
    end
end

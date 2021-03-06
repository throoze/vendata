require 'net/http'

class Source < ActiveRecord::Base
    after_find :fetch_oembed

    has_many :scrapings
    has_many :scrapers, through: :scrapings, :source => :user
    has_many :validations
    has_many :validators, through: :validations, :source => :user
    has_many :flags
    has_many :flaggers, through: :flags, :source => :user
    has_one  :latest_scraping, class_name: 'Scraping', foreign_key: :source_latest_id

    STATUS = [:pending, :flagged, :scraped, :validated]
    OEMBED_ENDPOINT = "http://www.documentcloud.org/api/oembed.json"
    OEMBED_PARAMS = {
        :maxheight         => 750,
        :maxwidth          => 600,
        :container         => '#document-visor',
        :notes             => false,             # default: true
        :text              => true,              # default: true
        :zoom              => true,              # default: true
        :search            => true,              # default: true
        :sidebar           => false,             # default: true
        :pdf               => true,              # default: true
        :responsive        => true,              # default: false
        :responsive_offset => 50                 #(optional) Specify header height (pixels)
        #default_note    (optional) Open the document to a specific note. An integer representing the note ID    214279
        #default_page    (optional) Open the document to a specific page 3
    }


    protected
        def fetch_oembed
            if self.oembed.nil? or self.oembed == ""
                params = Source::OEMBED_PARAMS.dup
                params[:url] = self.canonical_url
                uri = URI(Source::OEMBED_ENDPOINT+ "?" + params.to_query)
                request = Net::HTTP::Get.new uri
                response = Net::HTTP.start(uri.host, uri.port) {|http|
                    http.request(request)
                }
                self.oembed = response.body
                self.save
            end
        end
end

class Document
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  index({ "$**": "text" })

  def self.search(query)
    Document.where({ :$text => { :$search => query } })
  end
end
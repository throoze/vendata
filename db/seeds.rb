# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

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
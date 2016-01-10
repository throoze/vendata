def update_privates
    source_seeds = nil
    page = 1
    per_page = 1000
    query = 'group: ipysvenezuela access: private'
    begin
        source_seeds = DocumentCloud.search(query, :per_page => per_page, :page => page)
        source_seeds.documents.each do |doc|
            begin
                DocumentCloud.update doc.id, :access => "public"
                puts "Document #{doc.id} updated..."
            rescue RestClient::InternalServerError => e
                puts "Updating document #{doc.id} resulted in RestClient::InternalServerError:"
                puts "Title: #{doc.title}"
                puts "Exception: #{e.message}"
            end
        end
        page += 1
    end until source_seeds.documents.length == 0
end
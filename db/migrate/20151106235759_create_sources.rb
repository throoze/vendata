class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string  :dc_id,                                null: false, unique: true
      t.string  :canonical_url,                        null: false, unique: true
      t.string  :oembed,             default: nil
      t.boolean :is_extraordinary,   default: false
      t.string  :status,             default: :pending # Other values: [:scraped, :validated]
      t.integer :validation_counter, default: 0

      t.timestamps null: false
    end

    create_table :scrapings do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :source, index: true, foreign_key: true
      t.integer    :source_latest_id, index: true, foreign_key: true
      t.string     :document_id, default: nil
      t.text       :documents, default: nil

      t.timestamps null: false
    end

    create_table :validations do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :source, index: true, foreign_key: true
      t.belongs_to :scraping, index: true, foreign_key: true
      t.string     :message, null: true
      t.boolean    :positive, null: false

      t.timestamps null: false
    end

    create_table :flags do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :source, index: true, foreign_key: true
      t.string :message, null: false

      t.timestamps null: false
    end
  end
end

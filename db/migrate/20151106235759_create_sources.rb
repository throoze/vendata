class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string :dc_id, null: false
      t.string :canonical_url, null: false
      t.boolean :is_extraordinary, :default => false
      t.string :status, :default => :pending # Other values: [:scrapped, :validated]
      t.integer :validation_counter, :default => 0

      t.timestamps null: false
    end

    create_table :scrappings do |t|
      t.belongs_to :user, index: true, foreign_key: true, index: true
      t.belongs_to :source, index: true, foreign_key: true, index: true

      t.timestamps null: false
    end

    create_table :validations do |t|
      t.belongs_to :user, index: true, foreign_key: true, index: true
      t.belongs_to :source, index: true, foreign_key: true, index: true

      t.timestamps null: false
    end

    create_table :flags do |t|
      t.belongs_to :user, index: true, foreign_key: true
      t.belongs_to :source, index: true, foreign_key: true, index: true
      t.string :message, null: false

      t.timestamps null: false
    end
  end
end

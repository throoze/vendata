class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string :dc_id, null: false
      t.string :canonical_url, null: false
      t.boolean :is_extraordinary, :default => false
      t.string :status, :default => :pending

      t.timestamps null: false
    end
  end
end

class CreateSources < ActiveRecord::Migration
  def change
    create_table :sources do |t|
      t.string :dc_id, null: false
      t.boolean :extraordinary, :default => false
      t.string :status, :default => :pending

      t.timestamps null: false
    end
  end
end

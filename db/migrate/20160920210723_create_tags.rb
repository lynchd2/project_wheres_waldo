class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.string :character
      t.integer :x 
      t.integer :y
      t.references :photos
      t.timestamps
    end
  end
end

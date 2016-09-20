class RemoveSFromPhotos < ActiveRecord::Migration[5.0]
  def change
    rename_column :tags, :photos_id, :photo_id
  end
end

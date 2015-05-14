class CreatePractices < ActiveRecord::Migration
  def change
    create_table :practices do |t|
      t.integer :makeft
      t.integer :totalft
      t.integer :percentageft
      t.integer :makejs
      t.integer :totaljs
      t.integer :percentagejs
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end

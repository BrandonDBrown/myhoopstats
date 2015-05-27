class AddcolumnsToUser < ActiveRecord::Migration
  def change
      add_column :users, :ftgoal, :integer
      add_column :users, :jsgoal, :integer
  end
end

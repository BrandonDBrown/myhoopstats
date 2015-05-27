class AddGoalcolumnToPractice < ActiveRecord::Migration
  def change
      add_column :practices, :ftgoal, :integer
      add_column :practices, :jsgoal, :integer
  end
end

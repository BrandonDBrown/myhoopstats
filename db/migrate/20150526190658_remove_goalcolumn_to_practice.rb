class RemoveGoalcolumnToPractice < ActiveRecord::Migration
  def change
      remove_column :practices, :ftgoal, :integer
      remove_column :practices, :jsgoal, :integer
  end
end

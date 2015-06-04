class ChangeColumnDefaultToUser < ActiveRecord::Migration
  def change
      change_column_default :users, :activated, true
  end
end

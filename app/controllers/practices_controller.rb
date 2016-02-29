class PracticesController < ApplicationController
    before_action :logged_in_user, only: [:create]

    def create 
    	@practices = current_user.practices.build(practice_params)      
    end
    
    private
			def practice_params
				params.require(:practice).permit(:makeft, :totalft, :percentageft, :makejs, :totaljs, :percentagejs)
			end
end

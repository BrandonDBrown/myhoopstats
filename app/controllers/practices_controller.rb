class PracticesController < ApplicationController
    before_action :logged_in_user, only: [:create]

    
    def create
        @practice = current_user.practices.build(practice_params) 
        if @practice.save
            flash[:success] = "Stats successfully saved"
            redirect_to(:back) 
        else
            flash[:danger] = "Make/Miss cannot be 0"
            redirect_to(:back)
        end
    end
    
    
    private
    
        def practice_params
            params.require(:practice).permit(:makeft, :totalft, :percentageft, :makejs, :totaljs, :percentagejs)
        end
    
end

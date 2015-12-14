class PracticesController < ApplicationController
    before_action :logged_in_user, only: [:create, :update, :edit]

    
    def create 
        @practices = current_user.practices.build(practice_params)      
            if @practices.save
                flash[:success] = "Data save"
                redirect_to practice_path(current_user)
            else
                flash[:danger] = "Data not saved"
                redirect_to(:back)
            end
    end
    
    def edit
    end
    
    def update
    end
    
    private
    
        def practice_params
            params.require(:practice).permit(:makeft, :totalft, :percentageft, :makejs, :totaljs, :percentagejs)
        end
    
end

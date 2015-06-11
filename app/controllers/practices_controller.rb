class PracticesController < ApplicationController
    before_action :logged_in_user, only: [:create, :update, :edit]

    
    def create 
        @practices = current_user.practices.build(practice_params)
        
#        respond_to do |format|
#            if @practice.save
#                format. html
#                format.js { render 'create.js.erb' }
#            else
#                format.html { render :action => "new" }  
#                format.js
     
#            flash[:success] = "Data save"
#            redirect_to practice_path(current_user)

#            flash[:danger] = "Data not saved"
#            redirect_to(:back)
#end
#            end
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

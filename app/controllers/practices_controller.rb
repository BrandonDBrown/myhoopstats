class PracticesController < ApplicationController
    before_action :logged_in_user, only: [:create, :update, :edit]

    
    def create 
        @practice = current_user.practices.build(practice_params)
        respond_to do |format|
        if @practice.save
            format.html { redirect_to practice_path(current_user) }
      format.js   {}
      format.json { render json: practice_path(current_user), status: :created, location: practice_path(current_user) }
#            flash[:success] = "Data save"
#            redirect_to practice_path(current_user)
        else
                        
format.html { render action: "new" }
      format.json { render json: @practice.errors, status: :unprocessable_entity }
#            flash[:danger] = "Data not saved"
#            redirect_to(:back)
        end
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

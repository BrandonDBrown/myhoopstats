class MicropostsController < ApplicationController
before_action :logged_in_user, only: [:create, :destroy]
before_action :correct_user, only: :destroy
    
    def create
        @micropost = current_user.microposts.build(micropost_params)
        if @micropost.save
            flash[:success] = "Micropost created!"
            redirect_to current_user
        else
            flash[:danger] = "Post can't be blank or over 155 characters long"
#            @feed_items = []
            redirect_to current_user
        end    
    end
    
    def destroy
        @micropost.destroy
        flash[:success] = "Micropost deleted"
        redirect_to request.referrer || current_user
    end
        
    private
        
        def micropost_params
            params.require(:micropost).permit(:content, :picture)
        end
    
        def correct_user
            @micropost = current_user.microposts.find_by(id: params[:id])
            redirect_to current_user if @micropost.nil?
        end
end

class UsersController < ApplicationController
    before_action :logged_in_user, only: [:index, :practice, :edit, :update, :destroy]
    before_action :correct_user,   only: [:edit, :update, :practice]
    before_action :admin_user, only: :destroy
    

    def index
        @users = User.paginate(page: params[:page])
    end
    
    def show
        @user = User.find(params[:id])
        @overallmakeft = @user.practices.sum(:makeft)
        @overalltotalft = @user.practices.sum(:totalft)
        @overallmakejs = @user.practices.sum(:makejs)
        @overalltotaljs = @user.practices.sum(:totaljs)
        @microposts = @user.microposts.paginate(page: params[:page])
        
        if logged_in?
            @micropost = current_user.microposts.build
            
#            @feed_items = current_user.feed.paginate(page: params[:page])
        end
    end
    
    def new
        @user = User.new
    end
    
    def create
        @user = User.new(user_params)
        if @user.save
           @user.send_activation_email
           flash[:info] = "Please check your email to activate your account."
           redirect_to root_url
        else
            render 'new'
        end
    end
    
    def edit
        
    end
    
    def update
        respond_to do |format|
        if @user.update_attributes(user_params)
#            flash[:success] = "Successfully updated"
            format.html { redirect_to @user }
            format.json { respond_with_bip(@user) }
        else 
            format.html { render action: 'edit' }
            format.json { respond_with_bip(@user) }
        end
        end
    end
    
    def practice
        @practice = current_user.practices.build if logged_in?
    end
    
    def destroy
        User.find(params[:id]).destroy
        flash[:success] = "User deleted"
        redirect_to users_url
    end
    
    private
    
        def user_params
            params.require(:user).permit(:name, :email, :password, :password_confirmation, :ftgoal, :jsgoal)
        end
       
    # Before filters
    
        # Confirms the correct user.
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end
    
    #Confirms an admin user.
    def admin_user
        redirect_to(root_url) unless current_user.admin?
    end
end

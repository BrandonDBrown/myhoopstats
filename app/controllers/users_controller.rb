class UsersController < ApplicationController
    before_action :logged_in_user, only: [:index, :practice, :edit, :update, :destroy]
    before_action :correct_user,   only: [:edit, :update, :practice]
    before_action :admin_user, only: :destroy
    

    def index
        @users = User.paginate(page: params[:page])
    end
    
    def show
        @user = User.find(params[:id])
        @overall = @user.practices
        @recentft = @overall.order("created_at ASC").where("totalft > ?", 0).last
        @recentjs = @overall.order("created_at ASC").where("totaljs > ?", 0).last
        @dateft = @overall.select("makeft, created_at").last
        @datejs = @overall.select("makejs, created_at").last
        @overallpercft = ((@overall.sum(:makeft).to_f/@overall.sum(:totalft).to_f)*100)
        @overallpercjs = ((@overall.sum(:makejs).to_f/@overall.sum(:totaljs).to_f)*100)
    end
    
    def new
        @user = User.new
    end
    
    def create
#        user = User.find_by(email: params[:email])
        @user = User.new(user_params)
        if @user.save
           log_in @user
           flash[:success] = "Account activated."
           redirect_to @user
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

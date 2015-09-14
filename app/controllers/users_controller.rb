class UsersController < ApplicationController
    before_action :logged_in_user, only: [:index, :practice, :edit, :update, :destroy]
    before_action :correct_user,   only: [:edit, :update, :practice]
    before_action :admin_user, only: :destroy
    

    def index
        @users = User.paginate(page: params[:page])
    end
    
    def show
        @user = User.find(params[:id])
        if @user.practices.pluck(:totalft).blank?
            @overallmakeft = 0
            @overalltotalft = 0

            
            @dateft = "No Data"
            @recentmakeft = 0
            @recenttotalft = 0

        else
            @overallmakeft = @user.practices.sum(:makeft)
            @overalltotalft = @user.practices.sum(:totalft)
            
            @dateft = @user.practices.select("makeft, created_at").order("created_at ASC").last.created_at.strftime("%b %d, %Y")
            @recentmakeft = @user.practices.order("created_at ASC").last.makeft
            @recenttotalft = @user.practices.order("created_at ASC").last.totalft
                
        end
        
        if @overallmakeft == 0
            @overallpercft = 0
            @recentpercft = 0
        else
            @overallpercft = ((@overallmakeft.to_f/@overalltotalft.to_f)*100).round
            @recentpercft = @user.practices.order("created_at ASC").last.percentageft.round
        end
        
        if @user.practices.pluck(:totaljs).blank?
            @overallmakejs = 0
            @overalltotaljs = 0
            
            @datejs = "No Data"
            @recentmakejs = 0
            @recenttotaljs =  0
        else
            @overallmakejs = @user.practices.sum(:makejs)
            @overalltotaljs = @user.practices.sum(:totaljs)
            
            @datejs = @user.practices.select("makejs, created_at").order("created_at ASC").last.created_at.strftime("%b %d, %Y")
            @recentmakejs = @user.practices.order("created_at ASC").last.makejs
            @recenttotaljs = @user.practices.order("created_at ASC").last.totaljs      
        end
        
        if @overallmakejs == 0
            @overallpercjs = 0
            @recentpercjs = 0
        else
            @overallpercjs = ((@overallmakejs.to_f/@overalltotaljs.to_f)*100).round
            @recentpercjs = @user.practices.order("created_at ASC").last.percentagejs.round
        end
        
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

class PagesController < ApplicationController
  def home
        if current_user
            redirect_to current_user
        else
             
        end
  end
    
  def terms
  end
    
  def cookie
  end
    
  def privacy
  end
  
  def howto
  end
    
  def contact
  end
end

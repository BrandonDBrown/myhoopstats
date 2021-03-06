class User < ActiveRecord::Base
    
    has_many :practices, dependent: :destroy
    attr_accessor :remember_token, :reset_token
    before_save   :downcase_email
    
    validates :ftgoal, :jsgoal, :numericality => {:greater_than_or_equal_to => 0, :less_than_or_equal_to => 100}
    validates :name, presence: true, length: { maximum: 50 }
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence:true, length: { maximum: 255 }, format: {with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
    
    has_secure_password
    validates :password, length: { minimum: 6 }, allow_blank: true
    
    # Returns a random token
    def User.new_token
        SecureRandom.urlsafe_base64
    end
    
      # Returns the hash digest of the given string.
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end
    # Remembers a user in the database for use in persistent sessions
    def remember
        self.remember_token = User.new_token
        update_attribute(:remember_digest, User.digest(remember_token))
    end
    
    # Forgets a user
    def forget
        update_attribute(:remember_digest, nil)
    end
    
    #Sets the password reset attributes
    def create_reset_digest
        self.reset_token = User.new_token
        update_attribute(:reset_digest, User.digest(reset_token))
        update_attribute(:reset_sent_at, Time.zone.now)
    end
    
    #Sends password reset email
    def send_password_reset_email
        UserMailer.password_reset(self).deliver_now
    end
    
    def password_reset_expired?
        reset_sent_at < 2.hours.ago
    end
    
    #    Activates an account
    def activate
        update_attribute(:activated, true)
        update_attribute(:activated_at, Time.zone.now)
    end
    

    
    private
    
#    Converts email to lower case
    def downcase_email
        self.email = email.downcase
    end
        
end

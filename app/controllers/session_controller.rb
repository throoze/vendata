class SessionController < ApplicationController
    skip_before_filter :authenticate, :only => :new

    def index
    end


    def scrapingsNum()
        #params.require(:user).permit(:uid)
        res= []
        users = User.all
        users.each do |u|
            user_dic = {} 
            user_dic['num_scrapings'] = Scraping.where(:user_id => u.id).length
            user_dic['num_validations'] = Validation.where(:user_id => u.id).length
            user_dic['last_connection'] = u.last_sign_in_at
            user_dic['sign_in_count'] = u.sign_in_count
            user_dic['name'] = u.name
            user_dic['email'] = u.email 
            user_dic['role'] = u.role
            res.push(user_dic)
        end
        
        render json:res
    end
end

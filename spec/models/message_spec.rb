require 'rails_helper'

describe Message do
  describe '#create' do

    it "メッセージがあれば保存できる" do  
      message = build(:message, image: nil)                                
      expect(message).to be_valid                  
    end

       #itの中は日本語でOK 何をしているのかを自分でメモするだけ
          #userクラスのインスタンス生成
      #expect意味(予測する、予期する)   
      #be_validマッチャ:expectの引数にしたインスタンスが全てのバリデーションをクリアする場合にパスするマッチャ
      #[できる]ことを確かめる時に使う
    
      
    it "画像があれば保存できる" do  
      message = build(:message, content: nil)                                   
      expect(message).to be_valid                 
    end

    it "メッセージと画像があれば保存できる" do  
      message = build(:message)                                   
      expect(message).to be_valid                 
    end



 
    it "メッセージも画像も無いと保存できない" do
      message = build(:message, content: nil, image: nil)
      message.valid?
      # binding.pry
      expect(message.errors[:content]).to include("を入力してください")   
    end


      #「バリデーションにより保存が[できない]状態であるか」を確かめるvalid?メソッド
        #expect意味(予測する、予期する) 
        #user.errors[:nickname] ニックネームカラムに関するuserエラーが、
        #to include("") の (" ")の中身と同じになっていますか？  という意味
        #binding.pry を入れて、コードを止めると、その下のコードが詳しく出る
        # そこで、user.errors[:nickname]をターミナルに入れて、実際のエラー文を
        # 確認する


    it "group_idが無いと保存できない" do
      message = build(:message, group_id: nil)
      message.valid?                        
      # binding.pry
      expect(message.errors[:group]).to include("を入力してください")  
    end



    it "user_idが無いと保存できない" do
      message = build(:message, user_id: nil)
      message.valid?                        
      # binding.pry
      expect(message.errors[:user]).to include("を入力してください")  
    end






  end
end
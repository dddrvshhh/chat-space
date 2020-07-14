class GroupsController < ApplicationController

  def index
  end

  def new
    @group = Group.new   #モデルメソッド.new インスタンス(データ、レコード)を生成
    @group.users << current_user   #配列(データテーブル).users?に要素(current_user)を加えます
  end

  def create
    @group = Group.new(group_params)
    if @group.save        #モデルメソッド.save インスタンス(データ、レコード)を保存
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit 
    @group = Group.find(params[:id])       #モデルメソッド.find(テーブルid)
  end

  def update
    @group = Group.find(params[:id])     #モデルメソッド.find(テーブルid)
    if @group.update(group_params)
      redirect_to root_path, notice: 'グループを更新しました'
    else
      render :edit
    end
  end


  private      #新たに定義するコントローラーアクション
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

end

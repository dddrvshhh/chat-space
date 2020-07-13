class GroupsController < ApplicationController

  def new
    @group = Group.new   #インスタンス(データ、レコード)を生成
    @group.users << current_user   #配列(データ)に要素(current_user)を加えます
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  private      #新たに定義するコントローラーアクション
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

end

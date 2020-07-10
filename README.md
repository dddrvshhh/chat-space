##groupsテーブル
|Column|Type|Options|
|------|----|-------|
|"name"|string|null: false, add index unique: true|


### Association
- has_many :users, through: :users_groups
- has_many :users_groups
- has_many :messages



##usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|strig|null: false, add index unique: true|
|email|strng|null: false, add index unique: true|
|password|string|null: false|
|password|string|null: false|


### Association
- has_many :groups, through: :users_groups
- has_many :users_groups
- has_many :messages


##messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


##users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



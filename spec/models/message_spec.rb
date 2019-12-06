require 'rails_helper'

describe Message do

  describe '#create' do

    it "メッセージあれば保存できる" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end

    it "画像あれば保存できる" do
      message = build(:message, text: nil)
      expect(message).to be_valid
    end

    it "メッセージと画像あれば保存できる" do
      message = build(:message)
      expect(message).to be_valid
    end

    it "メッセージも画像もないと保存できない" do
      message = build(:message, text: nil, image: nil)
      message.valid?
      expect(message.errors[:text]).to include("を入力してください")
    end

    it "group_idがないと保存できない" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end

    it "user_idがないと保存できない" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end

  end
end
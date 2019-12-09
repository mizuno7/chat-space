# DateTime:DATE_FORMATS[:default] = "%Y年%m月%d日 %H時%M分"
# datetime = DateTime.now
json.array! @messages do |message|
  json.text message.text
  json.image message.image.url
  json.created_at message.created_at.to_s("%Y年%m月%d日 %H時%M分")
  json.user_name message.user.name
  json.id message.id
end

# .strftime("%Y年%m月%d日 %H時%M分")
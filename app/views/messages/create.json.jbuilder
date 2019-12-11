json.text  @message.text
json.image  @message.image.url
json.group  @message.group.id
json.user_name  @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
json.id @message.id


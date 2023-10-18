export const getSenderName = (userDetails, users) => {
  return users[0]?._id === userDetails?._id
    ? users[1].fullName
    : users[0].fullName;
};

export const getSenderImage = (userDetails, users) => {
  return users[0]?._id === userDetails?._id
    ? users[1].avatarUrl
    : users[0].avatarUrl;
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 0;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
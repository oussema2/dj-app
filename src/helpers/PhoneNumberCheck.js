function checkPhoneNumber(phone) {
  const regExPhoneNumber = /[0-9]{8}$/;
  if (phone.match(regExPhoneNumber)) {
    return true;
  } else {
    return false;
  }
}

export default checkPhoneNumber;

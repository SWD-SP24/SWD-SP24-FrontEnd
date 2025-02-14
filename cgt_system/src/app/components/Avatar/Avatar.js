const Avatar = ({ src, alt, className }) => {
  let imageSrc =
    "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1739469686~exp=1739473286~hmac=de3b06e0840943b9f54ff66280190652a6a2eb1adaff4e115f15f3190122515e&w=826";
  if (src != null && src != undefined && src != "") {
    imageSrc = src;
  }
  return (
    <img
      src={imageSrc}
      alt={alt}
      class={className}
      height="100"
      width="100"
      id="uploadedAvatar"
    />
  );
};
export default Avatar;

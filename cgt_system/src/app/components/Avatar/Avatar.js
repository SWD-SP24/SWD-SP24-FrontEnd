const Avatar = ({ src, alt, className }) => {
  let imageSrc =
    "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3396.jpg?w=900";
  if (src != null && src != undefined && src != "") {
    imageSrc = src;
  }
  return <img src={imageSrc} alt={alt} class={className} id="uploadedAvatar" />;
};
export default Avatar;

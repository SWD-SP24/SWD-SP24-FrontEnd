import Swal from "sweetalert2";

const showToast = (icon, title, text) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: `custom-toast ${icon}`,
      title: "custom-toast-title",
      timerProgressBar: "custom-toast-progress",
    },
    showClass: {
      popup: "swal2-noanimation",
    },
  });
};

export default showToast;

import Swal from "sweetalert2";

const showToast = (
  icon,
  title,
  text,
  showButtons = false,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm = null,
  onCancel = null
) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    position: showButtons ? "center" : "top-end",
    showConfirmButton: showButtons,
    showCancelButton: showButtons,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    timer: showButtons ? undefined : 3000,
    timerProgressBar: !showButtons,
    customClass: showButtons
      ? {}
      : {
          popup: `custom-toast ${icon}`,
          title: "custom-toast-title",
          timerProgressBar: "custom-toast-progress",
        },
    showClass: {
      popup: "swal2-noanimation",
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
      onCancel();
    }
  });
};

export default showToast;

import Swal from "sweetalert2";

const showToast = ({
  icon = "info",
  title = "",
  text = "",
  showButtons = false,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm = null,
  onCancel = null,
  disableOutsideClick = false,
  targetElement = null,
} = {}) => {
  const options = {
    toast: !showButtons,
    icon,
    title,
    text,
    position: showButtons ? "center" : "top-end",
    showConfirmButton: showButtons,
    showCancelButton: showButtons && !disableOutsideClick,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    timer: showButtons ? undefined : 5000,
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
    showCloseButton: !showButtons,
    target: targetElement || "body",
  };

  if (showButtons) {
    options.allowOutsideClick = !disableOutsideClick;
    options.allowEscapeKey = !disableOutsideClick;
    options.allowEnterKey = true;
  }

  Swal.fire(options).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
      onCancel();
    }
  });
};

export default showToast;

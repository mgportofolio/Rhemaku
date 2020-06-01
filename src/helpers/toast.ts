export function toast(message: string, duration: number = 2000) {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = duration;
  toast.color = "dark";
  toast.position = "bottom";

  document.body.appendChild(toast);
  return toast.present();
}

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

interface ToastDetail {
  icon: string;
  text: string;
}

interface ToastDetails {
  timer: number;
  success: ToastDetail;
  error: ToastDetail;
  warning: ToastDetail;
  info: ToastDetail;
}

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  private renderer: Renderer2;

  private toastDetails: ToastDetails = {
    timer: 1500,
    success: {
      icon: './assets/img/icons/tick.png',
      text: 'Success: This is a success toast.',
    },
    error: {
      icon: './assets/img/icons/alert.png',
      text: 'Error: This is an error toast.',
    },
    warning: {
      icon: 'fa-triangle-exclamation',
      text: 'Warning: This is a warning toast.',
    },
    info: {
      icon: 'fa-circle-info',
      text: 'Info: This is an information toast.',
    }
  };

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  createToast(id: keyof ToastDetails, inputText: string) {
    const notifications = document.querySelector(".notifications");

    const removeToast = (toast: HTMLElement) => {
      toast.classList.add("hide");
      if ((toast as any).timeoutId) clearTimeout((toast as any).timeoutId); // Clearing the timeout for the toast
      setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
    };

    const details = this.toastDetails[id];
    if (!details) {
      console.error(`No toast details found for id: ${id}`);
      return;
    }

    // Cast details to ToastDetail type
    const detailsTyped = details as ToastDetail;
    const { icon } = detailsTyped;

    const toast = this.renderer.createElement('li'); // Creating a new 'li' element for the toast
    toast.className = `toast ${id}`; // Setting the classes for the toast

    const columnDiv = this.renderer.createElement('div');
    columnDiv.className = 'column';
    columnDiv.addEventListener('click', () => removeToast(toast));

    const image = this.renderer.createElement('img');
    image.className = 'notif_img';
    image.src = icon;

    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(inputText);
    this.renderer.appendChild(span, text);

    this.renderer.appendChild(columnDiv, image);
    this.renderer.appendChild(columnDiv, span);
    this.renderer.appendChild(toast, columnDiv);
    this.renderer.appendChild(notifications, toast);

    (toast as any).timeoutId = setTimeout(() => removeToast(toast), this.toastDetails.timer);
  }
}
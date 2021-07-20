import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  success(text: string | TemplateRef<any>) {
    this.show(text, {
      header: 'Sucesso',
      classname: 'bg-success text-light',
      delay: 10000
    });
  }

  error(text: string | TemplateRef<any>) {
    this.show(text, {
      classname: 'bg-success text-light',
      delay: 10000
    });
  }

  alert(text: string | TemplateRef<any>) {
    this.show(text, {
      delay: 10000
    });
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}

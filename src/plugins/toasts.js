import Store from '@/store/store';

export default {
    install(Vue) {
        Vue.prototype.$toast = {
            container: undefined,
            class: class ErrorToast {
                constructor(options) {
                    this.type = options.type || 'info';
                    this.header = options.header || 'Сообщение';
                    this.text = options.text || null;
                    this.action = options.action || null;
                    this.actionText = options.actionText || 'Хорошо';
                    this.toastId = options.toastId || 'error-toast-1';
                    this.icon = this.selectIcon();
                    this.DOMElement = null;
                    this.shows = options.shows || null;
                    this.createLayout();
                    this.makeEvents();
                    this.showToast();
                }

                createLayout() {
                    const toastLayout = `
            <div 
            role="alert" 
            aria-live="assertive" 
            aria-atomic="true" 
            class="toast opacity-0 ease-animation overflow-hidden ${this.type}" 
            data-bs-autohide="${(this.type === 'info' || this.type === 'warning') ? 'true' : 'false'}"
            id="${this.toastId}">
            <div class="toast-wrapper d-flex rounded-8 p-3">
                <div class="me-2">${this.icon}</div>
                <div class="flex-grow-1">
                 ${this.header ? `<div class="error-toast-header fw-up-medium">${this.header}</div>` : ''}
                 ${this.text ? `<div class="mt-1">${this.text}</div>` : ''}
                 ${this.action ? `
                    <div class="mt-2 d-flex">
                        <button class="mes-button me-2" onclick="${this.action}">${this.actionText}</button>
                        <button class="rate-instruct-cancel">Отмена</button>
                    </div>` : ''}
                </div>
                <button class="ms-2 btn-close" data-bs-dismiss="${this.toastId}" aria-label="Close"></button>
            </div>`
                    
                    this.container = document.querySelector('.toast-container');
                    if (this.container) {
                        this.container.insertAdjacentHTML('afterbegin', toastLayout);
                        this.DOMElement = document.getElementById(this.toastId);
                    }
                }

                makeEvents() {
                    if (this.DOMElement) {
                        const cancelButton = this.DOMElement.querySelector('.rate-instruct-cancel');
                        if (cancelButton) {
                            cancelButton.addEventListener('click', () => {
                                this.hideToast(this.DOMElement);
                            });
                        }
                        const crossButton = this.DOMElement.querySelector('button[data-bs-dismiss]');
                        if (crossButton) {
                            crossButton.addEventListener('click', () => {
                                this.hideToast(this.DOMElement);
                            })
                        }
                    }
                }

                selectIcon() {
                    switch (this.type) {
                        case 'warning':
                            return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8337 10.8346C10.8337 11.2946 10.4603 11.668 10.0003 11.668C9.54033 11.668 9.16699 11.2946 9.16699 10.8346V6.66797C9.16699 6.20797 9.54033 5.83464 10.0003 5.83464C10.4603 5.83464 10.8337 6.20797 10.8337 6.66797V10.8346ZM10.0003 14.168C9.54033 14.168 9.16699 13.7946 9.16699 13.3346C9.16699 12.8746 9.54033 12.5013 10.0003 12.5013C10.4603 12.5013 10.8337 12.8746 10.8337 13.3346C10.8337 13.7946 10.4603 14.168 10.0003 14.168ZM10.0003 1.66797C5.39783 1.66797 1.66699 5.3988 1.66699 10.0013C1.66699 14.6038 5.39783 18.3346 10.0003 18.3346C14.6028 18.3346 18.3337 14.6038 18.3337 10.0013C18.3337 5.3988 14.6028 1.66797 10.0003 1.66797Z" fill="#FD7E14"/>
                    </svg>`;
                        case 'succeed':
                            return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5795 8.00547L9.77283 13.0055C9.61616 13.2113 9.37366 13.333 9.11533 13.3346H9.10949C8.85366 13.3346 8.61199 13.2163 8.45366 13.0146L6.42699 10.4255C6.14366 10.0638 6.20699 9.53964 6.56949 9.2563C6.93116 8.97214 7.45616 9.03547 7.73949 9.3988L9.10033 11.1371L12.2537 6.9963C12.532 6.63047 13.0545 6.5588 13.422 6.83797C13.7878 7.11714 13.8587 7.63964 13.5795 8.00547ZM10.0003 1.66797C5.39783 1.66797 1.66699 5.3988 1.66699 10.0013C1.66699 14.603 5.39783 18.3346 10.0003 18.3346C14.6028 18.3346 18.3337 14.603 18.3337 10.0013C18.3337 5.3988 14.6028 1.66797 10.0003 1.66797Z" fill="#40C057"/>
                    </svg>`;
                        case 'critical':
                            return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8334 10.8346C10.8334 11.2946 10.4601 11.668 10.0001 11.668C9.54009 11.668 9.16675 11.2946 9.16675 10.8346V7.5013C9.16675 7.0413 9.54009 6.66797 10.0001 6.66797C10.4601 6.66797 10.8334 7.0413 10.8334 7.5013V10.8346ZM10.0001 14.168C9.54009 14.168 9.16675 13.7946 9.16675 13.3346C9.16675 12.8746 9.54009 12.5013 10.0001 12.5013C10.4601 12.5013 10.8334 12.8746 10.8334 13.3346C10.8334 13.7946 10.4601 14.168 10.0001 14.168ZM18.8009 13.5871L12.4076 2.98797C11.9084 2.1613 11.0084 1.66797 10.0001 1.66797C8.99176 1.66797 8.09176 2.1613 7.59259 2.98797L1.19926 13.5871C0.725922 14.373 0.711755 15.318 1.16176 16.1146C1.64426 16.9705 2.58176 17.5013 3.60676 17.5013H16.3934C17.4184 17.5013 18.3559 16.9705 18.8384 16.1146C19.2884 15.318 19.2743 14.373 18.8009 13.5871Z" fill="#FA5252"/>
                    </svg>`;
                        default:
                            return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0003 7.5013C9.54033 7.5013 9.16699 7.12797 9.16699 6.66797C9.16699 6.20797 9.54033 5.83464 10.0003 5.83464C10.4603 5.83464 10.8337 6.20797 10.8337 6.66797C10.8337 7.12797 10.4603 7.5013 10.0003 7.5013ZM10.8337 13.3346C10.8337 13.7946 10.4603 14.168 10.0003 14.168C9.54033 14.168 9.16699 13.7946 9.16699 13.3346V9.16797C9.16699 8.70797 9.54033 8.33464 10.0003 8.33464C10.4603 8.33464 10.8337 8.70797 10.8337 9.16797V13.3346ZM10.0003 1.66797C5.39783 1.66797 1.66699 5.3988 1.66699 10.0013C1.66699 14.6038 5.39783 18.3346 10.0003 18.3346C14.602 18.3346 18.3337 14.6038 18.3337 10.0013C18.3337 5.3988 14.602 1.66797 10.0003 1.66797Z" fill="#4C6EF5"/>
                </svg>`;
                    }
                }

                // checkErrorCookie(toastId, shows) {
                //    
                //     const messagesCookie =
                //         document
                //             .cookie.split('; ')
                //             .find((element) => element.startsWith('messages'));
                //     if (!messagesCookie) {
                //         this.setErrorCookie(toastId);
                //         return true;
                //     } else {
                //         const toasts = messagesCookie.split('=')[1];
                //         if (!toasts) {
                //             this.setErrorCookie(toastId);
                //             return true;
                //         } else {
                //             const thisToast = toasts.split(',').find((toast) => toast.split('(')[0] === toastId);
                //             if (thisToast) {
                //                 const thisShows = Number([...thisToast].splice(-3)[1]);
                //                 if (shows !== null) {
                //                     if (thisShows <= shows) {
                //                         this.setErrorCookie(toastId, (thisShows + 1));
                //                     } else return false;
                //                     return true;
                //                 }
                //                
                //             } else return false;
                //         }
                //     }
                // }

                // setErrorCookie(toastId, shows) {
                //     // eslint-disable-next-line no-debugger
                //     debugger
                //     const errorsCookie = document
                //         .cookie.split('; ')
                //         .find((element) => element.startsWith('messages'));
                //     let resultString = errorsCookie ? '' : 'messages=';
                //     const cookieShows = shows || 1
                //     document.cookie = resultString + toastId + "(" + cookieShows + ")";
                // }

                showToast() {
                    // if (this.checkErrorCookie(this.toastId, this.shows)) {
                    this.DOMElement.classList.add('show');
                    this.DOMElement.style.height = this.DOMElement.querySelector('.toast-wrapper').scrollHeight + 'px';
                    setTimeout(() => {
                        this.container.style.pointerEvents = 'auto';
                        this.DOMElement.classList.remove('opacity-0');
                    }, 350)
                    //}
                    setTimeout(() => {
                        this.hideToast(this.DOMElement);
                    }, 5000)
                }

                hideToast(DOMElement) {
                    DOMElement.classList.add('opacity-0');
                    setTimeout(() => {
                        DOMElement.style.height = '0px';
                        setTimeout(() => {
                            this.DOMElement.classList.remove('show');
                            DOMElement.remove();
                        }, 300)
                    }, 300)
                    if (!this.container.querySelector('.toast')) {
                        this.container.style.pointerEvents = 'none';
                    }
                }
            },
            
            processAll() {
                const errorsStack = Store.getters.getErrorsStack;
                if (errorsStack.length > 0) {
                    let i = 0;
                    let queue;
                    processToast(i);

                    // eslint-disable-next-line no-inner-declarations
                    function processToast(i) {
                        if (errorsStack[i]) {
                            queue = new Promise(resolve => {
                                setTimeout(() => {
                                    errorsStack[i].toastId = 'error-toast-' + (i + 1);
                                    const thisClass = Vue.prototype.$toast.class;
                                    const newToast = new thisClass(errorsStack[i]);
                                    console.log(newToast)
                                    resolve()
                                }, 1000)
                            })
                            queue.then(() => {
                                if (i <= errorsStack.length) {
                                    i++;
                                    processToast(i)
                                }
                            })
                        }

                    }
                }
            },

            processOne(options) {
                new this.class.ErrorToast(options)
            },
            
            processNew(toast) {
                new Vue.prototype.$toast.class(toast)
            },
            
            mounted() {
                this.processAll();
            }
        }
    }
}


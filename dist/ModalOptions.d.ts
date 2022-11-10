export declare class ModalOptions {
    private width;
    getWidth(): string;
    setWidth(width: string): void;
    constructor(options: Options);
}
export interface Options {
    width: string;
    height: string;
    buttons: Buttons;
}
export interface Buttons {
    gap: string;
    acceptButton: AcceptButton;
    rejectButton: RejectButton;
}
export interface AcceptButton {
    color: string;
    bgColor: string;
    radius: number;
}
export interface RejectButton {
    color: string;
    bgColor: string;
    radius: number;
}

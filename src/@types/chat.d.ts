export {};

declare global {
  type Chat = {
    name: string;
    date: Date;
    text: string;
  };
}

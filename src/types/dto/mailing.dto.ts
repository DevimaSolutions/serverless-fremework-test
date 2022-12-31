export interface IMail {
  recipients: string[];
  title: string;
  textContent?: string;
  htmlContent?: string;
}

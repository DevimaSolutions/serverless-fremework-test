export interface IAwsConfigs {
  apiVersion: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}
export interface IAwsDatabaseConfigs {
  apiVersion: string;
  endpoint: string;
}
export interface IRecipientConfigs {
  recipientEmails: string[];
}
export interface IMailerConfigs {
  senderEmail: string;
  apiVersion: string;
}

export interface IEnv {
  aws: IAwsConfigs;
  awsDatabase: IAwsDatabaseConfigs;
  recipient: IRecipientConfigs;
  mailer: IMailerConfigs;
}

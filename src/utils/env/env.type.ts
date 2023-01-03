export enum AwsRegionEnum {
  usEast1 = 'us-east-1',
  usEast2 = 'us-east-2',
  usGovEast1 = 'us-gov-east-1',
  usGovWest1 = 'us-gov-west-1',
  usIsoEast1 = 'us-iso-east-1',
  usIsoWest1 = 'us-iso-west-1',
  usIsobEast1 = 'us-isob-east-1',
  usWest1 = 'us-west-1',
  usWest2 = 'us-west-2',
  afSouth1 = 'af-south-1',
  apEast1 = 'ap-east-1',
  apNortheast1 = 'ap-northeast-1',
  apNortheast2 = 'ap-northeast-2',
  apNortheast3 = 'ap-northeast-3',
  apSouth1 = 'ap-south-1',
  apSoutheast1 = 'ap-southeast-1',
  apSoutheast2 = 'ap-southeast-2',
  apSoutheast3 = 'ap-southeast-3',
  caCentral1 = 'ca-central-1',
  cnNorth1 = 'cn-north-1',
  cnNorthwest1 = 'cn-northwest-1',
  euCentral1 = 'eu-central-1',
  euCentral2 = 'eu-central-2',
  euNorth1 = 'eu-north-1',
  euSouth1 = 'eu-south-1',
  euSouth2 = 'eu-south-2',
  euWest1 = 'eu-west-1',
  euWest2 = 'eu-west-2',
  euWest3 = 'eu-west-3',
  meCentral1 = 'me-central-1',
  meSouth1 = 'me-south-1',
  saEast1 = 'sa-east-1',
}

export interface IAwsConfigs {
  apiVersion: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: AwsRegionEnum;
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

export interface IDeploymentConfig {
  prodDomain: string;
  devDomain: string;
  stage: string;
}

export interface IEnv {
  aws: IAwsConfigs;
  awsDatabase: IAwsDatabaseConfigs;
  recipient: IRecipientConfigs;
  mailer: IMailerConfigs;
  deployment: IDeploymentConfig;
}

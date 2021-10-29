import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkLambdaDashboard from '../lib/cdk-lambda-dashboard-stack';

test('Lambda Dashboard Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkLambdaDashboard.CdkLambdaDashboardStack(app, 'MyTestStack', {
      dashboardName: "myLambdaDashboard"
  });
    // THEN
    expectCDK(stack).to(haveResource("AWS::CloudWatch::Dashboard", {
      DashboardName: "myLambdaDashboard"
    }));
});

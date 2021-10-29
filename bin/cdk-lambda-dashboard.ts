#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkLambdaDashboardStack } from '../lib/cdk-lambda-dashboard-stack';
import { TransactionsAPI } from '../lib/cdk-transactions-api-lambda-construct';

const app = new cdk.App();

const lambdaDashboardStack = new CdkLambdaDashboardStack(app, 'TransactionsLambdaDashboardStack', {
    dashboardName: "TransactionsLambdaDashboard"
});

const transactionsApi = new TransactionsAPI(lambdaDashboardStack, "TransactionsApi");

lambdaDashboardStack.addLambda("BeginTransaction", "BeginTransaction");
lambdaDashboardStack.addLambda("UpdateTransaction", "UpdateTransaction");
lambdaDashboardStack.addLambda("GetTransaction", "GetTransaction");

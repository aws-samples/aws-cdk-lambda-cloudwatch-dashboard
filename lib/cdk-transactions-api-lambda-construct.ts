import * as cdk from '@aws-cdk/core';
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";

export class TransactionsAPI extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        const getTransactionHandler = new lambda.Function(this, "GetTransaction", {
            functionName: "GetTransaction",
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("src"),
            handler: "GetTransaction.handler",
        });

        const beginTransactionHandler = new lambda.Function(this, "BeginTransaction", {
            functionName: "BeginTransaction",
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("src"),
            handler: "BeginTransaction.handler",
        });

        const updateTransactionHandler = new lambda.Function(this, "UpdateTransaction", {
            functionName: "UpdateTransaction",
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("src"),
            handler: "UpdateTransaction.handler",
        });

        const transactionsApi = new apigateway.RestApi(this, "TransactionsAPI", {
            restApiName: "Transactions API",
            description: "Critical Transactions API"
        });

        const transactions = transactionsApi.root.addResource("transactions")
        const transaction = transactions.addResource("{transaction_id}")

        const beginTransactionIntegration = new apigateway.LambdaIntegration(beginTransactionHandler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        });
        transactions.addMethod("POST", beginTransactionIntegration);

        const getTransactionIntegration = new apigateway.LambdaIntegration(getTransactionHandler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        });
        transaction.addMethod("GET", getTransactionIntegration);


        const updateTransactionIntegration = new apigateway.LambdaIntegration(updateTransactionHandler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        });
        transaction.addMethod("PUT", updateTransactionIntegration);
    }
}
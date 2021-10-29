import * as cdk from '@aws-cdk/core';
import { Dashboard, GraphWidget, Metric } from '@aws-cdk/aws-cloudwatch';

export interface LambdaDashboardsStackProps extends cdk.StackProps {
    dashboardName: string;
}

export class CdkLambdaDashboardStack extends cdk.Stack {

    protected readonly lambdaDashboard: Dashboard;

    protected readonly invocations = new Metric({
        namespace: "AWS/Lambda",
        metricName: "Invocations",
        statistic: "sum"
    });

    protected readonly duration = new Metric({
        namespace: "AWS/Lambda",
        metricName: "Duration",
        statistic: "min"
    });

    protected readonly errors = new Metric({
        namespace: "AWS/Lambda",
        metricName: "Errors",
        statistic: "sum"
    });

    protected readonly throttles = new Metric({
        namespace: "AWS/Lambda",
        metricName: "Throttles",
        statistic: "sum"
    });

    protected readonly provisionedConcurrencySpillovers = new Metric({
        namespace: "AWS/Lambda",
        metricName: "ProvisionedConcurrencySpilloverInvocations",
        statistic: "sum"
    });

    protected readonly concurrentExecutions = new Metric({
        namespace: "AWS/Lambda",
        metricName: "ConcurrentExecutions",
        statistic: "sum"
    });

    protected readonly provisionedConcurrentExecutions = new Metric({
        namespace: "AWS/Lambda",
        metricName: "ProvisionedConcurrentExecutions",
        statistic: "sum"
    });

    protected readonly provisionedConcurrencyUtilization = new Metric({
        namespace: "AWS/Lambda",
        metricName: "ProvisionedConcurrencyUtilization",
        statistic: "sum"
    });

    constructor(scope: cdk.App, id: string, props: LambdaDashboardsStackProps) {
        super(scope, id, props);

        this.lambdaDashboard = new Dashboard(this, props.dashboardName, {
            dashboardName: props.dashboardName
        });
    }

    // adds one row to dashboard for each lambda function
    public addLambda(functionName: string, displayName: string) {

        const dimensions = {
            "FunctionName": functionName
        };

        this.lambdaDashboard.addWidgets(
            new GraphWidget({
                title: displayName + " Invocations",
                left: [
                    this.invocations.with({
                        dimensions: dimensions,
                    }),

                ]
            }),

            new GraphWidget({
                title: displayName + " Duration",
                left: [
                    this.duration.with({
                        dimensions: dimensions,
                    }),
                    this.duration.with({
                        dimensions: dimensions,
                        statistic: "avg"
                    }),
                    this.duration.with({
                        dimensions: dimensions,
                        statistic: "max"
                    }),
                ]
            }),

            new GraphWidget({
                title: displayName + " Errors",
                left: [
                    this.errors.with({
                        dimensions: dimensions,
                    }),
                    this.throttles.with({
                        dimensions: dimensions,
                    }),
                    this.provisionedConcurrencySpillovers.with({
                        dimensions: dimensions,
                    })
                ]
            }),

            new GraphWidget({
                title: displayName + " ConcurrentExecutions",
                right: [
                    this.concurrentExecutions.with({
                        dimensions: dimensions,
                    }),
                    this.provisionedConcurrentExecutions.with({
                        dimensions: dimensions,
                    }),
                    this.provisionedConcurrencyUtilization.with({
                        dimensions: dimensions,
                    })
                ]
            }),
        );
    }
}

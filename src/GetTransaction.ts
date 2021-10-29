import { APIGatewayProxyEvent } from "aws-lambda";

exports.handler = async function (event: APIGatewayProxyEvent) {
    var method = event.httpMethod;

    if (method === "GET") {

        const transaction_id = event.pathParameters ? event.pathParameters["transaction_id"] : null;

        var body = {
            transaction_id: transaction_id
        }

        return {
            statusCode: 200,
            headers: {},
            body: JSON.stringify(body)
        };
    }

    return {
        statusCode: 400,
        headers: {},
        body: "Bad Request - Only GET is allowed"
    };
}

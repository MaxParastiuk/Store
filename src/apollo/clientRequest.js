import client from "./client";

export default function clientRequest(queryParam, variablesObj) {
	return client.query({
		query: queryParam,
		variables: variablesObj,
	});
}

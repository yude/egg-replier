export default {
	async email(message, env, ctx) {
		const send_request = new Request('https://api.mailchannels.net/tx/v1/send', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				personalizations: [
					{
						to: [{ email: `${message.from}`, name: `${message.from}` }],
					},
				],
				from: {
					email: "press@yude.jp",
					name: 'press',
				},
				subject: 'hi',
				content: [
					{
						type: 'text/plain',
						value: `🐣🐣🐣`,
					},
				],
			}),
		})

		const resp = await fetch(send_request);
		const respText = await resp.text();

		const { value: messageRaw } = await message.raw.getReader().read()
		const messageRawJSON = new TextDecoder().decode(messageRaw)
		console.log("Received message", messageRawJSON)
		console.log("Response", resp.status + " " + resp.statusText + " " + respText)
	},
}

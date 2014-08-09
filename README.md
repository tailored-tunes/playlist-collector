# Playlist collector

The playlist collector is a lightweight, fast-to-respond service that consumes
requests to store playlist information within Tailored Tunes.

We're using Node.js for it's asynchronous nature, so we could respond to the
user before even processing the data.

>Note, that because of this, we cannot guarantee that the message will
successfully arrive in our databases.

## Sending data
The collector accepts data via `POST` only to the root domain

### Incoming message format

```json
{
  "source": "deezer",
  "id": "xyz",
  "userToken": "abc123",
  "time": 1407248924
}
```

#### source
The name of the playlist provider

#### id
The identifier of the playlist at the provider

#### userToken
The user's token whom requested to add this playlist to the system

#### time
Time of message creation on the user's side

### Response codes

#### Upon success
`200 OK`

#### Upon malformed message
`400 BAD REQUEST`

#### If anything goes wrong on the server side
`500 INTERNAL SERVER ERROR`

## Heartbeat
You can check if the node is alive by issueing a `GET` to `/status`

## Configuration

All configuration parameters must come from the environment the software is
installed to.

### Parameters:

#### SNS_TOPIC
The SNS topic to publish the information to

#### AWS_ACCESS_KEY_ID
The amazon aws access key necessary to publish to the [SNS_TOPIC](#SNS_TOPIC)

#### AWS_REGION
The amazon region to use

#### AWS_SECRET_ACCESS_KEY
The secret key paired to the [access key](#AWS_ACCESS_KEY_ID)

#### RETRY_COUNT
If the SNS publishing fails, how many times should we retry before failing

## Metrics

The metric we care about are the following:

- total number of messages received
- number of valid messages
- number of invalid messages
- number of storage attempts
- number of successful storages
- number of failed storages (after the retry policy failed)
- uptime

### Metric url

`/metrics`

## hub

the hub is the intermediary between the spark cloud and our frontend clients

### info

We used to use the [local cloud](docs/local_cloud.md) but decided against it because maintaining our own device sockets seems like a pain in the ass. It would also require us to completely reverse engineer the [spark-protocol](https://github.com/spark/spark-protocol).

Instead, we'll use the hosted spark cloud since it is included in each core. We will communicate knowing each core's hash ID and who it is associated to.

If the core is `flashing yellow`, you'll need to regenerate the device keys and tell the spark cloud about it. There's a [forum post](https://community.spark.io/t/troubleshooting-my-core-is-flashing-yellow-red-lights-after-it-connects-to-wifi/627/2) on how to do it.
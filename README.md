## hub

all the devices communicate here

### instructions

1. Install the Spark CLI.

        npm install -g spark-cli

2. Add the following lines to `~/.spark/spark.config.json`

        {
          "apiUrl": "http://hub.atomicdevices.co/spark"
        }

3. Create an [account](http://hub.atomicdevices.co/register)

4. Get your auth credentials.

        spark-cli setup

5. Put the device into DFU mode by holding the `MODE` button and pressing the `RESET` button and waiting until the LED blinks yellow.

6. You will need to obtain the server's public key in order to flash onto the device.

        spark keys server default_key.pub.pem hub.atomicdevices.co

7. Obtain the key and upload it to the server.

        spark keys doctor 53ff68066667574816370967
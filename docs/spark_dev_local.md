## developing locally

If you want to receive spark data, make sure the spark that you have is not
currently being used on production. If so, you may want to remove it.

Afterwards, add it to your local device environment.

Install [ngrok](https://ngrok.com/) to help you receive data
past a firewall. Some of the commands look like

    brew install ngrok
    ngrok 3000

Afterwards, it will return a URL which you will then add into your `.env` file.

    BASE_URL=http://hub-steve.ngrok.com/

Then run

    ./bin/job ensure_spark_webhook

This will ensure that this webhook is installed and calling to
your local machine.

Reboot your Spark and it will now sync with your local environment!

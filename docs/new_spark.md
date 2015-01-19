## getting a new spark core

things that need to be done when a new spark core arrives

1. boot to dfu mode (hold menu button down, then press reset until yellow light blinks)

2. update `cc3000` firmware
        spark flash --usb cc3000

3. update `tinker` firmwre
        spark flash --usb tinker

4. get spark identity
        spark identify

5. setup wifi
        spark setup wifi

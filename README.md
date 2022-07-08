# autoHue
autoHue is a simple program I made to turn off my Hue lights when I turned off my computer, even if I put it to sleep or hibernate it.
# How to Use
You need to have NodeJS and npm installed for this program to work. Edit the config.json file, and change the values inside the quotation marks ("").
To get your bridge ip address, you can go into your router settings and look through all the devices until you find your Hue bridge, or go to this website: https://discovery.meethue.com/
It should look something like this in your browser:

`[{"id":"the id","internalipaddress":"the ip address (the thing you're looking for!)","port":the port}]`

Then copy the ip address and put it in the bridge_ip section of the config file. To get the username, go to this link:

http://(bridge ip address)/debug/clip.html

The tab should look like this:

![image](https://user-images.githubusercontent.com/88277260/178057384-50e3d423-bcbb-49d6-a89e-e70b37919442.png)

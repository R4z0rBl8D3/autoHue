# autoHue
autoHue is a simple program I made to turn off my Hue lights when I turned off my computer, even if I put it to sleep or hibernate it.
# How to Use
You need to have NodeJS installed for this program to work. Edit the config.json file, and change the values inside the quotation marks ("").
To get your bridge ip address, you can go into your router settings and look through all the devices until you find your Hue bridge, or go to this website: https://discovery.meethue.com/
It should look something like this in your browser:

`[{"id":"the id","internalipaddress":"the ip address (the thing you're looking for!)","port":the port}]`

Then copy the ip address and put it in the bridge_ip section of the config file. To get the username, go to this link:

http://(bridge ip address)/debug/clip.html

The tab should look like this:

![image](https://user-images.githubusercontent.com/88277260/178059187-91c77c2c-db80-45aa-ad33-61d379e30257.png)

Put in the URL text field:

`/api`

And in the Message Body field:

`{"devicetype":"my_hue_app#YOUR DEVICE NAME HERE"}`

Press the POST button. I think it only works for mobile devices but I haven't tried it on my computer yet, I just used my phone. Then it should say in Command Response that there is an error and the description should say "link button not pressed". Go to your bridge and press the button. Then press the POST button again and it should give you the username. Put the username in the config file.

For the light_ids field you should be able to leave it, but if you only have one light then it should look like this: `"light_ids":["1"]`. You can also add more if you have more lights by adding commas and incrementing the number by 1 (it has to be in quotation marks).

To find your computer ip search up how to find it on your operating system and fill it out in the config file. You can leave log_file_path alone and change false to true for done_editing.

Then run the program by going into the terminal and going into the correct directory and typing `node .`

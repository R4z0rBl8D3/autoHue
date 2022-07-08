const axios = require('axios')
const ping = require("net-ping");
const deasync = require('deasync')
const log4js = require('log4js')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync(__dirname + "/config.json"))

if (config.done_editing === false)
{
    console.error("Please edit the config.json file and change done_editing to true!")
    process.exit(1)
}

log4js.configure({
    appenders: {
      everything: { type: "file", filename: "logs.log" },
    },
    categories: {
      default: { appenders: ["everything"], level: "debug" },
    },
  });
var logger = log4js.getLogger();
logger.level = 'debug'
logger.info("App started!");

const username = config.username //username to connect to hue lights
const url = config.bridge_ip

function GetLightsSync(url, username, callback)
{
    axios.get(`${url}/api/${username}/lights`).then(data => {
        return callback(data.data)
    }).catch(err => {
        throw new Error(err)
    })
}

function log(text, type)
{
    if (type === "debug")
    {
        console.log(text)
        logger.debug(text)
    }
    if (type === "info")
    {
        console.log(text)
        logger.info(text)
    }
    if (type === "error")
    {
        console.error(text)
        logger.error(text)
    }
    if (type === "fatal")
    {
        console.error(text)
        logger.fatal(text)
    }
}

var session = ping.createSession()

try
{
    while (true)
    {
        session.pingHost(config.computer_ip, async function(error, target) {
            if (error)
            {
                GetLightsSync(url, username, async (data) => {
                    console.log(`Computer is OFF! Light #1 is ${data[config.light_ids[0]].state.on ? "ON!" : "OFF!"} Light #2 is ${data[config.light_ids[1]].state.on ? "ON!" : "OFF!"}`)
                    if (data[config.light_ids[0]].state.on === true)
                    {
                        console.log("Turning off light #1...")
                        try
                        {
                            const res = await axios({
                                method: 'put',
                                url: `${url}/api/${username}/lights/${config.light_ids[0]}/state`,
                                headers: {},
                                data: {
                                    on: false,
                                    alert: "select"
                                }
                            })
                            if (res.data[0].success === undefined)
                            {
                                logger.error("Light #1 was NOT successfully turned off!")
                                console.error("Light #1 was NOT successfully turned off!")
                            }
                            else
                            {
                                logger.info("Light #1 was successfully turned off!")
                                console.log("Light #1 was successfully turned off!")
                            }
                        }
                        catch (error)
                        {
                            logger.error("Light #1 was NOT successfully turned off! " + error)
                            console.error("Light #1 was NOT successfully turned off! " + error)
                        }
                    }
                    if (data[config.light_ids[1]].state.on === true)
                    {
                        console.log("Turning off light #2...")
                        try
                        {
                            const res = await axios({
                                method: 'put',
                                url: `${url}/api/${username}/lights/${config.light_ids[1]}/state`,
                                headers: {},
                                data: {
                                    on: false,
                                    alert: "select"
                                }
                            })
                            if (res.data[0].success === undefined)
                            {
                                logger.error("Light #2 was NOT successfully turned off!")
                                console.error("Light #2 was NOT successfully turned off!")
                            }
                            else
                            {
                                logger.info("Light #2 was successfully turned off!")
                                console.log("Light #2 was successfully turned off!")
                            }
                        }
                        catch (error)
                        {
                            logger.error("Light #2 was NOT successfully turned off! " + error)
                            console.error("Light #2 was NOT successfully turned off! " + error)
                        }
                    }
                })
            }
            else
            {
                GetLightsSync(url, username, async (data) => {
                    console.log(`Computer is ON! Light #1 is ${data[config.light_ids[0]].state.on ? "ON!" : "OFF!"} Light #2 is ${data[config.light_ids[1]].state.on ? "ON!" : "OFF!"}`)
                    if (data[config.light_ids[0]].state.on === false)
                    {
                        console.log("Turning on light #1...")
                        try
                        {
                            const res = await axios({
                                method: 'put',
                                url: `${url}/api/${username}/lights/${config.light_ids[0]}/state`,
                                headers: {},
                                data: {
                                    on: true,
                                    alert: "select"
                                }
                            })
                            if (res.data[0].success === undefined)
                            {
                                logger.error("Light #1 was NOT successfully turned on!")
                                console.error("Light #1 was NOT successfully turned on!")
                            }
                            else
                            {
                                logger.info("Light #1 was successfully turned on!")
                                console.log("Light #1 was successfully turned on!")
                            }
                        }
                        catch (error)
                        {
                            logger.error("Light #1 was NOT successfully turned on! " + error)
                            console.error("Light #1 was NOT successfully turned on! " + error)
                        }
                    }
                    if (data[config.light_ids[1]].state.on === false)
                    {
                        console.log("Turning on light #2...")
                        try
                        {
                            const res = await axios({
                                method: 'put',
                                url: `${url}/api/${username}/lights/${config.light_ids[1]}/state`,
                                headers: {},
                                data: {
                                    on: true,
                                    alert: "select"
                                }
                            })
                            if (res.data[0].success === undefined)
                            {
                                logger.error("Light #2 was NOT successfully turned on!")
                                console.error("Light #2 was NOT successfully turned on!")
                            }
                            else
                            {
                                logger.info("Light #2 was successfully turned on!")
                                console.log("Light #2 was successfully turned on!")
                            }
                        }
                        catch (error)
                        {
                            logger.error("Light #2 was NOT successfully turned on! " + error)
                            console.error("Light #2 was NOT successfully turned on! " + error)
                        }
                    }
                })
            }
        })
        deasync.sleep(5000)
    }
}
catch (err)
{
    console.error(err)
    logger.fatal("An error happened during the loop that was not handled! " + err)
}

logger.info("App exiting!")
log4js.shutdown
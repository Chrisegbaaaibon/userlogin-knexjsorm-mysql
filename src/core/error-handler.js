const fs = require('fs')

require("dotenv").config()

function errorProcessing(receivedErrorMessage){
    let errorMessage = receivedErrorMessage.message.split(':')
    errorMessage = errorMessage[1].split('|')
    let errorObject = errorMessage.length

    if(errorObject <= 1) logErrorToFile(receivedErrorMessage)

    return {
        errorCode: (errorObject > 1) ? errorMessage[0] : 500,
        errorMessage: {
            message: (errorObject > 1) ? errorMessage[1] : 'Internal Server Error'
        }
    }
}

function errorHandling(receivedErrorMessage){
    throw new Error(receivedErrorMessage)
}

function logErrorToFile(receivedErrorMessage){
    console.log(receivedErrorMessage)
    fs.appendFileSync(`src/${process.env.VERSION}/error.log.txt`,  new Date() + ' ' + receivedErrorMessage + "\r\n")
}

module.exports = {
    errorProcessing,
    errorHandling
}
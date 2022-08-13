'use strict'

const {errorHandling} = require("./error-handler");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const {v1} = require('uuid')

function uid(){
    return v1(undefined, undefined, undefined)
}

function sanitizeUserInput (dataInput = '', dataLength = 0, dataIsHtml = false, dataRemoveTags = true) {
    const utf8_decode = require('locutus/php/xml/utf8_decode')
    const strip_tags = require('locutus/php/strings/strip_tags')
    const addslashes = require('locutus/php/strings/addslashes')
    const str_ireplace = require('locutus/php/strings/str_ireplace')
    const htmlentities = require('locutus/php/strings/htmlentities')

    // remove all utf8 characters
    dataInput = dataInput.toString()
    dataInput = utf8_decode ( dataInput.trim () )

    let allowedCharacters = "<b><h1><h2><h3><h4><h5><h6><br><br /><hr><hr /><em><strong><a><ul><ol><li><dl><dt><dd><table><tr><th><td><blockquote><address><div><p><span><i><u><s><sup><sub><style><tbody>"
    // by default the allowedCharacters variable enables the tags to pass through
    // to disable these, set dataRemoveTags to false
    if ( dataRemoveTags ) dataInput = strip_tags( dataInput, allowedCharacters )

    let harmfulFunctions = ['onabort', 'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavaible', 'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate', 'ondrag', 'ondragdrop', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onerrorupdate', 'onfilterupdate', 'onfinish', 'onfocus', 'onfocusin', 'onfocusout', 'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmoveout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange', 'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll', 'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop', 'onsubmit', 'onunload', 'eval']
    dataInput = str_ireplace( harmfulFunctions,'x' ,dataInput )
    // replace all html characters

    if ( !dataIsHtml ) return ( dataLength > 0 ) ? addslashes( dataInput.trim().replace( /<[^>]*>/g, '' ) ).substr( 0, dataLength ) : addslashes( dataInput.trim().replace( /<[^>]*>/g, '' ) )

    dataInput = addslashes( htmlentities( dataInput ))
    if ( dataLength > 0 ) return dataInput.substr( 0, dataLength )
    else return dataInput
}

async function  verifyToken (req, res, next){
    try {
        const token = req.params.token || req.query.token || req.headers.authorization;
        if(!token) errorHandling(`400|No token provided|`)

        const decoded = await jwt.verify(token, process.env.KEY)
        let key = decoded.id

        let user;
        //let user = findOne({filter: key})
        if(!user) errorHandling(`400| User not found|`)
        req.user = user;
        next()
    }catch (e) {
        next(new Error(e.stack))
    }
}

async function hashPassword(_password){
    return await bcrypt.hash(_password, 5)
}


module.exports = {
    sanitizeUserInput,
    verifyToken,
    hashPassword,
    uid
}
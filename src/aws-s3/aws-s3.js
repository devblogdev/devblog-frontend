// Documentation: 
// This software-development-kid performs 'browser-based uploads to Amazon S3'.
// For official documention on the above process, refer to the "Amazon Simple Storage Service API Reference",
// section "Authenticating Requests in Browser-Based Uploads Using POST (AWS Signature Version 4)", 
// subsections "Broswer-Based uploads Using HTTP-POST", "Calculating a Signature", "POST Policy", 
// and "Example: Browser-Based Upload using HTTP POST (Using AWS Signature Version 4)"

const crypto = require('crypto');

class S3Client {

    // static crypto = require('crypto');
    
    constructor (config) {
        this.config = config; 
    }

    uploadFile(file, key, dirName) {
        try {
            this._sanityCheckConfig(); 
            this._sanityCheckPayload({file, key, dirName});

            const tenMinutes = 6e5;
            const isoDate = new Date(new Date().getTime() + tenMinutes).toISOString();
            const date = isoDate.split("T")[0].split("-").join("");  // yyyymmdd
            const formattedIso = isoDate.split("-").join("").split(":").join("").split(".").join("");

            const policy = this._generatePolicy(isoDate, date, formattedIso);
            const signature = this._generateSignature(date, policy);
            // const newKey = this.config.parseFileName ? this._generateKey(file, key) : key
            const newKey = this._generateKey(file, key)
            const fileName = dirName ? dirName + "/" + newKey : newKey;
            
            // Create a form to send to AWS S3
            let formData = new FormData();
            formData.append("key", fileName)
            formData.append("acl", "public-read")
            formData.append("content-type", file.type)
            formData.append("x-amz-meta-uuid", "14365123651274")
            formData.append("x-amz-server-side-encryption", 'AES256')
            formData.append("x-amz-credential", `${this.config.accessKeyId}/${date}/${this.config.region}/s3/aws4_request`)
            formData.append("x-amz-algorithm", 'AWS4-HMAC-SHA256')
            formData.append("x-amz-date", formattedIso)
            formData.append("x-amz-meta-tag", "")
            formData.append("policy", policy)
            formData.append("x-amz-signature", signature)
            formData.append("file", file)

            return new Promise((resolve, reject) => {
                this._request(this.config.baseUrl, 'POST', formData, function(statusCode, xhr){
                    if(statusCode >= 200 && statusCode <= 207) {
                        console.log(xhr)
                        return resolve({
                            bucket: this.config.bucketName, 
                            key: fileName, 
                            location: this.config.baseUrl + "/" +  fileName, 
                            status: statusCode 
                        });
                    }
                    return reject({
                        message: xhr.responseText, 
                        status: xhr.status, 
                        statusText: xhr.statusText
                    });
                }.bind(this))
            })
        } catch(error) {
            return Promise.reject(error)
        }
    }

    deleteFile(key, dirName){
        try {
            this._sanityCheckConfig(); 
            if(typeof(key) !== "string" || !key.trim().length) throw new Error("'key' must be a nonempty string");
            if(dirName && (typeof dirName !== "string" || !dirName.length)) throw new Error("If included, 'dirName' must be a nonempty string");
            return new Promise((resolve, reject) => {
                this._request(this.config.baseUrl + "/" + (dirName ? dirName + "/" : "") + key, "DELETE", undefined, function(statusCode, xhr) {
                    console.log(statusCode);
                    console.log(xhr);
                    return resolve({
                        key: (dirName ? dirName + "/" : "") + key, 
                        status: statusCode,
                        xhr: xhr
                    });
                })
            })
        } catch(error){
            return Promise.reject(error);
        }
    }

    _request(uri, method, payload, callback) {
        let xhr = new XMLHttpRequest();
        if(method === "POST" && this.config.onUploadProgress){
            xhr.upload.onprogress = function(event) {
                this.config.onUploadProgress(event.loaded, event.total)
            }.bind(this)
        }
        xhr.open(method, uri, true);
        xhr.onreadystatechange = function() {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                let statusCode = xhr.status;
                if(callback){
                    callback(statusCode, xhr);
                }
            }
        }
        xhr.send(payload);
    }
    
    _sanityCheckConfig() {
        if(typeof(this.config) !== "object" || (this.config instanceof Array) || !Object.keys(this.config).length ) throw new Error("The argument for the constructor of the " + this.constructor.name + " class must be a nonempty object");
        // Required params
        if(typeof(this.config.bucketName) !== "string" || !this.config.bucketName.trim().length ) throw new Error("'bucketName' must be a nonempty string");
        if(typeof(this.config.region) !== "string" || !this.config.region.trim().length ) throw new Error("'region' must be a nonempty string");
        if(typeof(this.config.accessKeyId) !== "string" || !this.config.accessKeyId.trim().length ) throw new Error("'accessKeyId' must be a nonempty string");
        if(typeof(this.config.secretAccessKey) !== "string" || !this.config.secretAccessKey.trim().length ) throw new Error("'secretAccessKey' must be a nonempty string");
        // Optional params
        if(this.config.baseUrl && (typeof(this.config.baseUrl) !== "string" || !this.config.baseUrl.trim().length)){ throw new Error("If included, 'baseUrl' must be a nonempty string") } else this.config.baseUrl = (this.config.baseUrl || 'https://' + this.config.bucketName + '.s3.' + this.config.region + '.amazonaws.com');         
        if(this.config.parseFileName && typeof(this.config.parseFileName) !== "boolean"){ throw new Error("If included, 'parseFileName' must be a boolean") } else this.config.parseFileName = this.config.parseFileName !== undefined ? this.config.parseFileName : true;
        if(this.config.onUploadProgress && typeof(this.config.onUploadProgress) !== "function") throw new Error("If included, the value for the 'onUploadProgress' key must be a function");
        if(this.config.parsingFunction && typeof(this.config.parsingFunction) !== "function") throw new Error("If included, the value for the 'parsingFunction' key must be a function returning a nonempty string")
    }

    _sanityCheckPayload(payload) {
        if(!payload.file) throw new Error("A file must be provided");
        if(payload.key && (typeof(payload.key) !== "string" || !payload.key.trim().length)) throw new Error("If included, the 'key' argumant must be a string");
        if(payload.dirName && (typeof(payload.dirName) !== "string" || !payload.dirName.trim().length)) throw new Error("If included, the 'dirName' argument must be a nonempty string");
    }

    _generatePolicy(isoDate, date, formattedIso) {
        // Note: The optional "encoding" parameter from "Buffer.from(string[,enconding])" defaults to utf8
        return Buffer.from(
            JSON.stringify(
                { 
                    expiration: isoDate,
                    conditions: [
                        {"bucket": this.config.bucketName},
                        {"acl": "public-read"},
                        ["starts-with", "$key", ""],
                        ["starts-with", "$Content-Type", ""],
                        {"x-amz-meta-uuid": "14365123651274"},
                        {"x-amz-server-side-encryption": "AES256"},
                        ["starts-with", "$x-amz-meta-tag", ""],
                        {"x-amz-credential": `${this.config.accessKeyId}/${date}/${this.config.region}/s3/aws4_request`},
                        {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
                        {"x-amz-date": formattedIso }
                    ] 
                }
            )
        )
        .toString('base64')
        .replaceAll(/[$\n\r]/g, "")
    }

    _generateSignature(date, policy) {
          // Calculating the SigningKey
        //   let c = this.constructor.crypto;
          let c = crypto;
          // c ( algorithm, key, ..rest(string))
          const dateKey = c.createHmac('sha256', "AWS4" + this.config.secretAccessKey).update(date).digest();
          const dateRegionKey = c.createHmac('sha256', dateKey).update(this.config.region).digest();
          const dateRegionServiceKey = c.createHmac('sha256', dateRegionKey).update('s3').digest();
          const signingKey = c.createHmac('sha256', dateRegionServiceKey).update('aws4_request').digest();
          const signature = c.createHmac('sha256', signingKey).update(policy).digest('hex');
          // signing key = HMAC-SHA256(HMAC-SHA256(HMAC-SHA256(HMAC-SHA256("AWS4" + "<YourSecretAccessKey>","20130524"),"us-east-1"),"s3"),"aws4_request")
          return signature;
    }

    _generateKey(file, key) {
        let newKey, s;
        if(this.config.parsingFunction && (typeof(s = this.config.parsingFunction(key)) !== "string" || !s.length)) throw new Error("The function for the 'parsingFunction' key must return a nonempty string")
        // if there is a key, and it inlcudes a period, then if there is a parsingFunction, make 'newKey' equal to the return value of the parsingFunction, otherwise make 'newKey' equal to the return value of the 'helpers.parseKey' function
        newKey = key && key.includes('.') 
            ? (
                ( this.config.parseFileName && ((this.config.parsingFunction && s) || helpers.parseKey(key)) ) ||
                key
              )
            : ( 
                ( key && this.config.parseFileName && ((this.config.parsingFunction && s) || helpers.parseKey(key)) )  || 
                key ||
                crypto.randomBytes(11).toString('hex')
               ) + "." + file.type.split("/")[1];
        return newKey;   
    }
    // _generateKey(file, key) {
    //     let newKey;
    //     const extension = file.type.split("/")[1];
    //     if(key) {
    //         newKey = helpers.parseKey(key);
    //         if(!key.includes(".")) newKey = newKey + "." + extension;
    //     } else {
    //         newKey = this.constructor.crypto.randomBytes(11).toString('hex') + "." + extension
    //     }
    //     return newKey 
    // }

}

const helpers = {};
helpers.parseKey = function(key) {
    // AWS S3 documentaion provides a list of safe/unsave characters: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
    // The following characters were tested and are safe to use in Amazon S3: "&", "$", "@", "'", ",", ";"; 
    let parsed = key.replaceAll(/[{`}^%\]">[~<|#/=?+:\s]/g, "").replaceAll(/[\\]/g, "")
    if(!parsed.length) throw new Error("A 'key' may not be composed of special characters only as some are scaped, which may ressult in an empty (invalid) key")
    return parsed
}

// module.exports = S3Client;
export default S3Client


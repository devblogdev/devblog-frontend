// Documentation: 
// This software-development-kid performs 'browser-based uploads to Amazon S3'.
// For official documention on the above process, refer to the "Amazon Simple Storage Service API Reference",
// section "Authenticating Requests in Browser-Based Uploads Using POST (AWS Signature Version 4)", 
// subsections "Broswer-Based uploads Using HTTP-POST", "Calculating a Signature", "POST Policy", 
// and "Example: Browser-Based Upload using HTTP POST (Using AWS Signature Version 4)"

class S3Client {
    static crypto = require('crypto');
    static crypto2  = require('crypto-js')
    static baseUrl = ""
    
    constructor ({ bucketName, region, accessKeyId, secretAccessKey }) {
        this.config = {};
        this.config["bucketName"] = bucketName
        this.config["region"] = region
        this.config["accessKeyId"] = accessKeyId
        this.config["secretAccessKey"] = secretAccessKey

        S3Client.baseUrl = 'https://' + bucketName + '.s3-' + region + '.amazonaws.com/'
    }

    request(headers, path, method, queryStringObject, payload, callback) {

        // let requestUrl = path + '?';
        let requestUrl = path;
        let counter = 0;
        for(let queryKey in queryStringObject){
            if(queryStringObject.hasOwnProperty(queryKey)){
                counter++;
                if(counter > 1){
                    requestUrl+= '&';
                }
                requestUrl+= queryKey + '=' +queryStringObject[queryKey];
            }
        }

        let xhr = new XMLHttpRequest();
        xhr.open(method, requestUrl, true);
        xhr.setRequestHeader('Content-type', 'multipart/form-data; boundary=----WebKitFormBoundaryaCfPK5HqGtJVh6eO');
        // for(let headerKey in headers){
        //     xhr.setRequestHeader(headerKey, headers[headerKey]);
        // }
        
        /*
        xhr.onreadystatechange = function() {
            if(xhr.readyState === XMLHttpRequest.DONE) {
                let statusCode = xhr.status;
                let responseReturned = xhr.responseText;

                if(callback){
                    try{
                        let parsedResponse = JSON.parse(responseReturned);
                        callback(statusCode, parsedResponse);
                    } catch(e){
                        callback(statusCode, false);
                    }
                }

            }
        }
        */

        let payloadString = JSON.stringify(payload);
        // let payloadString = Buffer.from(payload, 'base64');

        // Create a form to send to AWS S3
        // let form = new FormData();
        
        // AWS S3 Documentation: https://docs.aws.amazon.com/AmazonS3/latest/API/Welcome.html
        // Form fields for HTTP POST request to AWS S3
        /*
        * policy    (Base64-eoncded security policy)
        * x-amz-algorithm   (for AWS Signature Version 4 use AWS4-HMAC-SHA256)        
        * x-amz-credential  (has the form: <your-access-key-id>/<date>/<awsregion>/<aws-service>/aws4_request)
        * x-amz-date    (date in ISO8601 format: 20130728T000000Z)
        * x-amz-signature   (the HMAC-SHA256 hash of the security policy)
        * 
        * Calculating a Signature
        * 
        * POST FORM FIELDS
        * 
        * AWSAccessKeyId    
        * acl   (access control list: valid values: private | public-read | public-read-write | aws-exec-read | authenticated-read | bucket-owner-read | bucket-owner-full-control); use "public-read"
        * file  (file to upload; must be last field in form)
        * key   (used to assign name to file in s3)
        * x-amz-server-side-encryption  (server-side encryption algorithm; valid values: aws:kms, AES256; use "AES256")
        * 
        * SIGNATURES
        * 
        *   Signature = Hex(HMAC-SHA256(SigningKey, StringToSign))
        *       
        *       SigningKey 
        *       DateKey = HMAC-SHA256("AWS4" + "<SecretAccessKey>", <yyymmdd> )
        *       DateRegionKey = HMAC-SHA256(DateKey, "<aws-region>")
        *       DateRegionServiceKey = HMAC-SHA256(DateRegionKey, "<aws-service>")
        *       SigningKey = HMAC-SHA256(DateServiceKey, "aws4_request")
        * 
        *       StringToSign
        *       Base-64-encoded security policy
        * 
        */          


        // Creating the stringToSign using the bucket Policy

        const tenMinutes = 6e5;
        const isoDate = (new Date(new Date().getTime() + tenMinutes)).toISOString();
        const date = isoDate.split("T")[0].split("-").join("");  // yyyymmdd
        const formattedIso = isoDate.split("-").join("").split(":").join("").split(".").join("");

        // Note: The optional "encoding" parameter from "Buffer.from(string[,enconding])" defaults to utf8
        const policy = Buffer.from(
            JSON.stringify(
                { 
                    expiration: isoDate,
                    conditions: [
                        {"bucket": this.config.bucketName},
                        ["starts-with", "$key", ""],
                        {"acl": "public-read"},
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
        ).toString('base64').replaceAll(/[$\n\r]/g, "")

        const policy2 = new Buffer(
            JSON.stringify(
                { 
                    expiration: "2015-12-30T12:00:00.000Z",
                    conditions: [
                        {"bucket": "sigv4examplebucket"},
                        ["starts-with", "$key", "user/user1/"],
                        {"acl": "public-read"},
                        {"success_action_redirect": "http://sigv4examplebucket.s3.amazonaws.com/successful_upload.html"},
                        ["starts-with", "$Content-Type", "image/"],
                        {"x-amz-meta-uuid": "14365123651274"},
                        {"x-amz-server-side-encryption": "AES256"},
                        ["starts-with", "$x-amz-meta-tag", ""],
                        {"x-amz-credential": "AKIAIOSFODNN7EXAMPLE/20151229/us-east-1/s3/aws4_request"},
                        {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
                        {"x-amz-date": "20151229T000000Z" }
                    ] 
                }
            )
        ).toString('base64').replace(/\n|\r/, "")


        // Calculating the SigningKey

        let c = S3Client.crypto;
        // c ( algorithm, key, ..rest(string))
        const dateKey = c.createHmac('sha256', "AWS4" + this.config.secretAccessKey).update(date).digest();
        const dateRegionKey = c.createHmac('sha256', dateKey).update(this.config.region).digest();
        const dateRegionServiceKey = c.createHmac('sha256', dateRegionKey).update('s3').digest();
        const signingKey = c.createHmac('sha256', dateRegionServiceKey).update('aws4_request').digest();
        // signing key = HMAC-SHA256(HMAC-SHA256(HMAC-SHA256(HMAC-SHA256("AWS4" + "<YourSecretAccessKey>","20130524"),"us-east-1"),"s3"),"aws4_request")
        const signature = c.createHmac('sha256', signingKey).update(policy).digest('hex');
                
        let d = S3Client.crypto2;
        // d.HmacSHA256("meesage", "key")
        const m = d.HmacSHA256(date, "AWS4" + this.config.secretAccessKey);
        const n  = d.HmacSHA256(this.config.region, m);
        const t = d.HmacSHA256("s3", n);
        const p = d.HmacSHA256("aws4_request", t);

        const signature2 = d.HmacSHA256(policy, p).toString(d.enc.Hex);


        // console.log(signature, signature2)
    
        const w = d.HmacSHA256("message", "key")
        const j = c.createHmac('sha256', "key").update("message")
        console.log(j, w);
        debugger
        // const k = c.createHmac('sha256', "key").update("message")
        // console.log(m);
        // console.log(n);
        // console.log(j);
        // console.log(k);
        // console.log(new Date())
        // console.log(signature);
        // xhr.send(payloadString);

    }
    
    // Perform sanity check for instance constructor properties
    uploadFile(file) {
        this.request(this.config, S3Client.baseUrl, 'POST', {}, file, function(statusCode, responseReturned){
            // console.log(statusCode);
            // console.log(responseReturned);
        });
    }

    // CRUD ACTIONS
    get(){

    }

    upload(paplod){
        // Sanity check payload
    }

    update(payload){

    }

    delete(payload){

    }
}

module.exports = S3Client;


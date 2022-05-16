class S3Client {

    static baseUrl = ""

    constructor ({ bucketName, region, accessKeyId, secretAccessKey }) {
        this.config = {};
        this.config["bucketName"] = bucketName
        this.config["region"] = region
        this.config["accessKeyId"] = accessKeyId
        this.config["secretAccessKey"] = secretAccessKey

        S3Client.baseUrl = 'https://' + bucketName + '.' + region + '.amazonaws.com/'
    }

    request(headers, path, method, queryStringObject, payload, callback) {

        let requestUrl = path + '?';
        let counter = 0;
        for(let queryKey in queryStringObject){
            if(queryStringObject.hasOwnProperty(queryKey)){
                counter++;
                if(counte > 1){
                    requestUrl+= '&';
                }
                requestUrl+= queryKey + '=' +queryStringObject[queryKey];
            }
        }


        let xhr = new XMLHttpRequest();
        xhr.open(method, requestUrl, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        for(let configKey in this.config){
            xhr.setRequestHeader(configKey, this.config[configKey]);
        }
        
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE) {
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

        let payloadString = JSON.stringify(payload);
        xhr.send(payloadString);
    }
    
    // Perform sanity check for instance constructor properties
    uploadFile(file) {
        // Connect to S3
        // Use http2 mdoule + XMLS
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
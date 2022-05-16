class S3Client {

    static baseUrl = "aws-s3-baseUrl"

    constructor ({ bucketName, region, accessKeyId, secretAccessKey }) {
        this.config = {};
        this.config["bucketName"] = bucketName
        this.config["region"] = region
        this.config["accessKeyId"] = accessKeyId
        this.config["secretAccessKey"] = secretAccessKey
    }

    request(method, requestUrl) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, requestUrl, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        for(let configKey in this.config){
            xhr.setRequestHeader(configKey, this.config[configKey]);
        }
        
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
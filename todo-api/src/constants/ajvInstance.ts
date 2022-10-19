import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajvInstance = new Ajv({ allErrors: true , $data:true});

addFormats(ajvInstance);

export default ajvInstance;